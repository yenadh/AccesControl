import React, { useState, useEffect } from "react";
import { Alert } from "@material-tailwind/react";

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function MsgBoxG(props) {
    const [showAlert, setShowAlert] = useState(props.visibility);
  
    useEffect(() => {
      setShowAlert(props.visibility);
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);
  
      return () => clearTimeout(timer);
    }, [props.visibility]);
  
    return (
      <div className="absolute top-1 z-60 w-[500px] ml-[20px]">
        {showAlert && (
          <Alert
            icon={<Icon />}
            className="rounded-none border-l-4 border-[#15803d] dark:border-[#63c672] bg-[#95d99f] dark:bg-[#2ec946]/10 font-medium text-black dark:text-[#2ec946]"
          >
            {props.alert}
          </Alert>
        )}
      </div>
    );
}

export function MsgBoxR(props) {
    const [showAlert, setShowAlert] = useState(props.visibility);
  
    useEffect(() => {
      setShowAlert(props.visibility);
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);
  
      return () => clearTimeout(timer);
    }, [props.visibility]);
  
    return (
      <div className="absolute top-1 z-60 w-[500px] ml-[20px]">
        {showAlert && (
          <Alert
            icon={<Icon />}
            className="rounded-none border-l-4 border-[#862929] dark:border-[#ea6a6a] bg-[#ff9595d5] dark:bg-[#ff9595d5]/10 font-medium text-black dark:text-[#d85c5c]"
          >
             {props.alert}
          </Alert>
        )}
      </div>
    );
}
