import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        console.log("AuthContext: Fetching authentication status...");
        const response = await fetch("http://localhost:8000/validate-token", {
          credentials: "include", // Include cookies in the request
        });
        const data = await response.json();
        console.log("AuthContext: Authentication status fetched:", data);
        setIsAuthenticated(data.isAuthenticated);
      } catch (error) {
        console.error("Error validating token:", error);
        setIsAuthenticated(false);
      }
    };

    fetchAuthStatus();
  }, []);

  const login = () => {
    window.location.href = "http://localhost:8000/login"; // FastAPI endpoint
  };

  const logout = () => {
    document.cookie = "id_token=; Max-Age=0; path=/;";
    document.cookie = "access_token=; Max-Age=0; path=/;";
    document.cookie = "refresh_token=; Max-Age=0; path=/;";
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  return useContext(AuthContext);
};
