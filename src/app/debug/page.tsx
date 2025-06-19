'use client';

import AuthDebugger from '../../components/AuthDebugger';

export default function DebugPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">🔧 Firebase Debug Console</h1>
          <p className="text-gray-600 mb-6">
            This page is for development and debugging purposes only. 
            Use it to test Firebase authentication, Firestore connections, and user management.
          </p>
          
          <AuthDebugger />
          
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Development Only</h3>
            <p className="text-yellow-700 text-sm">
              This debug interface should not be accessible in production. 
              Remove or protect this route before deploying to production.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
