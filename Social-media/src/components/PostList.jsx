import React from 'react';
import { usePosts } from '../context/PostContext';
import Post from './Post';
import GradientText from './GradientText'

const PostList = () => {
  const { posts, loading, fetchMorePosts, hasMore } = usePosts();

  return (
    <div className="space-y-6 px-2">
      {posts.map((post, index) => (
        <Post post={post} key={post.$id} index={index} />
      ))}

      {hasMore && (
        <div className="flex justify-center py-6">

          <button
            onClick={fetchMorePosts}
            className="px-6 py-2 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition"
            disabled={loading}
          >
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={8}
              className="text-transparent bg-clip-text"
            >
              {loading ? "Loading..." : "Load More"}
            </GradientText>
          </button>
        </div>
      )}

      {!hasMore && (
        <div className="flex justify-center py-6">
          <GradientText
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={6}
            className="text-transparent bg-clip-text text-lg"
          >
            🎉 You’re all caught up!
          </GradientText>
        </div>
      )}
    </div>
  );
};

export default PostList;
