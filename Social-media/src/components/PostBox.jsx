import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePosts } from '../context/PostContext';

const PostBox = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
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

      {/* Image Preview */}
      {image && (
        <div className="relative mt-4">
          <img
            src={URL.createObjectURL(image)}
            alt="Selected"
            className="rounded-lg object-cover h-48 w-full border border-white/20 shadow-lg"
          />
          <button
            onClick={() => setImage(null)}
            className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full hover:bg-black/80 transition"
          >
            ❌
          </button>
        </div>
      )}

      {/* Upload + Post Button */}
      <div className="flex items-center justify-between mt-4">
        <label className="cursor-pointer text-sm text-indigo-600 hover:underline flex items-center space-x-2">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <span className="inline-flex items-center space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-indigo-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 16l4-4a3 3 0 014 0l4 4M13 10V3m0 0L9.5 6.5M13 3l3.5 3.5"
              />
            </svg>
            <span>Upload Image</span>
          </span>
        </label>

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
