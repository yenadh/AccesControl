import axios from "axios";
import React, { useState, useEffect } from "react";


function TestOpen(){
    const [state,setState] = useState()
    const [text,setText] = useState("")

    const [users, setUsers] = useState({
        userId: 12,
        doorId: 4        
      }); 

    const OpenDoor = async (e) => {
        try {
          const res = await axios.get("http://localhost:3000/api/logDoors/2");
          console.log(res.data.message)
            setText(res.data.message)
        } catch (err) {
          console.log(err);
        }
      };

    OpenDoor();
    

    return(
    <>
    <div>
        <div><span>{text}</span></div>
    <button type="button" className=" relative top-10 left-10 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Open</button>
    </div>
    </>)
}
export default TestOpen