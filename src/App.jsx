import React, { useState, Suspense } from 'react';
import Button from 'react-bootstrap/Button';
import { AuthProvider } from './components/Auth/Contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  
    const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  
  const AuthModal = React.lazy(() => import('./components/Modal/AuthModal'));
  
  return (
    <>
      <AuthProvider>
        <Button variant="primary" onClick={handleShowModal}>
          Accounts
        </Button>

        {showModal && (
          <Suspense fallback={<div>Loading...</div>}>
            <AuthModal show={showModal} handleClose={handleCloseModal} />
          </Suspense>
        )}
      </AuthProvider>
      
      <ProtectedRoute path="/dashboard" component={Dashboard} />    
    </>
  );
}

export default App;
