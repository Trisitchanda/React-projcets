import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Databases, ID, Permission, Query, Role } from 'appwrite';
import { useAuth } from './AuthContext';
import { client } from "../config/Appwite"

const databases = new Databases(client);

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DB;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION;




const PostContext = createContext();
export const usePosts = () => useContext(PostContext);

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, loading: authLoading } = useAuth();
  const subscribed = useRef(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (authLoading || !user) return;

    const fetchPosts = async () => {
      try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID,
          [
            Query.orderDesc("$createdAt"),
            Query.limit(25),
          ]
        );
        setPosts(response.documents);
        setHasMore(response.total > response.documents.length);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();

    let unsubscribe = null;

    if (!subscribed.current) {
      unsubscribe = client.subscribe(
        `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`,
        (response) => {
          if (response.events.includes(
            `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents.*.create`
          )) {
            setPosts(prev => [response.payload, ...prev]);
          }

          if (response.events.includes(
            `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents.*.delete`
          )) {
            setPosts(prev => prev.filter(p => p.$id !== response.payload.$id));
          }

          if (response.events.includes(
            `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents.*.update`
          )) {
            setPosts(prev =>
              prev.map(p => (p.$id === response.payload.$id ? response.payload : p))
            );
          }
        }
      );
      subscribed.current = true;
    }


    return () => {
      if (unsubscribe) unsubscribe();
      subscribed.current = false;
    };
  }, [authLoading, user]);

  const fetchMorePosts = async () => {
    try {
      if (posts.length === 0 ||  !hasMore) return;

      const lastPost = posts[posts.length - 1];

      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [
          Query.orderDesc("$createdAt"),
          Query.limit(25),
          Query.cursorAfter(lastPost.$id),
        ]
      );

      setPosts((prev) => {
        const updated = [...prev, ...response.documents];
      
        // check if more posts available
        if (updated.length >= response.total) {
          setHasMore(false);
        }
      
        return updated;
      });

    } catch (error) {
      console.error("Error loading more posts:", error);
      setError(error.message);
    }
  };



  const addPost = async (newPost, user) => {
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          ...newPost,
          userId: user.$id,
          username: user.name,

        },
        [
          Permission.read(Role.any()),
          Permission.write(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),

        ]
      );
      return response;
    } catch (error) {
      console.error('Error adding post:', error);
      throw error;
    }
  };

  const deletePost = async (id, userId) => {
    try {
      const postToDelete = posts.find((post) => post.$id === id);

      // Only allow if owner or admin
      if (postToDelete.userId === userId || userId === import.meta.env.VITE_ADMIN_USER_ID) {
        await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
        setPosts(prev => prev.filter(post => post.$id !== id));
      } else {
        throw new Error("Not authorized to delete this post.");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
    }
  };

  return (
    <PostContext.Provider value={{ posts, addPost, deletePost, loading, error, fetchMorePosts,hasMore }}>
      {children}
    </PostContext.Provider>
  );
}