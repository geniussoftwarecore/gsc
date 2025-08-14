import { createContext, useContext, useState, useEffect, ReactNode } from "react";

/**
 * سياق المصادقة (AuthContext) مع دعم JWT
 * يدير حالة المستخدم، تسجيل الدخول، تسجيل الخروج، والتحقق من صلاحية الرمز
 */

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role?: 'admin' | 'client';  // User role for access control
  token?: string;  // JWT token للتحقق من المصادقة في الطلبات المستقبلية
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
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
          
          // TODO: في المستقبل، يجب التحقق من صلاحية الـ JWT 
          // عن طريق إرسال طلب إلى الخادم للتأكد من أن الرمز لا يزال صالحاً
          // const token = localStorage.getItem("gsc_token");
          // if (token) {
          //   validateToken(token).then(isValid => {
          //     if (!isValid) {
          //       logout();
          //     }
          //   });
          // }
        }
      } catch (error) {
        console.error("Error loading user from localStorage:", error);
        // Clear invalid data
        localStorage.removeItem("gsc_user");
        localStorage.removeItem("gsc_token");
      } finally {
        setLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    try {
      // حفظ بيانات المستخدم الكاملة
      localStorage.setItem("gsc_user", JSON.stringify(userData));
      
      // حفظ الرمز منفصلاً للوصول السريع في الطلبات
      if (userData.token) {
        localStorage.setItem("gsc_token", userData.token);
      }
    } catch (error) {
      console.error("Error saving user to localStorage:", error);
    }
  };

  const logout = () => {
    setUser(null);
    try {
      // إزالة كل من بيانات المستخدم والرمز
      localStorage.removeItem("gsc_user");
      localStorage.removeItem("gsc_token");
    } catch (error) {
      console.error("Error removing user from localStorage:", error);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
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