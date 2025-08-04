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

      await addPost(newPost);
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
        className="w-full p-4 text-lg text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300 resize-none placeholder-gray-500"
        rows={4}
        placeholder="✨ What's on your mind? ✨"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {image && (
        <div className="relative mt-4">
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="rounded-lg object-cover h-48 w-full border border-gray-300 shadow"
          />
          <button
            onClick={() => setImage(null)}
            className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full hover:bg-black/80 transition"
          >
            ❌
          </button>
        </div>
      )}

      <div className="flex items-center justify-between mt-4">
        <label className="cursor-pointer text-sm text-indigo-600 hover:underline flex items-center space-x-2">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <span>📷 Upload Image</span>
        </label>

        <button
          onClick={handlePost}
          disabled={isUploading || (!text.trim() && !image)}
          className={`bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg transition-all duration-300 hover:scale-105 ${
            isUploading || (!text.trim() && !image)
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
