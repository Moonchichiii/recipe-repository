import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { logout } from '../../../service/Api';

function Dashboard({signOut}) {
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

    function signOut() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          console.log('User signed out.');   
        });
      }

    return (
        <div>
            <h1>Dashboard</h1>            
        </div>
    );
}

export default Dashboard;
