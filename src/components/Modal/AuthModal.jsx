import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import LoginForm from '../Auth/LoginForm/LoginForm';  
import RegistrationForm from '../Auth/RegistrationForm/RegistrationForm';

import './AuthModal.module.css';

function AuthModal({ show, handleClose }) {
  const [isLoginActive, setIsLoginActive] = useState(true);

  const toggleForm = () => setIsLoginActive(!isLoginActive);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered 
    >
      <Modal.Header closeButton>
        <Modal.Title className="reg-header">        
          {isLoginActive ? 'Login / Sign up' : 'Sign up'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoginActive ? (
          <>
            <LoginForm />
            <div className="mt-3 text-center">
              Don't have an account? 
              <Button variant="link" onClick={toggleForm}>Sign up</Button>
            </div>
          </>
        ) : (
          <>
            <RegistrationForm />
            <div className="mt-3 text-center">
              Have an account? 
              <Button variant="link" onClick={toggleForm}>Login</Button>
            </div>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
     
      </Modal.Footer>
    </Modal>
  );
}

export default AuthModal;
