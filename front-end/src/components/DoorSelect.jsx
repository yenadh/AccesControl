import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DoorSelect = ({ isShow, setIsShow, id }) => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const [doors, setDoors] = useState([]);
  const [mapDoors, setMapDoors] = useState([]);
  const [locations, setLocations] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [createdName, setCreatedName] = useState("");
  const [selectedLocationId, setSelectedLocationId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/user/login/userData"
        );
        setCreatedName(res.data.userData.firstName);
      } catch (err) {
        navigate("/login");
        console.log(err);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchDoors = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/door");
        setDoors(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDoors();
  }, []);

  useEffect(() => {
    const fetchMapDoors = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/mapDoor/${id}`);
        setMapDoors(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMapDoors();
  }, [refresh]);

  useEffect(() => {
    if (doors.length > 0) {
      const locationMap = {};

      doors.forEach((door) => {
        const locationId = door.locationId;
        if (!locationMap[locationId]) {
          locationMap[locationId] = {
            locationName: door.locationName,
            existingDoors: [],
            nonExistingDoors: [],
          };
        }

        if (
          mapDoors.length > 0 &&
          mapDoors.some((mapDoor) => mapDoor.door_id === door.id)
        ) {
          locationMap[locationId].existingDoors.push(door);
        } else {
          locationMap[locationId].nonExistingDoors.push(door);
        }
      });

      setLocations(locationMap);
    }
  }, [doors, mapDoors]);

  const currentDate = new Date().toISOString().slice(0, 10);

  const handleAddDoor = async (locationId, door) => {
    const doorMap = {
      user_id: id,
      door_id: door.id,
      location_id: door.locationId,
      last_updated_date: currentDate,
      updated_user: createdName,
    };
    try {
      await axios.post("http://localhost:3000/api/mapDoor", doorMap);
      console.log("Data Added");
      setRefresh(!refresh);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveDoor = async (locationId, door) => {
    const userId = id;
    const doorId = door.id;

    try {
      const response = await fetch("http://localhost:3000/api/mapDoor", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, doorId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Delete successful:", result);
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error deleting user-door mapping:", error);
    }
  };

  return (
    <Transition appear show={isShow}>
      <div className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full h-screen bg-white outline-none focus:outline-none">
            <Dialog
              as="div"
              className="relative z-50 focus:outline-none"
              onClose={() => setIsShow(false)}
            >
              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                  <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 transform-[scale(95%)]"
                    enterTo="opacity-100 transform-[scale(100%)]"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 transform-[scale(100%)]"
                    leaveTo="opacity-0 transform-[scale(95%)]"
                  >
                    <DialogPanel className="w-[700px] h-[400px] rounded-xl bg-white p-6 backdrop-blur-2xl">
                      <h1 className=" text-xl font-semibold text-center mt-1">
                        Add Access
                      </h1>
                      <hr className="mt-3 border-1"></hr>
                      <div className=" flex justify-evenly">
                        <div className="flex flex-col space-y-5 mt-4">
                          <h2 className="w-[220px] text-center text-blue-800 font-semibold">
                            Non-Existing Doors
                          </h2>
                          <div>
                            <select
                              className="inline-flex w-[200px] justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                              value={selectedLocationId}
                              onChange={(e) =>
                                setSelectedLocationId(e.target.value)
                              }
                            >
                              <option value="">Select a location</option>
                              {Object.entries(locations).map(
                                ([locationId, locationData]) => (
                                  <option key={locationId} value={locationId}>
                                    {locationData.locationName}
                                  </option>
                                )
                              )}
                            </select>
                            {selectedLocationId && (
                              <div>
                                <ul>
                                  {locations[
                                    selectedLocationId
                                  ].nonExistingDoors.map((door) => (
                                    <div
                                      className="flex space-x-2"
                                      key={`${door.id}-non`}
                                    >
                                      <div className="flex right-0 z-10 mt-2 w-50 px-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <li className="mr-[60px] text-sm">
                                          {door.doorName}
                                        </li>
                                        <svg
                                          onClick={() =>
                                            handleAddDoor(
                                              selectedLocationId,
                                              door
                                            )
                                          }
                                          className=" cursor-pointer"
                                          width="20px"
                                          height="20px"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <g
                                            id="SVGRepo_bgCarrier"
                                            strokeWidth="0"
                                          />

                                          <g
                                            id="SVGRepo_tracerCarrier"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />

                                          <g id="SVGRepo_iconCarrier">
                                            {" "}
                                            <path
                                              d="M12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z"
                                              fill="#00c785"
                                            />{" "}
                                            <path
                                              fillRule="evenodd"
                                              clipRule="evenodd"
                                              d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z"
                                              fill="#00c785"
                                            />{" "}
                                          </g>
                                        </svg>
                                      </div>
                                    </div>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="w-[1px] bg-slate-300 h-[300px]"></div>

                        <div className="flex flex-col space-y-4  mt-4">
                          <h2 className="w-[220px] text-center text-blue-800 font-semibold">
                            Existing Doors
                          </h2>
                          <div className="flex flex-col space-y-2">
                            {Object.entries(locations).map(
                              ([locationId, locationData]) => (
                                <div key={locationId}>
                                  <h3 className=" font-semibold text-sm">
                                    {locationData.locationName}
                                  </h3>
                                  <ul>
                                    {locationData.existingDoors.map((door) => (
                                      <div
                                        className=" flex"
                                        key={`${door.id}-exist`}
                                      >
                                        <div className="flex right-0 z-10 mt-2 w-50 px-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                          <li className="mr-[80px] text-sm">
                                            {door.doorName}
                                          </li>
                                          <svg
                                            onClick={() =>
                                              handleRemoveDoor(locationId, door)
                                            }
                                            className=" cursor-pointer"
                                            width="20px"
                                            height="20px"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <g
                                              id="SVGRepo_bgCarrier"
                                              strokeWidth="0"
                                            />

                                            <g
                                              id="SVGRepo_tracerCarrier"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />

                                            <g id="SVGRepo_iconCarrier">
                                              {" "}
                                              <path
                                                d="M8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13H16C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11H8Z"
                                                fill="#d31b0d"
                                              />{" "}
                                              <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12Z"
                                                fill="#d31b0d"
                                              />{" "}
                                            </g>
                                          </svg>
                                        </div>
                                      </div>
                                    ))}
                                  </ul>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </DialogPanel>
                  </TransitionChild>
                </div>
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default DoorSelect;
