'use client';

import { useState } from 'react';
import { firebaseClient } from '../../lib/firebaseClient';

export default function APITestPage() {
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testFirebaseAuth = async () => {
    setLoading(true);
    setResponse('Testing Firebase Auth endpoint...');
    
    try {
      console.log('🧪 Testing Firebase Auth API call...');
      const result = await firebaseClient.getUserProfile('test-uid');
      console.log('📋 API Response:', result);
      setResponse(`Success: ${JSON.stringify(result, null, 2)}`);
    } catch (error) {
      console.error('❌ API Error:', error);
      setResponse(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testDirectRequest = async () => {
    setLoading(true);
    setResponse('Testing direct HTTP request...');
    
    try {
      const url = 'http://localhost:8889/.netlify/functions/firebase-auth?uid=test-uid';
      console.log('🧪 Making direct request to:', url);
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('📋 Direct response status:', response.status);
      const data = await response.text();
      console.log('📋 Direct response data:', data);
      
      setResponse(`Direct request result: ${response.status} - ${data}`);
    } catch (error) {
      console.error('❌ Direct request error:', error);
      setResponse(`Direct request error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">API Connection Test</h1>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Environment Info</h2>
              <div className="bg-gray-100 p-4 rounded">
                <p><strong>NODE_ENV:</strong> {process.env.NODE_ENV}</p>
                <p><strong>NEXT_PUBLIC_SERVER_URL:</strong> {process.env.NEXT_PUBLIC_SERVER_URL}</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={testFirebaseAuth}
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Testing...' : 'Test Firebase Client'}
              </button>

              <button
                onClick={testDirectRequest}
                disabled={loading}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? 'Testing...' : 'Test Direct Request'}
              </button>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Response:</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-auto text-sm">
                {response || 'Click a button to test the API connection...'}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
