import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginResponse } from '../../../shared/types/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, redirectUrl?: string) => Promise<void>;
  verifyMagicLink: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  trialDaysRemaining: number | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  const trialDaysRemaining = user?.subscription?.status === 'trialing' && user.subscription.trialEndsAt
    ? Math.max(0, Math.ceil((new Date(user.subscription.trialEndsAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : null;

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      const response = await fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        localStorage.removeItem('auth_token');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('auth_token');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, redirectUrl?: string) => {
    const response = await fetch('/api/auth/login-magic', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, redirectUrl }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to send magic link');
    }
  };

  const verifyMagicLink = async (token: string) => {
    const response = await fetch('/api/auth/login-magic/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to verify magic link');
    }

    const loginResponse: LoginResponse = await response.json();
    
    localStorage.setItem('auth_token', loginResponse.tokens.accessToken);
    setUser(loginResponse.user);
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (token) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('auth_token');
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    verifyMagicLink,
    logout,
    trialDaysRemaining,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}