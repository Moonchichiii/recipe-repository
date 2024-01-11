import React, { useState, Suspense, lazy, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./components/Auth/Protectedroute/ProtectedRoute";
import Footer from "./components/common/Footer/Footer"
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.module.css";

const LandingPage = () => 
<div><h1>Recipe Repository</h1>

</div>;
const AuthModal = lazy(() => import("./components/common/Modal/AuthModal"));
const Dashboard = lazy(() => import("./components/pages/DashBoard/DashBoard"));
const ProfileSetup = lazy(() => import("./components/Auth/Forms/ProfileSetup/ProfileSetup"));

function App() {
  const [showModal, setShowModal] = useState(false);
  const { isAuthenticated, handleLogout } = useContext(AuthContext);

  


  return (    
    <Router>
    {isAuthenticated ? (
  <Button variant="secondary" onClick={handleLogout}>Logout</Button>
) : (
  <Button variant="primary" onClick={() => setShowModal(true)}>Accounts</Button>
)}
<a href="#" onclick="signOut();">Sign out</a>
<script>
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
</script>

      <Suspense fallback={<div>Loading...</div>}>
        {showModal && <AuthModal show={showModal} handleClose={() => setShowModal(false)} />}        
      </Suspense>
      
      <Footer /> 

      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
        </Route>
      </Routes>
    </Router>
     
  );
}

export default App;