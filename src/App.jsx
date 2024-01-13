import React, { useState, lazy, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./components/Auth/Protectedroute/ProtectedRoute";
import Layout from "./components/common/MainLayout/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.module.css";

const Dashboard = lazy(() => import("./components/pages/DashBoard/DashBoard"));
const ProfileSetup = lazy(() =>
  import("./components/Auth/Forms/ProfileSetup/ProfileSetup")
);

function App() {
  const [showModal, setShowModal] = useState(false);
  const { isAuthenticated, handleLogout } = useContext(AuthContext);

  return (
    
      <Layout
        showModal={showModal}
        setShowModal={setShowModal}
        isAuthenticated={isAuthenticated}
        handleLogout={handleLogout}
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />          

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile-setup" element={<ProfileSetup />} />
          </Route>
        </Routes>
      </Layout>
    
  );
}


const LandingPage = () => (
  <div>
    
  </div>
);


export default App;

