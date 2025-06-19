'use client';

import { useAuth } from '../../hooks/useAuth';
import { useState, useEffect } from 'react';
import PostsManager from '../../components/PostsManager';

export default function PostsTestPage() {
  const { user, userProfile, loading: authLoading } = useAuth();  const [connectionTest, setConnectionTest] = useState<'pending' | 'success' | 'error'>('pending');
  const [testMessage, setTestMessage] = useState('');
  const [serverUrl, setServerUrl] = useState('');
  useEffect(() => {
    // Get the server URL that will be used
    const envServerUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    let resolvedServerUrl;
    
    if (envServerUrl) {
      resolvedServerUrl = envServerUrl.includes('/.netlify/functions') 
        ? envServerUrl.replace('/.netlify/functions', '')
        : envServerUrl;
    } else {
      resolvedServerUrl = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:8889' 
        : 'https://abstractalgorithms-server.netlify.app';
    }
      setServerUrl(resolvedServerUrl);

    // Test the posts API connection
    const testConnection = async () => {
      try {
        const response = await fetch(`${resolvedServerUrl}/.netlify/functions/posts?limit=1`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setConnectionTest('success');
          setTestMessage(`API connection successful. Found ${data.posts?.length || 0} posts.`);
        } else {
          throw new Error(`API returned ${response.status}: ${response.statusText}`);
        }
      } catch (error) {
        setConnectionTest('error');
        setTestMessage(`API connection failed: ${error.message}`);
        console.error('Posts API test failed:', error);
      }
    };

    testConnection();
  }, []);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading authentication...</p>
        </div>
      </div>
    );
  }

  const canAccessPosts = userProfile?.role === 'admin' || userProfile?.role === 'content-creator';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Posts API Test</h1>
            <p className="mt-1 text-sm text-gray-600">
              Testing posts functionality and MongoDB integration
            </p>
          </div>

          <div className="p-6 space-y-6">            {/* Connection Test */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">API Connection Test</h2>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">
                  <strong>Server URL:</strong> {serverUrl || 'Loading...'}
                </div>
                </div>
                <div className="flex items-center space-x-2">
                {connectionTest === 'pending' && (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span className="text-gray-600">Testing connection...</span>
                  </>
                )}
                {connectionTest === 'success' && (
                  <>
                    <div className="h-4 w-4 bg-green-500 rounded-full"></div>
                    <span className="text-green-700">{testMessage}</span>
                  </>
                )}
                {connectionTest === 'error' && (
                  <>
                    <div className="h-4 w-4 bg-red-500 rounded-full"></div>
                    <span className="text-red-700">{testMessage}</span>
                  </>
                )}
              </div>
            </div>

            {/* User Info */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Authentication Status</h2>
              {user ? (
                <div className="space-y-2">
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Display Name:</strong> {user.displayName || 'Not set'}</p>
                  <p><strong>Role:</strong> {userProfile?.role || 'No role assigned'}</p>
                  <p><strong>Can Create Posts:</strong> {canAccessPosts ? 'Yes' : 'No'}</p>
                </div>
              ) : (
                <p className="text-gray-600">Not authenticated. Please sign in to test posts functionality.</p>
              )}
            </div>

            {/* Posts Manager */}
            {user && canAccessPosts && (
              <div className="bg-white border rounded-lg">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Posts Management</h2>
                </div>
                <div className="p-4">
                  <PostsManager />
                </div>
              </div>
            )}

            {/* Access Denied */}
            {user && !canAccessPosts && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-yellow-800 mb-2">Access Restricted</h2>
                <p className="text-yellow-700">
                  You need admin or content-creator role to access posts functionality.
                  Current role: {userProfile?.role || 'No role assigned'}
                </p>
              </div>
            )}

            {/* Not Signed In */}
            {!user && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Sign In Required</h2>
                <p className="text-gray-600">
                  Please sign in to test posts functionality. You'll need admin or content-creator role.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
