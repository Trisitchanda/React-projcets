import React from 'react';
import { usePosts } from '../context/PostContext';
import Post from './Post';

const PostList = () => {
  const { posts } = usePosts();

  return (
    <div className="space-y-6 px-2">
      {posts.map((post, index) => (
        <Post post={post} key={post.$id} index={index}/>
      ))}
    </div>
  );
};

export default PostList;
