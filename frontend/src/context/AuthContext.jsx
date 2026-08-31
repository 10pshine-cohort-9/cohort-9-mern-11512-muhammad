import { createContext, useContext, useState, useMemo } from "react";
import API from "../api/client";

const AuthContext = createContext();

const parseJwt = (t) => {
  try {
    return JSON.parse(atob(t.split(".")[1]));
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      if (parsed.full_name || parsed.name) return parsed;
    }
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      const payload = parseJwt(savedToken);
      if (payload) {
        return {
          id: payload.id,
          email: payload.email,
          full_name: payload.full_name || (payload.email ? payload.email.split("@")[0] : "User")
        };
      }
    }
    return null;
  });

  const login = async (email, password) => {
    const res = await API.post("/auth/login", { email, password });
    const { token: authToken, user: loggedUser } = res.data;
    
    localStorage.setItem("token", authToken);
    setToken(authToken);

    const tokenPayload = parseJwt(authToken);
    const resolvedName = loggedUser?.full_name || tokenPayload?.full_name || email.split("@")[0];
    const userData = { email, full_name: resolvedName };

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

  const contextValue = useMemo(() => ({
    token,
    user,
    login,
    register,
    logout,
    isAuthenticated: !!token
  }), [token, user]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
