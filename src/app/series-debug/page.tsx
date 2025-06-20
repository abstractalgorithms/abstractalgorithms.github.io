'use client';

import { useEffect, useState } from 'react';

export default function SeriesDebugPage() {
  const [postsData, setPostsData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const testSeriesNavigation = async () => {
      try {
        // Test the posts API
        const response = await fetch('/api/posts-data');
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setPostsData(data);
        console.log('Posts data loaded:', data);
      } catch (err) {
        setError(err.message);
        console.error('Error loading posts:', err);
      }
    };

    testSeriesNavigation();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Debug Error</h1>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!postsData) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Loading Posts Data...</h1>
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  // Filter system design posts
  const systemDesignPosts = postsData.filter(post => 
    post.slug.includes('system-design-interview')
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Series Navigation Debug</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">System Design Posts Found:</h2>
          <div className="space-y-4">
            {systemDesignPosts.map((post, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-sm text-gray-600">Slug: {post.slug}</p>
                {post.series && (
                  <div className="text-sm text-blue-600">
                    Series: {post.series.name} - Order: {post.series.order}/{post.series.total}
                    <br />
                    Prev: {post.series.prev || 'None'}
                    <br />
                    Next: {post.series.next || 'None'}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">All Posts Summary:</h2>
          <p>Total posts loaded: {postsData.length}</p>
          <p>System design posts: {systemDesignPosts.length}</p>
        </div>
      </div>
    </div>
  );
}
