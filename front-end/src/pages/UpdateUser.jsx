import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import PageTopic from "../partials/PageTopic";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { MsgBoxG, MsgBoxR } from "../utils/MsgBos";
import ModalResetPassword from "../components/ResetPasswordUser";
import DoorSelect from "../components/DoorSelect";

const UpdateUser = () => {
  axios.defaults.withCredentials = true;
  //Msg Alert States
  const [showAlertG, setShowAlertG] = useState(false);
  const [showAlertR, setShowAlertR] = useState(false);
  const [Msgalert, setMsgalert] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const location = useLocation();
  const userId = location.pathname.split("/")[2];

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentDate = new Date().toISOString().slice(0, 10);
  const [users, setUsers] = useState({
    id: userId,
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    updatedDate: currentDate,
    userType: "",
    userStatus: 0,
  });

  const [name, setName] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/user/login/userData")
      .then((res) => {})
      .catch((err) => navigate("/login"));
  }, []);

  useEffect(() => {
    const fetctUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/user/" + userId);
        setUsers({
          ...users,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          userName: res.data.userName,
          email: res.data.email,
          userType: res.data.userType,
          userStatus: res.data.userStatus,
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetctUser();
  }, []);

  const handleChange = (e) => {
    setUsers((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //Active Non-Active toggle
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked((prev) => !prev);
  };

  const [checkMail, setCheckMail] = useState(true);

  //Data validation
  const validateUserData = () => {
    event.preventDefault();
    setCheckMail(true);
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

    if (!users.userType) {
      setMsgalert("User Type is required");
      setShowAlertR(true);
      return false;
    }

    return true;
  };

  //API calling for Update User
  const navigate = useNavigate();
  const UpdateData = async (e) => {
    try {
      await axios.put("http://localhost:3000/api/user/", users); // Correct endpoint URL
      setMsgalert("Data Updated");
      setShowAlertG(true);
      navigate("/listUser");
    } catch (err) {
      console.log(err);
    }
  };

  const EmailCheck = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/user/emailId/${users.id}`
      );
      if (res.data.email !== users.email) {
        try {
          const res = await axios.get(
            `http://localhost:3000/api/user/email/${users.email}`
          );
          if (res.data.success === 0) {
            setMsgalert("Email exists");
            setShowAlertR(true);
            return false;
          } else if (response.data.success === 1) {
            return true;
          }
        } catch (error) {
          console.error("Error:", error);
          throw error;
        }
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
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
          setIsOpen(true);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handlePasswordReset = () => {
    setShowModal(true);
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

  //console.log(users)
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <MsgBoxG visibility={showAlertG} alert={Msgalert} />
        <MsgBoxR visibility={showAlertR} alert={Msgalert} />

        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <PageTopic name="Update User" className="fixed" />
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
                      value={users.firstName}
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
                    value={users.lastName}
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
                  value={users.userName}
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
                  value={users.email}
                  onChange={handleChange}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  placeholder="john@mail.com"
                />
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
                  value={users.userType}
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
                    {isChecked ? "Active" : "InActive"}
                  </span>
                </label>
              </div>
            </div>

            <div className="flex">
              <div className="mt-[20px] w-full">
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Update
                  <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
                </button>
              </div>
              <div className="relative right-[220px] top-[28px] w-[300px]">
                <span
                  className="text-sm text-blue-700 hover:underline cursor-pointer font-medium"
                  onClick={handlePasswordReset}
                >
                  Reset password?
                </span>
                <ModalResetPassword
                  showModal={showModal}
                  setShowModal={setShowModal}
                  id={userId}
                />
              </div>

              <div className="relative right-[220px] top-[28px] w-[300px]">
                <span
                  className="text-sm text-blue-700 hover:underline cursor-pointer font-medium"
                  onClick={() => setIsShow(true)}
                >
                  Assign Doors
                </span>
                <DoorSelect isShow={isShow} setIsShow={setIsShow} id={userId} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
