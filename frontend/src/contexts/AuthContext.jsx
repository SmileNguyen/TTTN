import React, { createContext, useContext, useEffect, useState } from "react";

import {
  login as loginService,
  logout as logoutService,
  saveToken,
  saveUser,
  getToken,
  getUser,
  isLoggedIn,
} from "../services/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(null);

  const [loading, setLoading] = useState(true);

  // ===========================
  // INIT
  // ===========================
  useEffect(() => {
    if (isLoggedIn()) {
      setToken(getToken());
      setUser(getUser());
    }

    setLoading(false);
  }, []);

  // ===========================
  // LOGIN
  // ===========================
  async function login(username, password) {
    const data = await loginService(username, password);

    saveToken(data.token);
    saveUser(data.user);

    setToken(data.token);
    setUser(data.user);

    return data.user;
  }

  // ===========================
  // LOGOUT
  // ===========================
  function logout() {
    logoutService();

    setUser(null);
    setToken(null);
  }

  // ===========================
  // ROLE
  // ===========================
  function hasRole(...roles) {
    if (!user) return false;

    return roles.includes(user.role);
  }

  const value = {
    user,
    token,
    loading,

    login,
    logout,

    hasRole,

    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ===========================
// CUSTOM HOOK
// ===========================
export function useAuth() {
  return useContext(AuthContext);
}
