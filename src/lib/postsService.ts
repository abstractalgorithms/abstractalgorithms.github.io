// Client-side service for posts API
export interface Post {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  tags: string[];
  published: boolean;
  series?: string;
  metadata?: Record<string, any>;
  authorId: string;
  authorName: string;
  authorEmail: string;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  likes: number;
  readTime: number;
}

export interface PostsResponse {
  success: boolean;
  posts?: Post[];
  post?: Post;
  pagination?: {
    total: number;
    limit: number;
    skip: number;
    hasMore: boolean;
  };
  error?: string;
}

export interface CreatePostData {
  title: string;
  content: string;
  excerpt?: string;
  tags?: string[];
  published?: boolean;
  series?: string;
  metadata?: Record<string, any>;
}

export interface UpdatePostData extends Partial<CreatePostData> {
  postId: string;
}

export interface PostsQuery {
  limit?: number;
  skip?: number;
  published?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  tags?: string[];
  author?: string;
  search?: string;
}

class PostsService {
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
    
    console.log('🌐 Making posts request to:', url);
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error(errorData.error || `Server request failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Get multiple posts with filtering and pagination
  async getPosts(query: PostsQuery = {}, authToken?: string): Promise<PostsResponse> {
    try {
      const params = new URLSearchParams();
      
      if (query.limit) params.append('limit', query.limit.toString());
      if (query.skip) params.append('skip', query.skip.toString());
      if (query.published !== undefined) params.append('published', query.published.toString());
      if (query.sortBy) params.append('sortBy', query.sortBy);
      if (query.sortOrder) params.append('sortOrder', query.sortOrder);
      if (query.tags && query.tags.length > 0) params.append('tags', query.tags.join(','));
      if (query.author) params.append('author', query.author);
      if (query.search) params.append('search', query.search);

      const headers: Record<string, string> = {};
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }

      const response = await this.makeRequest(`posts?${params.toString()}`, {
        method: 'GET',
        headers,
      });

      // Convert date strings back to Date objects
      if (response.posts) {
        response.posts = response.posts.map((post: any) => ({
          ...post,
          createdAt: new Date(post.createdAt),
          updatedAt: new Date(post.updatedAt),
        }));
      }

      return response;
    } catch (error) {
      console.error('Error fetching posts:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Get single post by ID
  async getPostById(postId: string, authToken?: string): Promise<PostsResponse> {
    try {
      const headers: Record<string, string> = {};
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }

      const response = await this.makeRequest(`posts?id=${postId}`, {
        method: 'GET',
        headers,
      });

      // Convert date strings back to Date objects
      if (response.post) {
        response.post = {
          ...response.post,
          createdAt: new Date(response.post.createdAt),
          updatedAt: new Date(response.post.updatedAt),
        };
      }

      return response;
    } catch (error) {
      console.error('Error fetching post by ID:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Get single post by slug
  async getPostBySlug(slug: string, authToken?: string): Promise<PostsResponse> {
    try {
      const headers: Record<string, string> = {};
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }

      const response = await this.makeRequest(`posts?slug=${slug}`, {
        method: 'GET',
        headers,
      });

      // Convert date strings back to Date objects
      if (response.post) {
        response.post = {
          ...response.post,
          createdAt: new Date(response.post.createdAt),
          updatedAt: new Date(response.post.updatedAt),
        };
      }

      return response;
    } catch (error) {
      console.error('Error fetching post by slug:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Create new post
  async createPost(postData: CreatePostData, authToken: string): Promise<PostsResponse> {
    try {
      const response = await this.makeRequest('posts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(postData),
      });

      // Convert date strings back to Date objects
      if (response.post) {
        response.post = {
          ...response.post,
          createdAt: new Date(response.post.createdAt),
          updatedAt: new Date(response.post.updatedAt),
        };
      }

      return response;
    } catch (error) {
      console.error('Error creating post:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Update existing post
  async updatePost(updateData: UpdatePostData, authToken: string): Promise<PostsResponse> {
    try {
      const response = await this.makeRequest('posts', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(updateData),
      });

      return response;
    } catch (error) {
      console.error('Error updating post:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Delete post
  async deletePost(postId: string, authToken: string): Promise<PostsResponse> {
    try {
      const response = await this.makeRequest(`posts?id=${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      return response;
    } catch (error) {
      console.error('Error deleting post:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Get posts by current user (requires authentication)
  async getMyPosts(query: PostsQuery = {}, authToken: string): Promise<PostsResponse> {
    // This will be filtered server-side by the authenticated user's ID
    return this.getPosts({ ...query, published: false }, authToken);
  }

  // Search posts
  async searchPosts(searchTerm: string, query: PostsQuery = {}): Promise<PostsResponse> {
    return this.getPosts({ ...query, search: searchTerm });
  }
}

// Export singleton instance
export const postsService = new PostsService();
export default postsService;
