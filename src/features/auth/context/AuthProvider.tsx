import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { loginRequest, logoutRequest } from "../api/authApi";
import type { LoginCredentials, User } from "../types";

const STORAGE_KEY = "auth_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as User) : null;
  });

  const login = async (credentials: LoginCredentials) => {
    const loggedUser = await loginRequest(credentials);
    setUser(loggedUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedUser));
  };

  const logout = async () => {
  try {
    await logoutRequest();      // el servidor borra la cookie HttpOnly
  } finally {
    setUser(null);              // pase lo que pase, la UI cierra sesión
    localStorage.removeItem(STORAGE_KEY);
  }
};

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}