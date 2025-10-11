import React, { createContext, useContext, useState, ReactNode } from "react";
import type { IUser } from "../types/index";

import {
  getUser,
  getToken,
  saveUser,
  logout as logoutUtil,
} from "../utils/auth";

interface AuthContextType {
  user: IUser | null;
  token: string | null;
  login_user: (user: IUser, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(getUser());
  const [token, setToken] = useState<string | null>(getToken());

  const login_user = (user: IUser, token: string) => {
    saveUser(user, token);
    setUser(user);
    setToken(token);
  };

  const logout = () => {
    logoutUtil();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login_user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
