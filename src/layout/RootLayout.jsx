import React from 'react';
import Navber from '../component/Navber/Navber';
import Footer from '../component/Footer/Footer';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <Navber></Navber>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;