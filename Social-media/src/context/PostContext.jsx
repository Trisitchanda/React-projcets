import React, { createContext, useContext, useState, useEffect } from 'react';
import { Databases, ID,Permission,Role } from 'appwrite';
import { useAuth } from './AuthContext';
import {client} from "../config/Appwite"



// export const client = new Client()
//   .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
//   .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

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

    //to see new posts without refresing
    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`,
      (response) => {
        // console.log("Realtime event:", response);
  
        if (response.events.includes(`databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents.*.create`)) {
          setPosts(prev => [response.payload, ...prev]);
        }
  
        if (response.events.includes(`databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents.*.delete`)) {
          setPosts(prev => prev.filter(p => p.$id !== response.payload.$id));
        }
  
        if (response.events.includes(`databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents.*.update`)) {
          setPosts(prev =>
            prev.map(p => (p.$id === response.payload.$id ? response.payload : p))
          );
        }
      }
    );

    return () => {
        unsubscribe();
    };
  }, []);


  const addPost = async (newPost,user) => {
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        newPost,
        [
          Permission.read(Role.any()),             
          Permission.write(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
  
        ]
      );
      // setPosts(prev => [response, ...prev]);
      // console.log("Created doc with permissions:", response.$permissions);
      
      return response;
    } catch (error) {
      console.error('Error adding post:', error);
      throw error;
    }
  };

  const deletePost = async (id) => {
    try {
      if (currentUser.$id === import.meta.env.VITE_ADMIN_USER_ID) {
        await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
      } else {
        // Normal user can only delete their own (Appwrite enforces this)
        await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
      }
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