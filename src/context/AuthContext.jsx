import React, { createContext, useState, useContext } from "react";
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

  // define the handleLogin function
  const handleLogin = (userData) => {
    console.log("Logging in with username:", userData.username); 
    setIsAuthenticated(true);
    setUser(userData);
    navigate("/dashboard");
  };

  // Define the handleLogout function
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

  // Define the handleRegister function
  const handleRegister = (userData, onSuccessfulRegistration) => { 
    setIsAuthenticated(true);
    setUser(userData);
    console.log("User registered:", userData); 
    handleLogin(userData); 
    onSuccessfulRegistration();
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
