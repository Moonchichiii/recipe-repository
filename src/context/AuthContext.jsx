import React, { createContext, useState } from 'react';

// context for authentication, 
export const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {
    // checking if user is authenticated
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // storing user data
    const [user, setUser] = useState(null);
  

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
    setIsAuthenticated(false);
    setUser(null);
    
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, handleLogin, handleLogout, handleRegister }}>
      {children}
    </AuthContext.Provider>
  );
};