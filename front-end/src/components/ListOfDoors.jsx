import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Modal({ showModal, setShowModal, Name, id }) {
  axios.defaults.withCredentials = true;

  const [DoorLocations, setDoorLocation] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/location/door/${id}`
        );
        console.log(res.data);
        setDoorLocation(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (id) {
      fetchUser();
    }
  }, [id]);

  //console.log(DoorLocations);

  return (
    <>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-xl font-semibold">{Name}</h3>
                </div>
                <div className="relative p-6 flex-auto w-[600px]">
                  <ul className="max-w-md space-y-1 text-gray-500 text-[14px] font-medium list-disc list-inside dark:text-gray-400">
                    {DoorLocations.map((DoorLocation) => {
                      return (
                        <li key={DoorLocation.id}>{DoorLocation.doorName}</li>
                      );
                    })}
                  </ul>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
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

export default Modal;
