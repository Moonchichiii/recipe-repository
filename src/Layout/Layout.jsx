import React from "react";
import Navbar from '../components/common/NavBar/Navbar';
import Footer from "../components/common/Footer/Footer";


const Layout = ({
  children,
  showModal,
  setShowModal,
  isAuthenticated,
  handleLogout,
}) => {
  return (
    <>
      <Navbar
        showModal={showModal}
        setShowModal={setShowModal}
        isAuthenticated={isAuthenticated}
        handleLogout={handleLogout}
      />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
