import React, { lazy, useContext, useState, Suspense } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { logout } from "../../../service/Api";
import Layout from "../../common/Layout/Layout";

const PostModal = lazy(() => import("../../pages/Posts/PostsModal/PostModal"));

function Dashboard() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

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

  const handleShow = () => setShow(true);

  return (
    <div>
      <Layout>  
      <h1>Dashboard</h1>
      
      <Button variant="primary" onClick={handleLogout}>
        Logout
      </Button>
      <div>
      <Button variant="primary" onClick={handleShow}>
        Create New Post
      </Button>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        {show && <PostModal show={show} onHide={() => setShow(false)} />}
      </Suspense>
      </Layout>
    </div>
  );
}

export default Dashboard;
