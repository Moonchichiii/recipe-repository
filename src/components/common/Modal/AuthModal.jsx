import React, { useState, Suspense, lazy } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import LoginForm from "../../Auth/Forms/LoginForm/LoginForm";

import styles from "./AuthModal.module.css";

const RegistrationForm = lazy(() =>
  import("../../Auth/Forms/RegistrationForm/RegistrationForm")
);
const ProfileSetup = lazy(() =>
  import("../../Auth/Forms/ProfileSetup/ProfileSetup")
);

function AuthModal({ show, handleClose }) {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  

  const toggleForm = () => setIsLoginActive(!isLoginActive);

  const handleSuccessfulRegistration = () => {
    setShowProfileSetup(true);
    setIsLoginActive(false);
  };

  
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className={styles["reg-header"]}>
            {showProfileSetup
              ? "Profile Setup"
              : isLoginActive
              ? "Login"
              : "Sign Up"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Suspense fallback={<div>Loading...</div>}>
            
            {isLoginActive && !showProfileSetup && (
              <>
                <LoginForm onCloseModal={handleClose} />
                <div className="mt-3 text-center">
                  Don't have an account?
                  <Button variant="link" onClick={toggleForm}>
                    Sign up
                  </Button>
                </div>
                <div className="mt-3 text-center">
                <div className="g-signin2" data-onsuccess="onSignIn"></div>
                  </div>                
              </>
            )}
            {!isLoginActive && !showProfileSetup && (
              <>
              
                <RegistrationForm
                  onSuccessfulRegistration={handleSuccessfulRegistration}
                />
                <div className="mt-3 text-center">
                  Have an account?
                  <Button variant="link" onClick={toggleForm}>
                    Login
                  </Button>
                </div>
                <div className="mt-3 text-center">
                <div className="g-signin2" data-onsuccess="onSignIn">
                  </div>
                </div>
              </>
            )}
             {showProfileSetup && <ProfileSetup onProfileUpdate={handleClose} />}
          </Suspense>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AuthModal;

