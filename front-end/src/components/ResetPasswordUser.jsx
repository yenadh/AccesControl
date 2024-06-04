import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

function ModalResetPassword({ showModal, setShowModal, id }) {
  //axios.defaults.withCredentials = true;

  const [Msgalert, setMsgalert] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [users, setUser] = useState({
    password: "",
    id: id,
  });

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const validateUserData = () => {
    if (!password) {
      setMsgalert("Password is required");
      setShowAlert(true);
      return false;
    } else if (password.length < 8) {
      setMsgalert("Password should contain 8 characters");
      setShowAlert(true);
      return false;
    }

    if (password === repeatPassword) {
      users.password = password;
    } else {
      setMsgalert("Password dosen't match");
      setShowAlert(true);
      setPasswordsMatch(false);
      return false;
    }
    return true;
  };

  setTimeout(() => {
    setShowAlert(false);
  }, 5000);

  const AddData = async (e) => {
    try {
      await axios.put("http://localhost:3000/api/user/password/", users);
      console.log("Data Added");
      setShowModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    const isValid = validateUserData();
    if (isValid) {
      AddData();
    }
  };

  return (
    <>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Reset Password</h3>
                  {showAlert ? (
                    <p className="text-[red] text-sm relative top-2">
                      {Msgalert}
                    </p>
                  ) : null}
                </div>
                <div className="relative p-6 flex-auto w-[600px]">
                  <div className="flex mt-[20px] space-x-8">
                    <div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          New Password
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
                            type={type}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required=""
                            placeholder="1234xxxx"
                          />
                          <span
                            className=" relative bottom-[35px] left-[215px] cursor-pointer"
                            onClick={handleToggle}
                          >
                            <Icon
                              class="absolute mr-10"
                              icon={icon}
                              size={18}
                            />
                          </span>
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
                          type={type}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required=""
                          placeholder="1234xxxx"
                        />
                        <span
                          className=" relative bottom-[35px] left-[215px] cursor-pointer"
                          onClick={handleToggle}
                        >
                          <Icon class="absolute mr-10" icon={icon} size={18} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 relative top-[2px] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Update
                  </button>
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}

export default ModalResetPassword;
