// Client-side service for server communication
// All Firebase operations go through the server

interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'admin' | 'content-creator' | 'user';
  bio?: string;
  website?: string;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
  disabled?: boolean;
}

class FirebaseClientService {
  private getServerUrl(): string {
    // Use NEXT_PUBLIC_SERVER_URL from environment, with fallback for development
    const envServerUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    
    if (envServerUrl) {
      // If env var contains full function path, use as-is, otherwise append base path
      return envServerUrl.includes('/.netlify/functions') 
        ? envServerUrl.replace('/.netlify/functions', '')
        : envServerUrl;
    }
    
    // Fallback for development if env var not set
    return process.env.NODE_ENV === 'development' 
      ? 'http://localhost:8889' 
      : 'https://abstractalgorithms-server.netlify.app';
  }
  private async makeRequest(path: string, options: RequestInit = {}) {
    const url = `${this.getServerUrl()}/.netlify/functions/${path}`;
    
    console.log('🌐 Making request to:', url);
    console.log('🔧 Environment:', process.env.NODE_ENV);
    console.log('🔗 Server URL:', this.getServerUrl());
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      console.error('❌ Server request failed:', response.status, response.statusText);
      throw new Error(`Server request failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Get user profile from server
  async getUserProfile(uid: string, authToken?: string): Promise<UserProfile | null> {
    try {
      const headers: Record<string, string> = {};
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }

      const response = await this.makeRequest(`firebase-auth?uid=${uid}`, {
        method: 'GET',
        headers,
      });

      if (response.success && response.user) {
        return {
          ...response.user,
          createdAt: new Date(response.user.createdAt),
          updatedAt: new Date(response.user.updatedAt),
        };
      }

      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  // Update user profile via server
  async updateUserProfile(uid: string, updateData: Partial<UserProfile>, authToken: string): Promise<boolean> {
    try {
      const response = await this.makeRequest('firebase-auth', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ 
          uid, 
          updateData: {
            ...updateData,
            updatedAt: new Date().toISOString(),
          }
        }),
      });

      return response.success;
    } catch (error) {
      console.error('Error updating user profile:', error);
      return false;
    }
  }

  // List all users (admin only)
  async listUsers(authToken: string): Promise<UserProfile[]> {
    try {
      const response = await this.makeRequest('firebase-auth?action=list_users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (response.success && response.users) {
        return response.users.map((user: any) => ({
          ...user,
          createdAt: new Date(user.createdAt),
          updatedAt: new Date(user.updatedAt),
        }));
      }

      return [];
    } catch (error) {
      console.error('Error listing users:', error);
      return [];
    }
  }

  // Update user role (admin only)
  async updateUserRole(uid: string, role: string, authToken: string): Promise<boolean> {
    try {
      const response = await this.makeRequest('firebase-auth', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ 
          uid, 
          role,
          updateData: {
            role,
            updatedAt: new Date().toISOString(),
          }
        }),
      });

      return response.success;
    } catch (error) {
      console.error('Error updating user role:', error);
      return false;
    }
  }

  // Create user profile (called after sign up)
  async createUserProfile(uid: string, profileData: Partial<UserProfile>, authToken: string): Promise<boolean> {
    try {
      const response = await this.makeRequest('firebase-auth', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          uid,
          ...profileData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      });

      return response.success;
    } catch (error) {
      console.error('Error creating user profile:', error);
      return false;
    }
  }

  // Delete user (admin only)
  async deleteUser(uid: string, authToken: string): Promise<boolean> {
    try {
      const response = await this.makeRequest(`firebase-auth?uid=${uid}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      return response.success;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  }
}

// Export singleton instance
export const firebaseClient = new FirebaseClientService();
export type { UserProfile };
