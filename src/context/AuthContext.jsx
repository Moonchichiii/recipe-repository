import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout, setAuthToken } from "../service/Api";


// context for authentication,
export const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  handleLogin: () => {},
  handleLogout: () => {},
  handleRegister: () => {},
});

  // user registration
  const handleRegister = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  // user login
  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };
  
  //  user logout 
  const handleLogout = async () => {
    try {
      await logout(); 
  
      localStorage.removeItem("token");
      setAuthToken(null);
      setIsAuthenticated(false);
      setUser(null);
  
       navigate('/');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };






export const AuthProvider = ({ children }) => {
  // checking if user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // storing user data
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        handleLogin,
        handleLogout: logout,
        handleRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
