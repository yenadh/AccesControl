import React, { useEffect, useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from "../partials/Tables/WelcomeBanner";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

  axios.defaults.withCredentials = true;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const [name, setName] = useState("")
  useEffect(() => {
    axios.get("http://localhost:3000/api/user/login/userData")
    .then((res) => {
      setName(res.data.userData.firstName);
    })
    .catch((err) => navigate("/login"));
  }, []);  

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} userName={name} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Welcome banner */}
            <WelcomeBanner user={name} />      
            

          </div>
        </main>

      </div>
    </div>
  );
}

export default Dashboard;