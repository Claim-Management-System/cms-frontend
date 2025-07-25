import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { apiLogin } from '../services/dataServices/auth';

interface User {
  id: string;
  employee_name: string;
  email: string;
  role: 'admin' | 'user';
  employee_number: number;
  profile_picture: string;
  department?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loginUser: (email: string, password: string) => Promise<{ success: boolean; user?: User; error?: string }>;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // On mount, check sessionStorage for user
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const loginUser  = async (email: string, password: string) => {
    try {
      const { User } = await apiLogin(email, password);
      setUser(User);
      setIsAuthenticated(true);
      sessionStorage.setItem('user', JSON.stringify(User));
      return {
        success: true,
        user: User
      };
    } catch (error: any) {
      setUser(null);
      setIsAuthenticated(false);
      sessionStorage.removeItem('user');
      return {
        success: false,
        error: error.message || 'Login failed. Please try again.'
      };
    }
  };

  const logoutUser = () => {
    setUser(null);
    setIsAuthenticated(false);
    sessionStorage.removeItem('user');
  };

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}; 