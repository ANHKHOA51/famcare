import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  name: string;
}

type LogoutReason = "manual" | "expired";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: (reason?: LogoutReason) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("aura_token");
    const savedUser = localStorage.getItem("aura_user");

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch {
        // Pass 3 Fix #3: corrupted localStorage — clear it to prevent permanent white screen
        localStorage.removeItem("aura_token");
        localStorage.removeItem("aura_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("aura_token", newToken);
    localStorage.setItem("aura_user", JSON.stringify(newUser));
    toast.success(`Chào mừng trở lại, ${newUser.name || 'bạn'}!`);
  };

  const logout = (reason: LogoutReason = "manual") => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("aura_token");
    localStorage.removeItem("aura_user");
    if (reason === "expired") {
      toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
    } else {
      toast.info("Đã đăng xuất.");
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
