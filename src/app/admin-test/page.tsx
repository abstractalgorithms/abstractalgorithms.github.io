'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Users, Crown, Edit3, Mail, Calendar } from 'lucide-react';

export default function AdminTest() {
  const { user, userProfile, loading } = useAuth();
  const [testUsers] = useState([
    {
      uid: 'test-1',
      email: 'admin@test.com',
      displayName: 'Test Admin',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      uid: 'test-2', 
      email: 'user@test.com',
      displayName: 'Test User',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!user) {
    return <div className="p-8">Please sign in to access admin features.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Admin Dashboard (Test Mode)
          </h1>

          {/* Current User Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Current User</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-600">Email:</span>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Role:</span>
                <p className="font-medium">{userProfile?.role || 'Loading...'}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Display Name:</span>
                <p className="font-medium">{userProfile?.displayName || 'Not set'}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">UID:</span>
                <p className="font-medium text-xs">{user.uid}</p>
              </div>
            </div>
          </div>

          {/* Test Users Table */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Test User Management
            </h2>
            <p className="text-gray-600 mb-6">
              This is a test interface showing how the admin dashboard would work with real data.
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">User</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Created</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {testUsers.map((testUser) => (
                    <tr key={testUser.uid} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4">
                            <Users className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {testUser.displayName}
                            </div>
                            <div className="text-sm text-gray-500">{testUser.uid}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-sm text-gray-900">
                          <Mail className="w-4 h-4 mr-2 text-gray-400" />
                          {testUser.email}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          testUser.role === 'admin' 
                            ? 'bg-purple-100 text-purple-800' 
                            : testUser.role === 'content-creator'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {testUser.role === 'admin' && <Crown className="w-3 h-3 mr-1" />}
                          {testUser.role === 'content-creator' && <Edit3 className="w-3 h-3 mr-1" />}
                          {testUser.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-2" />
                          {testUser.createdAt.toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          onClick={() => alert(`Would edit user: ${testUser.displayName}`)}
                        >
                          Edit Role
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Server Status */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              Development Mode
            </h3>
            <p className="text-yellow-700 text-sm">
              This is a test version of the admin dashboard. In production, this would connect to the server 
              at <code className="bg-yellow-100 px-1 rounded">https://abstractalgorithms-server.netlify.app</code> 
              to manage real user data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
