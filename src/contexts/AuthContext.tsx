import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simple user storage using localStorage
const USERS_KEY = 'ai_mood_artist_users';
const CURRENT_USER_KEY = 'ai_mood_artist_current_user';

interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string; // In a real app, this would be hashed
  avatar: string;
  createdAt: string;
}

const getStoredUsers = (): StoredUser[] => {
  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error('Error getting stored users:', error);
    return [];
  }
};

const saveUsers = (users: StoredUser[]) => {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users:', error);
  }
};

const getCurrentUser = (): User | null => {
  try {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

const saveCurrentUser = (user: User | null) => {
  try {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  } catch (error) {
    console.error('Error saving current user:', error);
  }
};

const generateAvatar = (name: string): string => {
  const avatars = [
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  ];
  
  // Use name to consistently pick an avatar
  const index = name.length % avatars.length;
  return avatars[index];
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Check for existing user session on app load
    const initializeAuth = () => {
      try {
        const currentUser = getCurrentUser();
        console.log('Initializing auth, current user:', currentUser);
        setState({
          user: currentUser,
          isAuthenticated: !!currentUser,
          isLoading: false
        });
      } catch (error) {
        console.error('Error initializing auth:', error);
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false
        });
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    console.log('Login attempt for:', email);
    setState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const users = getStoredUsers();
      console.log('Stored users:', users);
      
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      console.log('Found user:', user);

      if (!user) {
        setState(prev => ({ ...prev, isLoading: false }));
        return { success: false, error: 'No account found with this email address' };
      }

      if (user.password !== password) {
        setState(prev => ({ ...prev, isLoading: false }));
        return { success: false, error: 'Incorrect password' };
      }

      const authenticatedUser: User = {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      };

      console.log('Login successful, saving user:', authenticatedUser);
      saveCurrentUser(authenticatedUser);
      setState({
        user: authenticatedUser,
        isAuthenticated: true,
        isLoading: false
      });

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      setState(prev => ({ ...prev, isLoading: false }));
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const register = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    console.log('Register attempt for:', email);
    setState(prev => ({ ...prev, isLoading: true }));
    
    // Basic validation
    if (!name.trim()) {
      setState(prev => ({ ...prev, isLoading: false }));
      return { success: false, error: 'Name is required' };
    }

    if (!email.trim()) {
      setState(prev => ({ ...prev, isLoading: false }));
      return { success: false, error: 'Email is required' };
    }

    if (password.length < 6) {
      setState(prev => ({ ...prev, isLoading: false }));
      return { success: false, error: 'Password must be at least 6 characters long' };
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const users = getStoredUsers();
      console.log('Current users before registration:', users);
      
      // Check if user already exists
      const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existingUser) {
        setState(prev => ({ ...prev, isLoading: false }));
        return { success: false, error: 'An account with this email already exists' };
      }

      // Create new user
      const newStoredUser: StoredUser = {
        id: Date.now().toString(),
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password, // In a real app, this would be hashed
        avatar: generateAvatar(name),
        createdAt: new Date().toISOString()
      };

      console.log('Creating new user:', newStoredUser);

      // Save to storage
      const updatedUsers = [...users, newStoredUser];
      saveUsers(updatedUsers);
      console.log('Users after registration:', updatedUsers);

      // Create user object for state
      const newUser: User = {
        id: newStoredUser.id,
        name: newStoredUser.name,
        email: newStoredUser.email,
        avatar: newStoredUser.avatar
      };

      console.log('Registration successful, saving user:', newUser);
      saveCurrentUser(newUser);
      setState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false
      });

      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      setState(prev => ({ ...prev, isLoading: false }));
      return { success: false, error: 'An unexpected error occurred during registration' };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      console.log('Logging out user');
      saveCurrentUser(null);
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ state, login, register, logout }}>
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