import React, { lazy, useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { logout } from "../../../service/Api";
import PostModal from "../../pages/Posts/PostsModal/PostModal";

function Dashboard() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleLogout = () => {
    logout()
      .then(() => {
        setUser(null);
        localStorage.removeItem("token");
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Button variant="primary" onClick={handleLogout}>
        Logout
      </Button>
      
      <PostModal />
    </div>
  );
}

export default Dashboard;
