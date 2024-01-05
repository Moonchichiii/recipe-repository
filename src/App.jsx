import React, { useState } from 'react';

import Example from './components/Modal/AuthModal'; 
import NavScrollExample from './components/NavBar/NavBar'


import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';




function App() {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
    
     <NavScrollExample />
    
      <h1>Recipe Respository</h1>
      <Button variant="primary" onClick={handleShow}>
        Accounts
      </Button>
      <Example show={show} handleClose={handleClose} />
    </>
  );
}

export default App;
