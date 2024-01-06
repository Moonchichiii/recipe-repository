import React, { useState } from 'react';
import AuthModal from './components/Modal/AuthModal'; 
import Button from 'react-bootstrap/Button';
import { AuthProvider } from './components/Auth/Contexts/AuthContext';

function App() {
  
    const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
<>
<AuthProvider>


        <Button variant="primary" onClick={handleShowModal}>

          Accounts

        </Button>

        <AuthModal show={showModal} handleClose={handleCloseModal} />

    </AuthProvider>
    </>
          );
}

export default App;
