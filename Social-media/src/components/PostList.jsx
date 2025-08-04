import React from 'react';
import { useAuth } from '../context/AuthContext';
import { usePosts } from '../context/PostContext';
import { Storage } from 'appwrite';
import { client } from '../config/Appwite';
import Post from './Post';

const storage = new Storage(client);
const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET;

const PostList = () => {
  const { user } = useAuth();
  const { posts, deletePost } = usePosts();

  const handleDelete = async (id, username) => {
    if (user.name === username) {
      try {
        const postToDelete = posts.find((post) => post.$id === id);
        if (postToDelete?.imageId) {
          await storage.deleteFile(BUCKET_ID, postToDelete.imageId);
        }
        await deletePost(id);
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  return (
    <div className="space-y-6 max-h-[500px] overflow-y-auto px-2 scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-transparent">
      {posts.map((post, index) => (
        <Post post={post} key={post.$id} index={index}/>
      ))}
    </div>
  );
};

export default PostList;
