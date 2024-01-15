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
export const AuthProvider = ({ children }) => {
  // checking if user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // storing user data
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
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

  const handleLogout = () => {
    logout()
      .then(() => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("token");
        navigate('/');
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        handleLogin,
        handleLogout,
        handleRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};