// AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { ID } from 'appwrite';
import { account } from '../config/Appwite';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      //checking local storage first
      const cachedUser = localStorage.getItem("user");
      if (cachedUser) {
        setUser(JSON.parse(cachedUser));
        setLoading(false);
        return; 
      }
      // if there is nothing in local storage
      const session = await account.getSession('current');
      
      // If session exists, get user details
      if (session) {
        const userData = await account.get();
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      }
    } catch (error) {
      // These errors are expected when no session exists
      if (![401, 400].includes(error.code)) {
        console.error('Auth initialization error:', error);
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      // Create email/password session
      await account.createEmailPasswordSession(email, password);
      // Get updated user data
      const userData = await account.get();
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    } catch (error) {
      console.error('Login error:', error);
      setError(formatAuthError(error));
      throw error;
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.error('Logout error:', error);
      setError(error.message);
      throw error;
    }
  };

  const register = async (email, password, name) => {
    try {
      setError(null);
      // Create new account
      await account.create(ID.unique(), email, password, name);
      // Log in the new user
      return await login(email, password);
    } catch (error) {
      console.error('Registration error:', error);
      setError(formatAuthError(error));
      throw error;
    }
  };

  // Helper function to format user-friendly error messages
  const formatAuthError = (error) => {
    switch (error.code) {
      case 401:
        return 'Invalid credentials. Please try again.';
      case 400:
        return 'Invalid request. Please check your input.';
      case 409:
        return 'Account already exists with this email.';
      default:
        return error.message || 'An unexpected error occurred.';
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    register,
    initializeAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}