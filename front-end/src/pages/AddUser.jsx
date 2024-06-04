import React, { useState, useEffect } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import PageTopic from "../partials/PageTopic";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MsgBoxG, MsgBoxR } from "../utils/MsgBos";

const AddUser = () => {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
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
        navigate("/login")
        console.log(err);
      }
    };
    fetchUser();
  }, []);

  const [users, setUsers] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    createdDate: "",
    createdUser: "",
    userType: "",
    userStatus: 0,
  });

  users.createdUser = createdName;

  //Get current Date for "createdDate"
  useEffect(() => {
    const currentDate = new Date().toISOString().slice(0, 10);
    setUsers((prev) => ({ ...prev, createdDate: currentDate }));
  }, []);

  const handleChange = (e) => {
    setUsers((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //Active Non-Active toggle
  const handleToggle = () => {
    setIsChecked((prev) => !prev);
  };

  //Data validation
  const validateUserData = () => {
    if (password === repeatPassword) {
      users.password = password;
    } else {
      setMsgalert("Password dosen't match");
      setShowAlertR(true);
      setPasswordsMatch(false);
      return false;
    }

    event.preventDefault();
    var hasNumbers = /\d/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!users.firstName) {
      setMsgalert("First Name is required");
      setShowAlertR(true);
      return false;
    } else if (hasNumbers.test(users.firstName)) {
      setMsgalert("First Name cannot contain numbers");
      setShowAlertR(true);
      return false;
    }

    if (!users.lastName) {
      setMsgalert("Last Name is required");
      setShowAlertR(true);
      return false;
    } else if (hasNumbers.test(users.lastName)) {
      setMsgalert("Last Name cannot contain numbers");
      setShowAlertR(true);
      return false;
    }

    if (!users.userName) {
      setMsgalert("User Name is required");
      setShowAlertR(true);
      return false;
    } else if (hasNumbers.test(users.userName)) {
      setMsgalert("User Name cannot contain numbers");
      setShowAlertR(true);
      return false;
    }

    if (!users.email) {
      setMsgalert("Email is required");
      setShowAlertR(true);
      return false;
    } else if (!emailRegex.test(users.email)) {
      setMsgalert("Please enter a valid email address.");
      setShowAlertR(true);
      return false;
    }

    if (!password) {
      setMsgalert("Password is required");
      setShowAlertR(true);
      return false;
    } else if (password.length < 8) {
      setMsgalert("Password should contain 8 characters");
      setShowAlertR(true);
      return false;
    }

    if (!users.userType) {
      setMsgalert("User Type is required");
      setShowAlertR(true);
      return false;
    }

    return true;
  };

  const EmailCheck = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/user/email/${users.email}`
      );
      if (res.data.success === 0) {
        setMsgalert("Email exists");
        setShowAlertR(true);
        return false;
      } else if (res.data.success === 1) {
        return true;
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  //API calling for Add User
  const navigate = useNavigate();

  const AddData = async (e) => {
    try {
      await axios.post("http://localhost:3000/api/user", users);
      setMsgalert("Data Added");
      setShowAlertG(true);
      navigate("/listUser");
    } catch (err) {
      console.log(err);
    }
  };

  //Data Adding to db after Validation is Success
  const handleSubmit = async () => {
    const isValid = validateUserData();

    if (isValid) {
      try {
        const emailExists = await EmailCheck();

        if (emailExists === false) {
          return;
        } else {
          console.log("Email doesn't exist. Proceeding with AddData...");
          AddData();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  //Time out for Msg alert
  setTimeout(() => {
    setShowAlertG(false);
    setShowAlertR(false);
  }, 5000);
 

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <MsgBoxG visibility={showAlertG} alert={Msgalert} />
        <MsgBoxR visibility={showAlertR} alert={Msgalert} />

        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <PageTopic name="Add User" className="fixed" />
        <div className="grid place-content-center relative top-[20px] mx-[120px]  col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
          <div className="h-auto grid justify-center my-[70px]">
            <div className="flex space-x-8">
              <div>
                <div>
                  <label className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    First Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                      </svg>
                    </div>
                    <input
                      name="firstName"
                      onChange={handleChange}
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                      placeholder="John"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                  </div>
                  <input
                    name="lastName"
                    onChange={handleChange}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    placeholder="Doe"
                  />
                </div>
              </div>
            </div>

            <div className="mt-[20px] ">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                User Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                  </svg>
                </div>
                <input
                  name="userName"
                  onChange={handleChange}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  placeholder="john"
                />
              </div>
            </div>

            <div className="mt-[20px]">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 16"
                  >
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                  </svg>
                </div>
                <input
                  name="email"
                  onChange={handleChange}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  placeholder="john@mail.com"
                />
              </div>
            </div>

            <div className="flex mt-[20px] space-x-8">
              <div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        enableBackground="new 0 0 24 24"
                      >
                        <path d="M17,9V7c0-2.8-2.2-5-5-5S7,4.2,7,7v2c-1.7,0-3,1.3-3,3v7c0,1.7,1.3,3,3,3h10c1.7,0,3-1.3,3-3v-7C20,10.3,18.7,9,17,9z M9,7c0-1.7,1.3-3,3-3s3,1.3,3,3v2H9V7z M13.1,15.5c0,0-0.1,0.1-0.1,0.1V17c0,0.6-0.4,1-1,1s-1-0.4-1-1v-1.4c-0.6-0.6-0.7-1.5-0.1-2.1c0.6-0.6,1.5-0.7,2.1-0.1C13.6,13.9,13.7,14.9,13.1,15.5z" />
                      </svg>
                    </div>
                    <input
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                      placeholder="1234xxxx"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Repeat Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      enableBackground="new 0 0 24 24"
                    >
                      <path d="M17,9V7c0-2.8-2.2-5-5-5S7,4.2,7,7v2c-1.7,0-3,1.3-3,3v7c0,1.7,1.3,3,3,3h10c1.7,0,3-1.3,3-3v-7C20,10.3,18.7,9,17,9z M9,7c0-1.7,1.3-3,3-3s3,1.3,3,3v2H9V7z M13.1,15.5c0,0-0.1,0.1-0.1,0.1V17c0,0.6-0.4,1-1,1s-1-0.4-1-1v-1.4c-0.6-0.6-0.7-1.5-0.1-2.1c0.6-0.6,1.5-0.7,2.1-0.1C13.6,13.9,13.7,14.9,13.1,15.5z" />
                    </svg>
                  </div>
                  <input
                    name="rPassword"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    type="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    placeholder="1234xxxx"
                  />
                </div>
              </div>
            </div>

            <div className="mt-[20px] flex">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  User Type
                </label>
                <select
                  required=""
                  name="userType"
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[242px] ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value=""></option>
                  <option value="Employee">Employee</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div className=" relative top-[35px] left-[90px]">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isChecked}
                    name="userStatus"
                    value={isChecked ? 0 : 1}
                    onChange={handleChange}
                    onClick={handleToggle}
                  />
                  <div
                    className={`relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600`}
                  ></div>
                  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {isChecked ? "Active" : "Non Active"}
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

export default AddUser;
