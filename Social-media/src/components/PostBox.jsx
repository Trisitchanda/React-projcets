import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePosts } from '../context/PostContext';
import { ID, Storage } from 'appwrite';
import { client } from '../config/Appwite';


const storage = new Storage(client);
const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET;

const PostBox = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { addPost } = usePosts();
  const { user } = useAuth();

  const handlePost = async () => {
    if (!text.trim() && !image) return;

    setIsUploading(true);

    try {
      let imageId = null;

      if (image) {
        const uploadedFile = await storage.createFile(
          BUCKET_ID,
          ID.unique(),
          image
        );
        imageId = uploadedFile.$id;
        console.log('Image uploaded:', imageId);
      }

      const newPost = {
        username: user.name,
        userId: user.$id,
        email: user.email,
        content: text,
        imageId,
      };

      await addPost(newPost, user);
      setText('');
      setImage(null);
    } catch (error) {
      console.error('Post upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size < 5 * 1024 * 1024) {
      setImage(file);
    } else if (file) {
      alert('Image size should be less than 5MB');
    }
  };

  if (!user) return null;

  return (
    <div className="mb-6 bg-white p-6 rounded-xl shadow-xl border border-gray-200">
      <textarea
        className="w-full p-4 text-lg focus:placeholder-transparent text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300 resize-none placeholder-gray-500"
        rows={4}
        placeholder="✨ What's on your mind? ✨"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {image && (
        <div className="relative mt-4 rounded-xl border border-gray-300 shadow overflow-hidden">
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="w-full max-h-[600px] object-cover rounded-xl"
          />
          <button
            onClick={() => setImage(null)}
            className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full hover:bg-black/80 transition"
          >
            ❌
          </button>
        </div>
      )}


      <div className="flex flex-col sm:flex-row items-center sm:justify-between mt-4 gap-3 sm:gap-0 w-full">
        {/* Upload Image Button */}
        <label className="cursor-pointer group relative flex items-center justify-center w-full sm:w-auto px-5 py-3 
    bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white font-medium text-sm shadow-lg 
    hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 transform hover:-translate-y-0.5">

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />

          {/* Icon + Text */}
          <span className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
              stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span>Upload Image</span>
          </span>

          {/* Glow effect on hover */}
          <span className="absolute inset-0 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 blur-lg transition duration-500"></span>
        </label>

        {/* Post Button */}
        <button
          onClick={handlePost}
          disabled={isUploading || (!text.trim() && !image)}
          className={`w-full sm:w-auto bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 ${isUploading || (!text.trim() && !image)
            ? 'opacity-50 cursor-not-allowed'
            : ''
            }`}
        >
          {isUploading ? '⏳ Posting...' : '🚀 Post'}
        </button>
      </div>

    </div>
  );
};

export default PostBox;
