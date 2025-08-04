import React, { createContext, useContext, useState, useEffect } from 'react';
import { Client, Databases, ID } from 'appwrite';

export const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DB;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION;

const PostContext = createContext();
export const usePosts = () => useContext(PostContext);

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        setPosts(response.documents.reverse()); // newest first
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const addPost = async (newPost) => {
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        newPost
      );
      setPosts(prev => [response, ...prev]);
      return response;
    } catch (error) {
      console.error('Error adding post:', error);
      throw error;
    }
  };

  const deletePost = async (id) => {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
      setPosts(prev => prev.filter(post => post.$id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  };

  return (
    <PostContext.Provider value={{ posts, addPost, deletePost, loading, error }}>
      {children}
    </PostContext.Provider>
  );
}