import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import LoginForm from '../../Auth/LoginForm/LoginForm';  
import RegistrationForm from '../../Auth/RegistrationForm/RegistrationForm';
import ProfileSetup from '../../Auth/ProfileSetup/ProfileSetup';
import google from '../../../assets/images/web_dark_rd_SI_1x.webp';

import styles from './AuthModal.module.css';

function AuthModal({ show, handleClose }) {
    const [isLoginActive, setIsLoginActive] = useState(true);
    const [showProfileSetup, setShowProfileSetup] = useState(false);

    const toggleForm = () => setIsLoginActive(!isLoginActive);

    const handleSuccessfulRegistration = () => {
        setShowProfileSetup(true);
        handleClose();
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
                    <Modal.Title className={styles['reg-header']}>                
                        {isLoginActive ? 'Login' : 'Sign up'}
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
                            <RegistrationForm onSuccessfulRegistration={handleSuccessfulRegistration} />
                            <div className="mt-3 text-center">
                                Have an account? 
                                <Button variant="link" onClick={toggleForm}>Login</Button>
                            </div>
                        </>
                    )}
                    <div className="mt-3 text-center">
                        <img src={google} alt="Social login with google" />
                    </div>
                </Modal.Body>
            </Modal>
            
            <Modal
                show={showProfileSetup}
                onHide={() => setShowProfileSetup(false)}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Profile Setup</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProfileSetup />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AuthModal;
