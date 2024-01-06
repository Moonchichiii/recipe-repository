import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginForm from './components/Auth/LoginForm/LoginForm'
import RegistrationForm from './components/Auth/RegistrationForm/RegistrationForm'




function App() {

  return (
    <>
    
    <LoginForm />

    <RegistrationForm />
    
    </>
  );
}

export default App;
