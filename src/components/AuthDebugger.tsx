'use client';

import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

export default function AuthDebugger() {
  const { user, userProfile, loading, signUp, signIn } = useAuth();
  const [debugInfo, setDebugInfo] = useState<any>(null);  const testFirebaseConnection = async () => {
    try {
      console.log('🧪 Testing Firebase connection...');
      
      if (user) {
        console.log('🔍 Testing user profile via server...');
        
        setDebugInfo({
          user: {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName
          },
          userProfile: userProfile,
          timestamp: new Date().toISOString()
        });
        
        console.log('✅ Debug info updated:', debugInfo);
      } else {
        setDebugInfo({
          error: 'No user logged in',
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('❌ Firebase test failed:', error);
      setDebugInfo({
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  };const testSignIn = async () => {
    try {
      console.log('🧪 Testing sign in with test@example.com...');
      
      await signIn('test@example.com', 'password123');
      console.log('✅ Sign in successful!');
    } catch (error) {
      console.error('❌ Sign in failed:', error);
      setDebugInfo({
        error: `Sign in failed: ${error.message}`,
        timestamp: new Date().toISOString()
      });
    }
  };

  const testSignUp = async () => {
    try {
      console.log('🧪 Testing sign up...');
      
      await signUp('test@example.com', 'password123', 'Test User');
      console.log('✅ Sign up successful!');
    } catch (error) {
      console.error('❌ Sign up failed:', error);
      setDebugInfo({
        error: `Sign up failed: ${error.message}`,
        timestamp: new Date().toISOString()
      });
    }
  };

  if (loading) {
    return <div className="p-4 bg-yellow-100 border border-yellow-400 rounded">
      <h3 className="font-bold">Auth Loading...</h3>
    </div>;
  }

  return (
    <div className="p-4 bg-blue-100 border border-blue-400 rounded mb-4">
      <h3 className="font-bold mb-2">🔍 Firebase Auth Debugger</h3>
      
      <div className="space-y-2 text-sm">
        <div><strong>User:</strong> {user ? user.email : 'Not logged in'}</div>
        <div><strong>User Profile:</strong> {userProfile ? JSON.stringify(userProfile.role) : 'No profile'}</div>
        <div><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</div>
      </div>      <button 
        onClick={testSignIn}
        className="mt-2 px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600 mr-2"
      >
        🔑 Sign In Test User
      </button>

      <button 
        onClick={testFirebaseConnection}
        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 mr-2"
      >
        🧪 Test Firebase Connection
      </button>

      <button 
        onClick={testSignUp}
        className="mt-2 px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
      >
        👤 Test Sign Up
      </button>

      {debugInfo && (
        <div className="mt-3 p-2 bg-gray-100 rounded text-xs">
          <h4 className="font-bold">Debug Results:</h4>
          <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
