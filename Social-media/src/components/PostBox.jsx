import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePosts } from '../context/PostContext';

const PostBox = () => {
  const { user } = useAuth();
  const { addPost } = usePosts();
  const [text, setText] = useState('');

  const handlePost = () => {
    if (text.trim()) {
      const newPost = {
        id: Date.now(),
        username: user.username,
        content: text,
      };
      addPost(newPost);
      setText('');
    }
  };

  return (
    <div className="mb-6 bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-md p-6 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
      <textarea
        className="w-full p-4 text-lg text-gray-800 dark:text-white bg-white/70 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300 resize-none placeholder-gray-500 dark:placeholder-gray-400"
        rows={4}
        placeholder="✨ What's on your mind? ✨"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex justify-end mt-4">
        <button
          onClick={handlePost}
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 text-white font-semibold px-6 py-2 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
        >
          🚀 Post
        </button>
      </div>
    </div>
  );
  
};

export default PostBox;
