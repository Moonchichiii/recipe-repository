import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout, setAuthToken } from "../service/Api";

// context for authentication,
export const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  handleLogin: () => {},
  handleLogout: () => {},
  handleRegister: () => {}
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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

  //  user logout
  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("token");
      setAuthToken(null);
      setIsAuthenticated(false);
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        handleLogin,
        handleLogout,
        handleRegister
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
