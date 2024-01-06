import React from 'react';
import NavBar from '../Navbar/NavBar';
import AuthNavbar from '../../components/Authentication/AuthNavbar/AuthNavbar';

import Footer from '../../../components/Footer/Footer';

const Layout = ({ children }) => (
  <>
   <div className='navbars-container'>
    
      <NavBar />    
      <AuthNavbar />    
    </div>

    <main>{children}</main> 
    
    <Footer />
    
  </>
);

export default Layout;