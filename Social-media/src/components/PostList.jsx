import React from 'react';
import { useAuth } from '../context/AuthContext';
import { usePosts } from '../context/PostContext';

const PostList = () => {
  const { user } = useAuth();
  const { posts, deletePost } = usePosts();

  const handleDelete = (id, username) => {
    if (user.username === username) {
      deletePost(id, username);
    }
  };

  return (
    <div className="space-y-4 max-h-[500px] overflow-y-auto px-1 scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-transparent custom-scrollbar">
      {posts.map((post, index) => (
        <div
          key={post.id}
          className="group p-6 bg-white/60 dark:bg-gray-800/50 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-xl hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-300 flex justify-between items-start gap-4 animate-fadeIn"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <div className="flex-1">
            <div className="text-indigo-700 dark:text-indigo-300 font-semibold text-lg mb-1 hover:underline cursor-pointer transition-all">
              @{post.username}
            </div>
            <div className="text-gray-700 dark:text-gray-100 text-base leading-relaxed tracking-wide">
              {post.content}
            </div>
          </div>
  
          {post.username === user.username && (
            <button
              onClick={() => handleDelete(post.id, post.username)}
              className="text-sm text-red-500 hover:text-white hover:bg-red-500 dark:hover:bg-red-600 transition-colors font-semibold px-4 py-1.5 rounded-full border border-red-300 dark:border-red-500"
              title="Delete your post"
            >
              ❌ Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
  
  
};

export default PostList;
