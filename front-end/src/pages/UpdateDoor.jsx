import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import PageTopic from "../partials/PageTopic";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { MsgBoxG, MsgBoxR } from "../utils/MsgBos";

const UpdateDoor = () => {
  axios.defaults.withCredentials = true;
  //Msg Alert States
  const [showAlertG, setShowAlertG] = useState(false);
  const [showAlertR, setShowAlertR] = useState(false);
  const [Msgalert, setMsgalert] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const doorId = location.pathname.split("/")[2];

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentDate = new Date().toISOString().slice(0, 10);
  const [createdName, setCreatedName] = useState("");

  const [Locations, setLocations] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/door/location/data"
        );
        setLocations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchLocation();
  }, []);

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

  const [doors, setDoor] = useState({
    id: doorId,
    doorName: "",
    locationId: "",
    latitude: "",
    longitude: "",
    updatedUser: "",
    updatedDate: currentDate,
    status: 0,
  });

  doors.updatedUser = createdName;

  const getLatitudeAndLongitude = async () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      if (latitude) {
        doors.latitude = latitude;
      }
      if (longitude) {
        doors.longitude = longitude;
      }
    });
  };

  if (latitude) {
    doors.latitude = latitude;
  }
  if (longitude) {
    doors.longitude = longitude;
  }

  useEffect(() => {
    const fetctLocation = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/door/" + doorId);
        console.log(res.data);
        setDoor({
          ...doors,
          doorName: res.data.doorName,
          locationId: res.data.locationId,
          latitude: res.data.latitude,
          longitude: res.data.longitude,
          status: res.data.status,
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetctLocation();
  }, []);

  const handleChange = (e) => {
    setDoor((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //Active Non-Active toggle
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked((prev) => !prev);
  };

  //Data validation
  const validateUserData = () => {
    event.preventDefault();
    const letterRegex = /^[a-zA-Z]+$/;
    if (!doors.doorName) {
      setMsgalert("Door Name is required");
      setShowAlertR(true);
      return false;
    }

    if (!doors.locationId) {
      setMsgalert("Need to select Location");
      setShowAlertR(true);
      return false;
    }

    if (!doors.latitude) {
      setMsgalert("Latitude is required");
      setShowAlertR(true);
      return false;
    } else if (letterRegex.test(doors.latitude)) {
      setMsgalert("Invalid Latitude");
      setShowAlertR(true);
    }

    if (!doors.longitude) {
      setMsgalert("Longitude is required");
      setShowAlertR(true);
      return false;
    } else if (letterRegex.test(doors.longitude)) {
      setMsgalert("Invalid Longitude");
      setShowAlertR(true);
    }

    return true;
  };

  //API calling for Update User
  const navigate = useNavigate();
  const UpdateData = async (e) => {
    try {
      await axios.put("http://localhost:3000/api/door/", doors); // Correct endpoint URL
      setMsgalert("Data Updated");
      setShowAlertG(true);
      navigate("/listDoor");
    } catch (err) {
      console.log(err);
    }
  };

  //Data Adding to db after Validation is Success
  const handleSubmit = async () => {
    const isValid = validateUserData();
    if (isValid) {
      setIsOpen(true);
    }
  };

  //Time out for Msg alert
  setTimeout(() => {
    setShowAlertG(false);
    setShowAlertR(false);
  }, 5000);

  const SpringModal = ({ isOpen, setIsOpen }) => {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0, rotate: "12.5deg" }}
              animate={{ scale: 1, rotate: "0deg" }}
              exit={{ scale: 0, rotate: "0deg" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
            >
              <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
              <div className="relative z-10">
                <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                  <FiAlertCircle />
                </div>
                <h3 className="text-3xl font-bold text-center mb-2">
                  Update Alert!
                </h3>
                <p className="text-center mb-6">
                  Do you wants to update this record
                </p>
                <div className="flex gap-2">
                  <div
                    onClick={() => setIsOpen(false)}
                    className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                  >
                    Cancel
                  </div>
                  <div
                    onClick={() => UpdateData()}
                    className="bg-white hover:opacity-90 cursor-pointer transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                  >
                    Update
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  console.log(doors);
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <MsgBoxG visibility={showAlertG} alert={Msgalert} />
        <MsgBoxR visibility={showAlertR} alert={Msgalert} />

        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <PageTopic name="Update Door" className="fixed" />
        <div className="grid place-content-center relative top-[20px] mx-[120px]  col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
          <div className="h-auto my-[70px]">
            <div className="mt-[20px] ">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Door Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none">
                  <svg
                    className="w-6 h-6 fill-gray-500 dark:fill-gray-400"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4,23H20a1,1,0,0,0,0-2V2a1,1,0,0,0-1-1H5A1,1,0,0,0,4,2V21a1,1,0,0,0,0,2ZM6,3H18V21H6Zm3,8v2a1,1,0,0,1-2,0V11a1,1,0,0,1,2,0Z" />
                  </svg>
                </div>
                <input
                  name="doorName"
                  value={doors.doorName}
                  onChange={handleChange}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  placeholder="Office No.01"
                />
              </div>
            </div>

            <div className="mt-[20px] ">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none">
                  <svg
                    className="w-6 h-6 fill-gray-500 dark:fill-gray-400"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13 3C13 2.44772 12.5523 2 12 2C11.4477 2 11 2.44772 11 3V4.06189C7.38128 4.51314 4.51314 7.38128 4.06189 11H3C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13H4.06189C4.51314 16.6187 7.38128 19.4869 11 19.9381V21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21V19.9381C16.6187 19.4869 19.4869 16.6187 19.9381 13H21C21.5523 13 22 12.5523 22 12C22 11.4477 21.5523 11 21 11H19.9381C19.4869 7.38128 16.6187 4.51314 13 4.06189V3ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8Z"
                    />
                  </svg>
                </div>
                <select
                  required=""
                  value={doors.locationId}
                  name="locationId"
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value=""></option>
                  {Locations.map((Location) => {
                    return (
                      <option value={Location.id} key={Location.id}>
                        {Location.locationName}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="mt-[20px] ">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Latitude
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none">
                    <svg
                      className="w-6 h-6 fill-gray-500 dark:fill-gray-400"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M4,23H20a1,1,0,0,0,0-2V2a1,1,0,0,0-1-1H5A1,1,0,0,0,4,2V21a1,1,0,0,0,0,2ZM6,3H18V21H6Zm3,8v2a1,1,0,0,1-2,0V11a1,1,0,0,1,2,0Z" />
                    </svg>
                  </div>
                  <input
                    name="latitude"
                    value={latitude ? latitude : doors.latitude}
                    onChange={handleChange}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    placeholder="1.xxxxxxx"
                  />
                </div>
              </div>
              <div className="mt-[20px] ">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Longitude
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none">
                    <svg
                      className="w-6 h-6 fill-gray-500 dark:fill-gray-400"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M4,23H20a1,1,0,0,0,0-2V2a1,1,0,0,0-1-1H5A1,1,0,0,0,4,2V21a1,1,0,0,0,0,2ZM6,3H18V21H6Zm3,8v2a1,1,0,0,1-2,0V11a1,1,0,0,1,2,0Z" />
                    </svg>
                  </div>
                  <input
                    name="longitude"
                    value={longitude ? longitude : doors.longitude}
                    onChange={handleChange}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    placeholder="123.xxxxxxx"
                  />
                </div>
              </div>
              <div className="flex mt-[20px] w-full">
                <button
                  onClick={getLatitudeAndLongitude}
                  type="button"
                  className="relative top-7 h-[44px] text-black focus:outline-none bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                >
                  Get Location
                </button>
              </div>
            </div>

            <div className="mt-[40px] flex">
              <div className=" relative">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isChecked}
                    name="status"
                    value={isChecked ? 0 : 1}
                    onChange={handleChange}
                    onClick={handleToggle}
                  />
                  <div
                    className={`relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600`}
                  ></div>
                  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {isChecked ? "Active" : "InActive"}
                  </span>
                </label>
              </div>
            </div>

            <div className="flex mt-[20px] w-full">
              <button
                onClick={handleSubmit}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm mr-8  px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Update
                <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateDoor;
