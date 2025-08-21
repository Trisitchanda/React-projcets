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



  return (
    <div className="space-y-6 max-h-[500px] overflow-y-auto px-2 custom-scrollbar">
      {posts.map((post, index) => (
        <Post post={post} key={post.$id} index={index}/>
      ))}
    </div>
  );
};

export default PostList;
