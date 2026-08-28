import { createContext, useContext, useState } from "react";
import API from "../api/client";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email, password) => {
    const res = await API.post("/auth/login", { email, password });
    const { token: authToken } = res.data;
    localStorage.setItem("token", authToken);
    setToken(authToken);

    const userData = { email };
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    return res.data;
  };

  const register = async (fullName, email, password) => {
    const res = await API.post("/auth/register", {
      full_name: fullName,
      email,
      password
    });
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
