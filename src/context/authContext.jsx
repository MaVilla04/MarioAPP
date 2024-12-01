import React, { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

// Crea el contexto de autenticación
const AuthContext = createContext();
const apiUrl = process.env.API_HOST;

// Crea el socket una sola vez para toda la aplicación
const socket = io(apiUrl, { transports: ["websocket"], reconnection: true });

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("authToken"));
  const [socketStatus, setSocketStatus] = useState("Disconnect");

  const login = (token) => {
    localStorage.setItem("authToken", token); // Guarda el token en localStorage
    setIsAuthenticated(true); // Actualiza el estado
  };

  const logout = () => {
    localStorage.removeItem("authToken"); // Elimina el token
    setIsAuthenticated(false); // Actualiza el estado
  };

  // Manejo del estado del socket
  useEffect(() => {
    socket.on("connect", () => setSocketStatus("Online"));
    socket.on("disconnect", () => setSocketStatus("Disconnect"));

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        socketStatus, // Exportamos el estado del socket para usarlo en otros componentes
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acceder al contexto
export const useAuth = () => {
  return useContext(AuthContext);
};
