import React from 'react';
import { AuthProvider } from './components/Auth/Contexts/AuthContext';
import LoginForm from './components/Auth/LoginForm/LoginForm';
import RegistrationForm from './components/Auth/RegistrationForm/RegistrationForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <AuthProvider>
            <>
                <LoginForm />
                <RegistrationForm />
            </>
        </AuthProvider>
    );
}

export default App;