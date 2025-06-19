'use client';

import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { firebaseClient, UserProfile } from '../lib/firebaseClient';

// Types
interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
  hasPermission: (permission: string) => boolean;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user profile from server
  const loadUserProfile = async (user: User) => {
    try {
      console.log('🔍 Loading user profile for UID:', user.uid);
      const authToken = await user.getIdToken();
      
      // Try server first, fallback to local profile for testing
      try {
        const profileData = await firebaseClient.getUserProfile(user.uid, authToken);
        
        if (profileData) {
          console.log('📋 Profile data loaded from server:', profileData);
          setUserProfile(profileData);
          return;
        }
      } catch (serverError) {
        console.warn('⚠️ Server unavailable, using fallback profile:', serverError);
      }
      
      // Fallback: Create local profile for testing
      console.log('🔄 Creating fallback local profile...');
      
      // For testing - make user admin if email contains 'admin' or 'test'
      const isTestAdmin = user.email?.includes('admin') || user.email?.includes('test');
      
      const fallbackProfile: UserProfile = {
        uid: user.uid,
        email: user.email!,
        displayName: user.displayName || user.email!.split('@')[0],
        role: isTestAdmin ? 'admin' : 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setUserProfile(fallbackProfile);
      console.log('✅ Fallback profile created:', fallbackProfile);
      
    } catch (error) {
      console.error('❌ Error loading user profile:', error);
    }
  };

  // Auth state listener
  useEffect(() => {
    console.log('🔥 Firebase config:', {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'loaded' : 'missing',
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? 'loaded' : 'missing',
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? 'loaded' : 'missing'
    });
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('🔄 Auth state changed:', user ? `User logged in: ${user.email}` : 'User logged out');
      setUser(user);
      
      if (user) {
        console.log('🔄 Loading profile for authenticated user...');
        await loadUserProfile(user);
      } else {
        console.log('🔄 Clearing user profile...');
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sign in
  const signIn = async (email: string, password: string) => {
    try {
      console.log('🔐 useAuth: Starting sign in process for:', email);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('✅ useAuth: Firebase sign in successful:', userCredential.user.uid);
    } catch (error: any) {
      console.error('❌ useAuth: Sign in failed:', error);
      throw new Error(error.message);
    }
  };

  // Sign up
  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update the user's display name
      await updateProfile(user, { displayName });

      // Create user profile via server
      const authToken = await user.getIdToken();
      const userProfile: Partial<UserProfile> = {
        email,
        displayName,
        role: 'user', // Default role, admin can change later
      };
      
      await firebaseClient.createUserProfile(user.uid, userProfile, authToken);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  // Update user profile
  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!user) throw new Error('No user authenticated');

    try {
      const authToken = await user.getIdToken();
      
      // Update via server
      const success = await firebaseClient.updateUserProfile(user.uid, data, authToken);
      
      if (!success) {
        throw new Error('Failed to update profile on server');
      }

      // Update display name in Auth if provided
      if (data.displayName) {
        await updateProfile(user, { displayName: data.displayName });
      }

      // Update local state
      setUserProfile(prev => prev ? { ...prev, ...data, updatedAt: new Date() } : null);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  // Check user permissions
  const hasPermission = (permission: string): boolean => {
    if (!userProfile) return false;

    const rolePermissions = {
      admin: ['create', 'read', 'update', 'delete', 'manage_users'],
      editor: ['create', 'read', 'update'],
      contributor: ['create', 'read'],
      reader: ['read']
    };

    const userPermissions = rolePermissions[userProfile.role] || [];
    return userPermissions.includes(permission);
  };

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    logout,
    resetPassword,
    updateUserProfile,
    hasPermission
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
