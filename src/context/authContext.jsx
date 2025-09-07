import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogedin, setLogin] = useState(false);


  return (
    <AuthContext.Provider value={{ isLogedin, setLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

