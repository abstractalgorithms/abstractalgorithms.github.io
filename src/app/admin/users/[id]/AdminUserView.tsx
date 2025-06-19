'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { firebaseClient, UserProfile } from '../../../../lib/firebaseClient';
import { useAuth } from '../../../../hooks/useAuth';
import AdminLayout from '../../../../components/AdminLayout';
import { 
  User, 
  Mail, 
  Globe,
  MapPin,
  Calendar,
  Shield,
  Edit3,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function AdminUserView() {
  const params = useParams();
  const router = useRouter();
  const { user, userProfile: currentUserProfile, loading: authLoading } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = params.id as string;

  useEffect(() => {
    if (!authLoading && (!currentUserProfile || currentUserProfile.role !== 'admin')) {
      router.push('/');
      return;
    }

    if (userId && currentUserProfile?.role === 'admin') {
      loadUserProfile();
    }
  }, [userId, currentUserProfile, authLoading]);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!user) {
        setError('Not authenticated');
        return;
      }

      const authToken = await user.getIdToken();
      const profileData = await firebaseClient.getUserProfile(userId, authToken);
      
      if (!profileData) {
        setError('User not found');
        return;
      }

      setUserProfile(profileData);
    } catch (error) {
      console.error('Error loading user profile:', error);
      setError('Failed to load user profile');
    } finally {
      setLoading(false);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800 border-red-200';
      case 'content-creator': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'user': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (authLoading || loading) {    return (
      <AdminLayout title="Loading User">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading user profile...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }
  if (error) {
    return (
      <AdminLayout title="Error">
        <div className="max-w-2xl mx-auto">
          <Link 
            href="/admin"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Admin Dashboard
          </Link>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-red-600 text-lg font-medium mb-2">Error</div>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!userProfile) {
    return (
      <AdminLayout title="User Not Found">
        <div className="max-w-2xl mx-auto">
          <Link 
            href="/admin"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Admin Dashboard
          </Link>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
            <p className="text-gray-600">User not found</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={`User: ${userProfile.displayName || userProfile.email}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link 
              href="/admin"
              className="inline-flex items-center text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Admin Dashboard
            </Link>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRoleColor(userProfile.role)}`}>
              <Shield className="w-4 h-4 inline mr-1" />
              {userProfile.role}
            </span>
            {userProfile.disabled && (
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 border border-red-200">
                Disabled
              </span>
            )}
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {userProfile.displayName || 'No display name'}
                  </h1>
                  <p className="text-gray-600">{userProfile.email}</p>
                </div>
              </div>
              
              <Link
                href={`/admin/users/${userProfile.uid}/edit`}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit User
              </Link>
            </div>
          </div>

          {/* Profile Information */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Email</div>
                    <div className="text-sm text-gray-600">{userProfile.email}</div>
                  </div>
                </div>

                {userProfile.website && (
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Website</div>
                      <a 
                        href={userProfile.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        {userProfile.website}
                      </a>
                    </div>
                  </div>
                )}

                {userProfile.location && (
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Location</div>
                      <div className="text-sm text-gray-600">{userProfile.location}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Account Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Account Details</h3>
                
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Created</div>
                    <div className="text-sm text-gray-600">
                      {formatDate(userProfile.createdAt)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Last Updated</div>
                    <div className="text-sm text-gray-600">
                      {formatDate(userProfile.updatedAt)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">User ID</div>
                    <div className="text-sm text-gray-600 font-mono">{userProfile.uid}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            {userProfile.bio && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Bio</h3>
                <p className="text-gray-700 leading-relaxed">{userProfile.bio}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
