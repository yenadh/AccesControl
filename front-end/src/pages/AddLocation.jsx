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

  const [locations, setLocation] = useState({
    locationName: "",
    address: "",
    city: "",
    createdUser: "",
    createdDate: "",
    status: 0,
  });

  locations.createdUser = createdName;

  //Get current Date for "createdDate"
  useEffect(() => {
    const currentDate = new Date().toISOString().slice(0, 10);
    setLocation((prev) => ({ ...prev, createdDate: currentDate }));
  }, []);

  const handleChange = (e) => {
    setLocation((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //Active Non-Active toggle
  const handleToggle = () => {
    setIsChecked((prev) => !prev);
  };

  //Data validation
  const validateUserData = () => {
    event.preventDefault();
    if (!locations.locationName) {
      setMsgalert("Location Name is required");
      setShowAlertR(true);
      return false;
    }

    if (!locations.city) {
      setMsgalert("City is required");
      setShowAlertR(true);
      return false;
    }

    if (!locations.address) {
      setMsgalert("Address is required");
      setShowAlertR(true);
      return false;
    }

    return true;
  };

  //API calling for Add User
  const navigate = useNavigate();

  const AddData = async (e) => {
    try {
      await axios.post("http://localhost:3000/api/location", locations);
      setMsgalert("Data Added");
      setShowAlertG(true);
      navigate("/listLocation");
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

  console.log(locations);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <MsgBoxG visibility={showAlertG} alert={Msgalert} />
        <MsgBoxR visibility={showAlertR} alert={Msgalert} />

        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <PageTopic name="Add Location" className="fixed" />
        <div className="grid place-content-center relative top-[20px] mx-[120px]  col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
          <div className="h-auto my-[70px]">
            <div className="mt-[20px] ">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Location Name
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
                <input
                  name="locationName"
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
                City
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none">
                  <svg
                    className="w-6 h-6 fill-gray-500 dark:fill-gray-400"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M13,9a1,1,0,0,0-1-1H3A1,1,0,0,0,2,9V22H13ZM6,20H4V18H6Zm0-4H4V14H6Zm0-4H4V10H6Zm5,8H8V18h3Zm0-4H8V14h3Zm0-4H8V10h3Zm3.5-6H6V3A1,1,0,0,1,7,2H17a1,1,0,0,1,1,1v7H15V6.5A.5.5,0,0,0,14.5,6ZM22,13v9H19.5V18h-2v4H15V13a1,1,0,0,1,1-1h5A1,1,0,0,1,22,13Z" />
                  </svg>
                </div>
                <input
                  name="city"
                  onChange={handleChange}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  placeholder="john"
                />
              </div>
            </div>

            <div className="mt-[20px] ">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none">
                  <svg
                    className="w-6 h-6 fill-none stroke-gray-500 dark:stroke-gray-400"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 13V7M15 10.0008L9 10M19 10.2C19 14.1764 15.5 17.4 12 21C8.5 17.4 5 14.1764 5 10.2C5 6.22355 8.13401 3 12 3C15.866 3 19 6.22355 19 10.2Z"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <input
                  name="address"
                  onChange={handleChange}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[600px] ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  placeholder="john"
                />
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

            <div className="mt-[20px] w-full">
              <button
                onClick={handleSubmit}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
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
