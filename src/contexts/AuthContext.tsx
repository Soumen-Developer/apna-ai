import React, { createContext, useContext } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';

interface AuthContextType {
  user: any;
  isSignedIn: boolean;
  isLoaded: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isSignedIn, isLoaded } = useUser();
  const { signOut } = useAuth();

  return (
    <AuthContext.Provider value={{ user, isSignedIn, isLoaded, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};