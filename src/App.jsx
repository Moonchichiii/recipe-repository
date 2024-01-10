import { useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/Auth/Protectedroute/ProtectedRoute";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const LandingPage = () => {
  return (
    <div>
      <h1>Recipe Repository</h1>
    </div>
  );
};
function App() {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const AuthModal = lazy(() => import("./components/common/Modal/AuthModal"));
  const Dashboard = lazy(() =>
    import("./components/pages/DashBoard/DashBoard")
  );
  const ProfileSetup = lazy(() =>
    import("./components/Auth/Forms/ProfileSetup/ProfileSetup")
  );

  return (
    <AuthProvider>
      <Router>
        <Button variant="primary" onClick={handleShowModal}>
          Accounts
        </Button>

        <Suspense fallback={<div>Loading...</div>}>
          {showModal && (
            <AuthModal show={showModal} handleClose={handleCloseModal} />
          )}
        </Suspense>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile-setup" element={<ProfileSetup />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
