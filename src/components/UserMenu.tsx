'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import { 
  User, 
  LogOut, 
  Settings, 
  ChevronDown, 
  Shield,
  Mail,
  Calendar,
  Edit3,
  Award
} from 'lucide-react';

interface UserMenuProps {
  className?: string;
}

export default function UserMenu({ className = '' }: UserMenuProps) {
  const { user, userProfile, logout, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Loading state - maintain consistent size
  if (loading) {
    return (
      <div className={`flex items-center ${className}`}>
        <div className="flex items-center gap-2 px-4 py-2 min-w-[100px] justify-center">
          <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  // Unauthenticated state - consistent size with authenticated state
  if (!user || !userProfile) {
    return (
      <div className={`flex items-center ${className}`}>
        <button 
          onClick={() => {
            const event = new CustomEvent('openAuthModal');
            window.dispatchEvent(event);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 min-w-[100px] justify-center"
        >
          <User className="w-4 h-4" />
          Sign In
        </button>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800 border-red-200';
      case 'editor': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'contributor': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return '👑';
      case 'editor': return '✏️';
      case 'contributor': return '📝';
      default: return '👤';
    }
  };
  return (
    <div className={`relative ${className}`}>
      {/* User Avatar/Button - Consistent sizing */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-2 pr-3 rounded-xl hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200 hover:shadow-sm min-w-[120px]"
      >
        <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold shadow-sm">
          {userProfile.displayName ? userProfile.displayName[0].toUpperCase() : user.email?.[0].toUpperCase()}
        </div>
        <div className="hidden md:block text-left flex-1">
          <div className="text-sm font-semibold text-gray-900 truncate">
            {userProfile.displayName || 'User'}
          </div>
          <div className="text-xs text-gray-500 capitalize">
            {userProfile.role}
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />          {/* Menu - Enhanced with animation */}
          <div 
            className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-20 transition-all duration-150 ease-out"
            style={{
              animation: 'fadeIn 0.15s ease-out'
            }}
          >
            {/* User Info Header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-lg">
                  {userProfile.displayName ? userProfile.displayName[0].toUpperCase() : user.email?.[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 truncate">
                    {userProfile.displayName || 'Unnamed User'}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Mail className="w-3 h-3" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span 
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getRoleColor(userProfile.role)}`}
                    >
                      <span>{getRoleIcon(userProfile.role)}</span>
                      {userProfile.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* User Stats */}
            <div className="p-4 border-b border-gray-100">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold text-gray-900">0</div>
                  <div className="text-xs text-gray-500">Posts Created</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900">
                    {userProfile.createdAt ? Math.floor((Date.now() - new Date(userProfile.createdAt).getTime()) / (1000 * 60 * 60 * 24)) : 0}
                  </div>
                  <div className="text-xs text-gray-500">Days Active</div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2">              <Link 
                href="/profile"
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                <User className="w-4 h-4" />
                View Profile
              </Link>
              <Link 
                href="/profile"
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </Link>              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                <Settings className="w-4 h-4" />
                Settings
              </button>
              <Link 
                href="/badges"
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                <Award className="w-4 h-4" />
                My Badges
              </Link>
                {/* Role-based Items */}
              {userProfile.role === 'admin' && (
                <>
                  <div className="border-t border-gray-100 my-2"></div>
                  <Link 
                    href="/admin"
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Shield className="w-4 h-4" />
                    Admin Dashboard
                  </Link>
                </>
              )}
              
              <div className="border-t border-gray-100 my-2"></div>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-100 bg-gray-50 rounded-b-lg">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                <span>
                  Joined {userProfile.createdAt ? new Date(userProfile.createdAt).toLocaleDateString() : 'Recently'}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Simple auth status component for smaller spaces
export function AuthStatus({ onSignIn }: { onSignIn: () => void }) {
  const { user, userProfile, loading } = useAuth();

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="w-20 h-8 bg-gray-200 rounded"></div>
      </div>
    );
  }
  if (!user) {
    return (
      <button
        onClick={onSignIn}
        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center gap-2 font-medium shadow-sm hover:shadow-md"
      >
        <User className="w-4 h-4" />
        Sign In
      </button>
    );
  }

  return <UserMenu />;
}
