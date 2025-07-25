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
    <div className="mb-6 bg-white p-4 rounded shadow">
      <textarea
        className="w-full p-2 border rounded mb-2"
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={handlePost}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Post
      </button>
    </div>
  );
};

export default PostBox;
