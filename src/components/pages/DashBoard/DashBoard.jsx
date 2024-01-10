// Dashboard component
import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../service/Api';

function Dashboard() {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout().then(() => {

            setUser(null);
            localStorage.removeItem('token');
            

            navigate('/');
        }).catch((error) => {
            console.error('Logout failed:', error);
        });
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    );
}

export default Dashboard;
