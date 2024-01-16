import React, { createContext, useState } from "react";


export const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  handleLogin: () => {},
  handleLogout: () => {},
  handleRegister: () => {},
});


