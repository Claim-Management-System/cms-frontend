import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';


interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
  department?: string;
  employeeId?: string;
}


interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  // const context = useContext(AuthContext);
  // if (context === undefined) {
  //   throw new Error('useAuth must be used within an AuthProvider');
  // }


  // return context;

  return {
    user: {
      id: '123',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'admin',
    },
    isAuthenticated: true,
    login: () => {},
    logout: () => {},
  }
}; 