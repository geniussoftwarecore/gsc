import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUserFromStorage = () => {
      try {
        const storedUser = localStorage.getItem("gsc_user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        }
      } catch (error) {
        console.error("Error loading user from localStorage:", error);
        // Clear invalid data
        localStorage.removeItem("gsc_user");
      } finally {
        setLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    try {
      localStorage.setItem("gsc_user", JSON.stringify(userData));
    } catch (error) {
      console.error("Error saving user to localStorage:", error);
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("gsc_user");
    } catch (error) {
      console.error("Error removing user from localStorage:", error);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};