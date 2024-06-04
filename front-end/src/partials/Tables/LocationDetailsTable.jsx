import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import PageTopic from "../PageTopic";
import Modal from "../../components/ListOfDoors";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LocationTable() {
  axios.defaults.withCredentials = true;
  const [locations, setLocation] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dateString = "----/--/--";
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);
  const [selectedName, setSelectedName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/user/login/userData")
      .then((res) => {})
      .catch((err) => navigate("/login"));
  }, []);

  //**** Fetch Data to Location Details table - start ****//
  useEffect(() => {
    const fetctUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/location");
        setLocation(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetctUser();
  }, []);
  //**** Fetch Data to Location Details table - end ****//

  //**** pagination and search data in the table - start ****//
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  let filteredLocations = [...locations];
  if (searchTerm) {
    filteredLocations = filteredLocations.filter((location) => {
      const { locatioName, address } = location;
      const searchText = `${locatioName} ${address}`.toLowerCase();
      return searchText.includes(searchTerm.toLowerCase());
    });
  }
  const currentRows = filteredLocations.slice(indexOfFirstRow, indexOfLastRow);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };
  //**** pagination and search data in the table - end ****//

  const handleRead = (id, name) => {
    setSelectedId(id);
    setSelectedName(name);
    setShowModal(true);
  };

  //**** Delete funtion and delete pop-up msg - start ****//
  const handleDelete = async (id) => {
    setIsOpen(true);
  };
  const SpringModal = ({ isOpen, setIsOpen, id }) => {
    const deleteData = async () => {
      try {
        const res = await axios.delete(
          `http://localhost:3000/api/location/${id}`
        );
        window.location.reload();
      } catch (error) {
        console.log(error.message);
      }
    };
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
                  Delete Alert!
                </h3>
                <p className="text-center mb-6">
                  Do you wants to delete this record
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => deleteData()}
                    className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
    //**** Delete funtion and delete pop-up msg - end ****//
  };

  return (
    <div>
      <PageTopic name="Location Details" />
      <div className="relative bottom-[40px]">
        <button
          type="button"
          onClick={() => navigate("/addLocation")}
          className=" z-40 relative left-[80px] top-[85px] text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Add Location
        </button>

        <div className="flex justify-end space-x-5 relative right-[80px] top-[30px] text-[14px] font-semibold">
          {/* Rows per page dropdown */}
          <div className="mb-3">
            <label htmlFor="rowsPerPage" className="mr-2">
              Rows per page:
            </label>
            <select
              id="rowsPerPage"
              onChange={handleRowsPerPageChange}
              value={rowsPerPage}
              className="h-[38px]"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
          </div>
          {/* Search input */}
          <div className="mb-3">
            <label htmlFor="search" className="mr-2">
              Search:
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              className="h-[38px]"
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>
      <div className=" relative top-[20px] mx-[80px] col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">
            Location Detail
          </h2>
        </header>
        <div className="p-3">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              {/* Table header */}
              <thead className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
                <tr>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Location Name</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">City</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Address</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Created User</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Created Date</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left"> Updated User</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left"> Updated Date</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left ml-4">Status</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left ml-2">
                      Operation
                    </div>
                  </th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
                {currentRows.map((location) => {
                  return (
                    <tr key={location.id}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-left">
                          <div className="font-medium text-slate-800 dark:text-slate-100">
                            {location.locationName}
                          </div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{location.city}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{location.address}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{location.createdUser}</div>
                      </td>

                      <td className="whitespace-nowrap">
                        <div className="text-md text-left ml-2">
                          {
                            new Date(location.createdDate)
                              .toISOString()
                              .split("T")[0]
                          }
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-md text-left">
                          {location.updatedUser}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-md text-left">
                          {location.updatedDate
                            ? new Date(location.updatedDate)
                                .toISOString()
                                .split("T")[0]
                            : dateString}
                        </div>
                      </td>

                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-left">
                          {location.status === 1 ? (
                            <span className="px-2 py-1 leading-tight text-green-700 bg-green-100 rounded-full font-medium text-[14px]">
                              Active
                            </span>
                          ) : (
                            <span className="px-2 py-1 leading-tight text-red-700 bg-red-100 rounded-full font-medium text-[14px]">
                              InActive
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-left">
                          <button
                            onClick={() =>
                              navigate(`/updateLocation/${location.id}`)
                            }
                            className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20"
                            type="button"
                          >
                            <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="h-4 w-4 fill-[#000000] dark:fill-[#ffffff]"
                              >
                                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                              </svg>
                            </span>
                          </button>
                          <button
                            onClick={() => handleDelete(location.id)}
                            className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20"
                            type="button"
                          >
                            <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                              <svg
                                className="h-4 w-4 stroke-[#000000] dark:stroke-[#ffffff]"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                            <SpringModal
                              isOpen={isOpen}
                              setIsOpen={setIsOpen}
                              id={location.id}
                            />
                          </button>
                          <button
                            onClick={() =>
                              handleRead(location.id, location.locationName)
                            }
                            className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20"
                            type="button"
                          >
                            <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                              <svg
                                className="h-5 w-5 fill-[#000000] dark:fill-[#ffffff]"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M3.415 10.242c-.067-.086-.13-.167-.186-.242a16.806 16.806 0 011.803-2.025C6.429 6.648 8.187 5.5 10 5.5c1.813 0 3.57 1.148 4.968 2.475A16.816 16.816 0 0116.771 10a16.9 16.9 0 01-1.803 2.025C13.57 13.352 11.813 14.5 10 14.5c-1.813 0-3.57-1.148-4.968-2.475a16.799 16.799 0 01-1.617-1.783zm15.423-.788L18 10l.838.546-.002.003-.003.004-.01.016-.037.054a17.123 17.123 0 01-.628.854 18.805 18.805 0 01-1.812 1.998C14.848 14.898 12.606 16.5 10 16.5s-4.848-1.602-6.346-3.025a18.806 18.806 0 01-2.44-2.852 6.01 6.01 0 01-.037-.054l-.01-.016-.003-.004-.001-.002c0-.001-.001-.001.837-.547l-.838-.546.002-.003.003-.004.01-.016a6.84 6.84 0 01.17-.245 18.804 18.804 0 012.308-2.66C5.151 5.1 7.394 3.499 10 3.499s4.848 1.602 6.346 3.025a18.803 18.803 0 012.44 2.852l.037.054.01.016.003.004.001.002zM18 10l.838-.546.355.546-.355.546L18 10zM1.162 9.454L2 10l-.838.546L.807 10l.355-.546zM9 10a1 1 0 112 0 1 1 0 01-2 0zm1-3a3 3 0 100 6 3 3 0 000-6z"
                                />
                              </svg>
                            </span>
                          </button>

                          <Modal
                            showModal={showModal}
                            setShowModal={setShowModal}
                            Name={selectedName}
                            id={selectedId}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="pagination relative top-[80px] left-[70px] flex">
        <button
          className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from(
          { length: Math.ceil(filteredLocations.length / rowsPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={
                currentPage === i + 1
                  ? " bg-slate-400 relative block w-[40px] h-[40px] rounded-full bg-transparent mx-2 px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                  : "relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
              }
            >
              {i + 1}
            </button>
          )
        )}
        <button
          className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400"
          onClick={() => paginate(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(filteredLocations.length / rowsPerPage)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default LocationTable;
