'use client';

import { useState } from 'react';
import { usePosts } from '../hooks/usePosts';
import { useAuth } from '../hooks/useAuth';
import { PlusCircle, Edit, Trash2, Eye, Clock, User, Calendar } from 'lucide-react';

export default function PostsManager() {
  const { user, userProfile } = useAuth();
  const { posts, loading, error, createPost, updatePost, deletePost, fetchPosts } = usePosts({
    query: { published: false, limit: 10 } // Show drafts for content creators
  });
  
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    tags: '',
    published: false,
  });

  const canCreatePosts = userProfile?.role === 'admin' || userProfile?.role === 'content-creator';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const postData = {
      title: formData.title,
      content: formData.content,
      excerpt: formData.excerpt || undefined,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      published: formData.published,
    };

    let success = false;
    if (editingPost) {
      success = await updatePost({ ...postData, postId: editingPost });
    } else {
      success = await createPost(postData);
    }

    if (success) {
      setFormData({ title: '', content: '', excerpt: '', tags: '', published: false });
      setShowCreateForm(false);
      setEditingPost(null);
    }
  };

  const handleEdit = (post: any) => {
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      tags: post.tags.join(', '),
      published: post.published,
    });
    setEditingPost(post._id);
    setShowCreateForm(true);
  };

  const handleDelete = async (postId: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      await deletePost(postId);
    }
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to manage posts</h2>
          <p className="text-gray-600">You need to be signed in to view and manage posts.</p>
        </div>
      </div>
    );
  }

  if (!canCreatePosts) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">You need admin or content-creator permissions to manage posts.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Posts Manager</h1>
          {!showCreateForm && (
            <button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
              Create Post
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Create/Edit Form */}
      {showCreateForm && (
        <div className="mb-8 bg-white rounded-lg shadow-md p-6 border">
          <h2 className="text-xl font-semibold mb-4">
            {editingPost ? 'Edit Post' : 'Create New Post'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                rows={10}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Excerpt
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brief description of the post"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="javascript, tutorial, web development"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
                Publish immediately
              </label>
            </div>
            
            <div className="flex gap-3">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {editingPost ? 'Update Post' : 'Create Post'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCreateForm(false);
                  setEditingPost(null);
                  setFormData({ title: '', content: '', excerpt: '', tags: '', published: false });
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Posts List */}
      <div className="space-y-4">
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading posts...</p>
          </div>
        )}

        {posts.length === 0 && !loading && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-600">Create your first post to get started!</p>
          </div>
        )}

        {posts.map((post) => (
          <div key={post._id} className="bg-white rounded-lg shadow-md p-6 border">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(post)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  title="Edit post"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  title="Delete post"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {post.authorName}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime} min read
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {post.views} views
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                post.published 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {post.published ? 'Published' : 'Draft'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
