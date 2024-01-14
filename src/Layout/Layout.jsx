import React from "react";
import NavBar from '../components/common/NavBar/NavBar';
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
      <NavBar
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
