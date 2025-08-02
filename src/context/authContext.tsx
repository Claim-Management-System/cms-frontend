import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { apiLogin, apiLogout } from '../services/dataServices/auth';

interface User {
  id: string;
  email: string;
  employee_name: string;
  employee_number: number,
  role: 'admin' | 'employee';
  profile_picture?: string;
}

interface AuthContextType {
  user: User | null;
  loginUser: (email: string, password: string) => Promise<{ success: boolean; user?: User; error?: string }>;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // On mount, check sessionStorage for user
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const loginUser  = async (email: string, password: string) => {
    try {
      const { User } = await apiLogin(email, password);
      setUser(User);
      sessionStorage.setItem('user', JSON.stringify(User));
      return {
        success: true,
        user: User
      };
    } catch (error: any) {
      setUser(null);
      sessionStorage.removeItem('user');
      return {
        success: false,
        error: error.message || 'Login failed. Please try again.'
      };
    }
  };

  const logoutUser = async () => {
    try {
      await apiLogout(user?.id!)
      setUser(null);
      sessionStorage.removeItem('user');
      return { success: true };
    } catch (error: any) {
      setUser(null);
      sessionStorage.removeItem('user');
      return { success: false };
    }
  };

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
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