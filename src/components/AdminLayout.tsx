'use client';

import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { 
  ArrowLeft, 
  Shield, 
  Home,
  Users,
  Settings,
  BarChart3
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export default function AdminLayout({ children, title, description }: AdminLayoutProps) {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();

  // Check admin access
  useEffect(() => {
    if (!loading && (!user || !userProfile || userProfile.role !== 'admin')) {
      router.push('/');
    }
  }, [user, userProfile, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user || !userProfile || userProfile.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Site</span>
              </Link>
              
              <div className="border-l border-gray-300 h-6"></div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-gray-900">Admin Panel</span>
              </div>
            </div>
              <div className="flex items-center gap-6">
              <Link
                href="/admin"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Users className="w-4 h-4" />
                <span>Users</span>
              </Link>
              
              <Link
                href="/admin/analytics"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Analytics</span>
              </Link>
              
              <Link
                href="/admin/settings"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Link>
              
              {/* Debug link - development only */}
              {process.env.NODE_ENV === 'development' && (
                <Link
                  href="/debug"
                  className="flex items-center gap-2 text-yellow-600 hover:text-yellow-700 transition-colors text-sm"
                  title="Debug Console (Dev Only)"
                >
                  🔧
                  <span>Debug</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
              {description && <p className="text-gray-600 mt-1">{description}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
}
