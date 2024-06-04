import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';

import AddLocation from '../pages/AddLocation';
import ListLocation from '../pages/ListLocation';
import UpdateLocation from '../pages/UpdateLocation';

import AddDoor from '../pages/AddDoor';
import ListDoor from '../pages/ListDoor';
import UpdateDoor from '../pages/UpdateDoor';

import AddUser from '../pages/AddUser';
import UpdateUser from '../pages/UpdateUser';
import ListUser from '../pages/ListUser';

import Page404 from '../pages/404';
import TestOpen from '../pages/TestOpen';


function CustomRoutes(){

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = ''
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

    return(
        <>
        <Routes>       
        <Route exact path="/login" element={<Login />} />
        
        <Route exact path="/" element={<Dashboard />} />

        <Route exact path="/addLocation" element={<AddLocation />} />
        <Route exact path="/listlocation" element={<ListLocation />} />
        <Route exact path="/updateLocation/:id" element={<UpdateLocation/>} />


        <Route exact path="/addDoor" element={<AddDoor />} />
        <Route exact path="/listDoor" element={<ListDoor />} />
        <Route exact path="/updateDoor/:id" element={<UpdateDoor/>} />

        <Route exact path="/addUser" element={<AddUser />} />
        <Route exact path="/updateUser/:id" element={<UpdateUser/>} />
        <Route exact path="/listUser" element={<ListUser />} />
        <Route exact path="/open" element={<TestOpen/>}/>

        <Route exact path="*" element={<Page404/>}/>
      </Routes>
        </>
    )
}

export default CustomRoutes