import React, { useState, useEffect } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import PageTopic from "../partials/PageTopic";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MsgBoxG, MsgBoxR } from "../utils/MsgBos";

const AddLocation = () => {
  axios.defaults.withCredentials = true;
  //Msg Alert States
  const [showAlertG, setShowAlertG] = useState(false);
  const [showAlertR, setShowAlertR] = useState(false);
  const [Msgalert, setMsgalert] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  //Active Non-Active toggle state
  const [isChecked, setIsChecked] = useState(false);
  const [createdName, setCreatedName] = useState("");

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  console.log(latitude);
  console.log(longitude);

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

  const [locations, setLocations] = useState([]);

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

  const [doors, setDoor] = useState({
    doorName: "",
    locationId: "",
    latitude: "",
    longitude: "",
    createdUser: "",
    createdDate: "",
    status: 0,
  });

  doors.createdUser = createdName;

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

  //Get current Date for "createdDate"
  useEffect(() => {
    const currentDate = new Date().toISOString().slice(0, 10);
    setDoor((prev) => ({ ...prev, createdDate: currentDate }));
  }, []);

  const handleChange = (e) => {
    setDoor((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //Active Non-Active toggle
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

  //API calling for Add User
  const navigate = useNavigate();

  const AddData = async (e) => {
    try {
      await axios.post("http://localhost:3000/api/door", doors);
      setMsgalert("Data Added");
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
      AddData();
    }
  };

  //Time out for Msg alert
  setTimeout(() => {
    setShowAlertG(false);
    setShowAlertR(false);
  }, 5000);

  console.log(doors);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <MsgBoxG visibility={showAlertG} alert={Msgalert} />
        <MsgBoxR visibility={showAlertR} alert={Msgalert} />

        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <PageTopic name="Add Door" className="fixed" />
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
                  name="locationId"
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value=""></option>
                  {locations.map((location) => {
                    return (
                      <option value={location.id} key={location.id}>
                        {location.locationName}
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
                      className="w-6 h-6 fill-gray-500 dark:fill-gray-400 rotate-90"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 512 512"
                      xmlSpace="preserve"
                    >
                      <g>
                        <g>
                          <path
                            d="M256,0C114.842,0,0,114.842,0,256s114.842,256,256,256s256-114.842,256-256S397.158,0,256,0z M290.074,492.467
			l-26.752-44.587c-3.081-5.146-11.554-5.146-14.635,0l-26.752,44.587C117.402,477.474,34.526,394.598,19.533,290.074l44.587-26.752
			c2.569-1.544,4.147-4.326,4.147-7.322c0-2.995-1.579-5.777-4.139-7.313l-44.587-26.752C36.13,106.266,135.817,17.067,256,17.067
			s219.87,89.199,236.467,204.86l-44.587,26.752c-2.569,1.545-4.147,4.326-4.147,7.322c0,2.995,1.579,5.777,4.139,7.313
			l44.587,26.752C477.474,394.598,394.598,477.474,290.074,492.467z"
                          />
                        </g>
                      </g>
                      <g>
                        <g>
                          <path
                            d="M361.097,247.902l-72.755-24.252l-22.451-67.354c5.359-4.241,10.769-6.383,16.12-6.323
			c10.675,0.307,18.705,9.182,18.756,9.233c1.664,1.92,4.045,2.927,6.443,2.927c1.596,0,3.2-0.444,4.625-1.365
			c3.567-2.313,4.89-6.886,3.115-10.743l-51.2-110.933c-1.399-3.021-4.42-4.958-7.748-4.958s-6.349,1.937-7.748,4.958l-51.2,110.933
			c-1.775,3.857-0.452,8.431,3.115,10.743c3.567,2.313,8.303,1.63,11.068-1.57c0.085-0.085,8.004-8.858,18.637-9.225
			c5.385-0.102,10.846,2.039,16.239,6.323l-22.451,67.354l-72.755,24.252c-3.49,1.169-5.837,4.42-5.837,8.098
			s2.347,6.938,5.837,8.098l72.047,24.013l8.858,47.249l-30.822,15.411c-2.893,1.442-4.719,4.395-4.719,7.629v59.733
			c0,3.072,1.647,5.914,4.326,7.424c1.306,0.742,2.756,1.109,4.207,1.109c1.519,0,3.038-0.401,4.395-1.22l35.507-21.308
			l2.918,15.556c0.742,4.045,4.275,6.972,8.38,6.972s7.637-2.927,8.38-6.963l2.918-15.556l35.507,21.308
			c1.357,0.811,2.876,1.212,4.395,1.212c1.451,0,2.901-0.367,4.207-1.109c2.68-1.51,4.326-4.352,4.326-7.424V358.4
			c0-3.234-1.826-6.187-4.719-7.637l-30.814-15.403l8.858-47.249l72.047-24.013c3.482-1.161,5.828-4.42,5.828-8.098
			S364.587,249.071,361.097,247.902z M256,281.6c-14.114,0-25.6-11.486-25.6-25.6s11.486-25.6,25.6-25.6s25.6,11.486,25.6,25.6
			S270.114,281.6,256,281.6z"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <input
                    name="latitude"
                    onChange={handleChange}
                    value={latitude ? latitude : null}
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
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 512 512"
                      xmlSpace="preserve"
                    >
                      <g>
                        <g>
                          <path
                            d="M256,0C114.842,0,0,114.842,0,256s114.842,256,256,256s256-114.842,256-256S397.158,0,256,0z M290.074,492.467
			l-26.752-44.587c-3.081-5.146-11.554-5.146-14.635,0l-26.752,44.587C117.402,477.474,34.526,394.598,19.533,290.074l44.587-26.752
			c2.569-1.544,4.147-4.326,4.147-7.322c0-2.995-1.579-5.777-4.139-7.313l-44.587-26.752C36.13,106.266,135.817,17.067,256,17.067
			s219.87,89.199,236.467,204.86l-44.587,26.752c-2.569,1.545-4.147,4.326-4.147,7.322c0,2.995,1.579,5.777,4.139,7.313
			l44.587,26.752C477.474,394.598,394.598,477.474,290.074,492.467z"
                          />
                        </g>
                      </g>
                      <g>
                        <g>
                          <path
                            d="M361.097,247.902l-72.755-24.252l-22.451-67.354c5.359-4.241,10.769-6.383,16.12-6.323
			c10.675,0.307,18.705,9.182,18.756,9.233c1.664,1.92,4.045,2.927,6.443,2.927c1.596,0,3.2-0.444,4.625-1.365
			c3.567-2.313,4.89-6.886,3.115-10.743l-51.2-110.933c-1.399-3.021-4.42-4.958-7.748-4.958s-6.349,1.937-7.748,4.958l-51.2,110.933
			c-1.775,3.857-0.452,8.431,3.115,10.743c3.567,2.313,8.303,1.63,11.068-1.57c0.085-0.085,8.004-8.858,18.637-9.225
			c5.385-0.102,10.846,2.039,16.239,6.323l-22.451,67.354l-72.755,24.252c-3.49,1.169-5.837,4.42-5.837,8.098
			s2.347,6.938,5.837,8.098l72.047,24.013l8.858,47.249l-30.822,15.411c-2.893,1.442-4.719,4.395-4.719,7.629v59.733
			c0,3.072,1.647,5.914,4.326,7.424c1.306,0.742,2.756,1.109,4.207,1.109c1.519,0,3.038-0.401,4.395-1.22l35.507-21.308
			l2.918,15.556c0.742,4.045,4.275,6.972,8.38,6.972s7.637-2.927,8.38-6.963l2.918-15.556l35.507,21.308
			c1.357,0.811,2.876,1.212,4.395,1.212c1.451,0,2.901-0.367,4.207-1.109c2.68-1.51,4.326-4.352,4.326-7.424V358.4
			c0-3.234-1.826-6.187-4.719-7.637l-30.814-15.403l8.858-47.249l72.047-24.013c3.482-1.161,5.828-4.42,5.828-8.098
			S364.587,249.071,361.097,247.902z M256,281.6c-14.114,0-25.6-11.486-25.6-25.6s11.486-25.6,25.6-25.6s25.6,11.486,25.6,25.6
			S270.114,281.6,256,281.6z"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <input
                    name="longitude"
                    onChange={handleChange}
                    value={longitude ? longitude : null}
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
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm mr-8 px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLocation;
