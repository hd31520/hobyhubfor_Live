import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import App from '../Components/Navbar/Navbar';
import { Outlet } from 'react-router';

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
           <div className=''>
             <Outlet></Outlet>
           </div>
        </div>
    );
};

export default Root;