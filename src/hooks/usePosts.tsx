import { useState, useEffect, useCallback } from 'react';
import postsService, { Post, PostsResponse, CreatePostData, UpdatePostData, PostsQuery } from '../lib/postsService';
import { useAuth } from './useAuth';

export interface UsePostsOptions {
  autoFetch?: boolean;
  query?: PostsQuery;
}

export interface UsePostsResult {
  posts: Post[];
  loading: boolean;
  error: string | null;
  pagination: {
    total: number;
    limit: number;
    skip: number;
    hasMore: boolean;
  } | null;
  // Actions
  fetchPosts: (query?: PostsQuery) => Promise<void>;
  createPost: (postData: CreatePostData) => Promise<boolean>;
  updatePost: (updateData: UpdatePostData) => Promise<boolean>;
  deletePost: (postId: string) => Promise<boolean>;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
}

export function usePosts(options: UsePostsOptions = {}): UsePostsResult {
  const { autoFetch = true, query: defaultQuery = {} } = options;
  const { user } = useAuth();
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<{
    total: number;
    limit: number;
    skip: number;
    hasMore: boolean;
  } | null>(null);
  const [currentQuery, setCurrentQuery] = useState<PostsQuery>(defaultQuery);

  const fetchPosts = useCallback(async (query: PostsQuery = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const mergedQuery = { ...defaultQuery, ...query };
      setCurrentQuery(mergedQuery);
      
      const authToken = user ? await user.getIdToken() : undefined;
      const response = await postsService.getPosts(mergedQuery, authToken);
      
      if (response.success && response.posts) {
        if (query.skip && query.skip > 0) {
          // Load more - append to existing posts
          setPosts(prev => [...prev, ...response.posts!]);
        } else {
          // New query - replace posts
          setPosts(response.posts);
        }
        setPagination(response.pagination || null);
      } else {
        setError(response.error || 'Failed to fetch posts');
        setPosts([]);
        setPagination(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setPosts([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  }, [user, defaultQuery]);

  const createPost = useCallback(async (postData: CreatePostData): Promise<boolean> => {
    if (!user) {
      setError('Authentication required to create posts');
      return false;
    }

    try {
      setError(null);
      const authToken = await user.getIdToken();
      const response = await postsService.createPost(postData, authToken);
      
      if (response.success) {
        // Refresh the posts list to include the new post
        await fetchPosts(currentQuery);
        return true;
      } else {
        setError(response.error || 'Failed to create post');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      return false;
    }
  }, [user, fetchPosts, currentQuery]);

  const updatePost = useCallback(async (updateData: UpdatePostData): Promise<boolean> => {
    if (!user) {
      setError('Authentication required to update posts');
      return false;
    }

    try {
      setError(null);
      const authToken = await user.getIdToken();
      const response = await postsService.updatePost(updateData, authToken);
      
      if (response.success) {
        // Update the post in the local state
        setPosts(prev => prev.map(post => 
          post._id === updateData.postId 
            ? { ...post, ...updateData, updatedAt: new Date() }
            : post
        ));
        return true;
      } else {
        setError(response.error || 'Failed to update post');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      return false;
    }
  }, [user]);

  const deletePost = useCallback(async (postId: string): Promise<boolean> => {
    if (!user) {
      setError('Authentication required to delete posts');
      return false;
    }

    try {
      setError(null);
      const authToken = await user.getIdToken();
      const response = await postsService.deletePost(postId, authToken);
      
      if (response.success) {
        // Remove the post from local state
        setPosts(prev => prev.filter(post => post._id !== postId));
        // Update pagination
        setPagination(prev => prev ? { ...prev, total: prev.total - 1 } : null);
        return true;
      } else {
        setError(response.error || 'Failed to delete post');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      return false;
    }
  }, [user]);

  const loadMore = useCallback(async () => {
    if (!pagination?.hasMore || loading) return;
    
    const nextSkip = pagination.skip + pagination.limit;
    await fetchPosts({ ...currentQuery, skip: nextSkip });
  }, [pagination, loading, fetchPosts, currentQuery]);

  const refresh = useCallback(async () => {
    await fetchPosts({ ...currentQuery, skip: 0 });
  }, [fetchPosts, currentQuery]);

  // Auto-fetch on mount
  useEffect(() => {
    if (autoFetch) {
      fetchPosts(defaultQuery);
    }
  }, [autoFetch]); // Only run on mount, not when fetchPosts changes

  return {
    posts,
    loading,
    error,
    pagination,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    loadMore,
    refresh,
  };
}

// Hook for a single post
export interface UseSinglePostResult {
  post: Post | null;
  loading: boolean;
  error: string | null;
  fetchPost: () => Promise<void>;
  updatePost: (updateData: Partial<CreatePostData>) => Promise<boolean>;
  deletePost: () => Promise<boolean>;
}

export function usePost(postId?: string, slug?: string): UseSinglePostResult {
  const { user } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = useCallback(async () => {
    if (!postId && !slug) return;

    try {
      setLoading(true);
      setError(null);
      
      const authToken = user ? await user.getIdToken() : undefined;
      let response: PostsResponse;
      
      if (postId) {
        response = await postsService.getPostById(postId, authToken);
      } else {
        response = await postsService.getPostBySlug(slug!, authToken);
      }
      
      if (response.success && response.post) {
        setPost(response.post);
      } else {
        setError(response.error || 'Post not found');
        setPost(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setPost(null);
    } finally {
      setLoading(false);
    }
  }, [postId, slug, user]);

  const updatePost = useCallback(async (updateData: Partial<CreatePostData>): Promise<boolean> => {
    if (!user || !post) {
      setError('Authentication required or post not loaded');
      return false;
    }

    try {
      setError(null);
      const authToken = await user.getIdToken();
      const response = await postsService.updatePost(
        { ...updateData, postId: post._id },
        authToken
      );
      
      if (response.success) {
        setPost(prev => prev ? { ...prev, ...updateData, updatedAt: new Date() } : null);
        return true;
      } else {
        setError(response.error || 'Failed to update post');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      return false;
    }
  }, [user, post]);

  const deletePost = useCallback(async (): Promise<boolean> => {
    if (!user || !post) {
      setError('Authentication required or post not loaded');
      return false;
    }

    try {
      setError(null);
      const authToken = await user.getIdToken();
      const response = await postsService.deletePost(post._id, authToken);
      
      if (response.success) {
        setPost(null);
        return true;
      } else {
        setError(response.error || 'Failed to delete post');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      return false;
    }
  }, [user, post]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return {
    post,
    loading,
    error,
    fetchPost,
    updatePost,
    deletePost,
  };
}
