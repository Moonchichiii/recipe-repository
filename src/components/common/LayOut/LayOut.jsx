import React from "react";
import NavBar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

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
