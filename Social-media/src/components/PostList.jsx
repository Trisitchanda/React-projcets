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
    <div className="space-y-4 max-h-[500px] overflow-y-auto">
      {posts.map((post) => (
        <div key={post.id} className="p-4 border rounded shadow bg-white flex justify-between items-start">
          <div>
            <div className="font-semibold">{post.username}</div>
            <div>{post.content}</div>
          </div>
          {post.username === user.username && (
            <button
              onClick={() => handleDelete(post.id, post.username)}
              className="text-red-500 ml-4"
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;
