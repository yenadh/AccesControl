import { useState, useEffect } from "react";
import ThemeToggle from "../components/ThemeToggle";
import LoginSide from "../images/bg.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginPopUp from "../components/LoginPopUp";

function Login() {
  const [isOpen, setIsOpen] = useState(false);
  const [Msg, setMsg] = useState("");
  const [msgStatus, setMsgStatus] = useState();
  const [users, setUsers] = useState({
    userName: "",
    password: "",
  });

  const handleChange = (e) => {
    setUsers((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/user/login/userData")
      .then((res) => {
        if (res.data.success === 1) {
          navigate("/");
        }
      })
      .catch((err) => "");
  }, []);

  const handleSubmit = (event) => {
    axios
      .post("http://localhost:3000/api/user/login", users)
      .then((res) => {
        if (res.data.success === 1) {
          setIsOpen(true);
          setMsg(res.data.message);
          setMsgStatus(res.data.success);
        } else {
          setIsOpen(true);
          setMsg(res.data.message);
          setMsgStatus(res.data.success);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className=" flex h-screen bg-white dark:bg-[#0f172a]">
        <div
          className=" w-3/5 h-screen"
          style={{
            backgroundImage: "url(" + LoginSide + ")",
            backgroundSize: "cover",
          }}
        ></div>
        <div className="relative mt-[20px] left-[1150px]">
          <ThemeToggle />
        </div>

        <div className="w-full h-screen grid place-items-center font-inter">
          <div className="grid place-items-center w-[800px] h-[700px] rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <form action="" method="post">
              <div>
                <h1 className="text-[50px] font-bold text-primary text-center mb-[10px]">
                  Welcome to E-DOOR
                </h1>
                <p className="text-[16px] text-Secondary text-center mb-[50px]">
                  Login using your Username and Password
                </p>
                <div className="flex justify-center">
                  <div className="w-[400px]">
                    <div className="relative mb-[20px]">
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                        placeholder="Enter User Name"
                      />
                    </div>

                    <div className="relative mb-[20px]">
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
                        onChange={handleChange}
                        type="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                        placeholder="Enter Password"
                      />
                    </div>

                    <div className="flex justify-between">
                      <div>
                        <input
                          className="cursor-pointer rounded-full"
                          type="checkbox"
                          name="rememberme"
                        />
                        <span className="text-sm ml-[10px]">Remember Me</span>
                      </div>
                      <span className="text-sm text-blue-700 hover:underline cursor-pointer">
                        Forgot password?
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className="max-w-md mx-auto mt-[30px] space-y-6 flex justify-center"
                  onClick={() => handleSubmit()}
                >
                  <a
                    target="_blank"
                    className=" w-[400px] h-[44px] group font-medium tracking-wide select-none text-base relative inline-flex items-center justify-center cursor-pointer border-2 border-solid py-0 px-6 rounded-full overflow-hidden z-10 transition-all duration-300 ease-in-out outline-0 bg-blue-500 text-white border-blue-500 hover:text-blue-500 focus:text-blue-500"
                  >
                    <strong className="font-medium">Log In</strong>
                    <svg
                      className="ml-1 rotate-180 fill-white group-hover:fill-blue-500"
                      width="27"
                      height="27"
                      viewBox="0 0 27 27"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.4"
                        d="M17.6954 12.4962L21.6468 12.1467C22.5335 12.1467 23.2525 12.8727 23.2525 13.7681C23.2525 14.6635 22.5335 15.3895 21.6468 15.3895L17.6954 15.04C16.9997 15.04 16.4357 14.4705 16.4357 13.7681C16.4357 13.0645 16.9997 12.4962 17.6954 12.4962"
                      ></path>
                      <path d="M4.42637 12.5604C4.48813 12.4981 4.71885 12.2345 4.93559 12.0157C6.19989 10.6449 9.50107 8.40347 11.228 7.71751C11.4902 7.60808 12.1532 7.37512 12.5086 7.35864C12.8477 7.35864 13.1716 7.43748 13.4804 7.59279C13.8661 7.81046 14.1738 8.15403 14.3439 8.55878C14.4522 8.83882 14.6224 9.68009 14.6224 9.69539C14.7913 10.6143 14.8834 12.1086 14.8834 13.7606C14.8834 15.3325 14.7913 16.7656 14.6527 17.6999C14.6375 17.7163 14.4674 18.76 14.2821 19.1177C13.943 19.7719 13.28 20.1766 12.5704 20.1766H12.5086C12.046 20.1613 11.0742 19.7554 11.0742 19.7413C9.43931 19.0553 6.21621 16.9221 4.92044 15.5043C4.92044 15.5043 4.55455 15.1396 4.39608 14.9125C4.14904 14.5854 4.02552 14.1806 4.02552 13.7759C4.02552 13.3241 4.16419 12.904 4.42637 12.5604"></path>
                    </svg>
                    <span className="absolute bg-white bottom-0 w-0 left-1/2 h-full -translate-x-1/2 transition-all ease-in-out duration-300 group-hover:w-[105%] -z-[1] group-focus:w-[105%]"></span>
                  </a>
                </div>

                <LoginPopUp
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  Msg={Msg}
                  Status={msgStatus}
                />

                {/* <div className="flex justify-center">
                  <button
                    type="submit"
                    className="border-[1px] w-[400px] rounded-full h-[40px] bg-primary text-forth transition-colors delay-[0.02s] hover:bg-Secondary"
                  >
                    Login
                  </button>
                </div> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
