import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Storage } from "appwrite";
import { client } from "../config/Appwite";
import { usePosts } from "../context/PostContext";
import { Databases } from "appwrite";
import ConfirmModal from "./ConfirmModal ";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaHeart, FaRegHeart } from "react-icons/fa";


const storage = new Storage(client);
const databases = new Databases(client);

const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DB;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION;

const Post = ({ post, index }) => {
  const { user } = useAuth();
  const { posts, deletePost } = usePosts();
  const [imageUrl, setImageUrl] = useState("");
  const [liked, setLiked] = useState(post.likes?.includes(user.$id));
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0);
  const [postToDelete, setPostToDelete] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // Fetch post image if available
  useEffect(() => {
    (async () => {
      if (post.imageId) {
        const result = await storage.getFileView(BUCKET_ID, post.imageId);
        setImageUrl(result);
      }
    })();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDeleteClick = (id) => {
    setPostToDelete(id);
    setShowConfirm(true);
    setShowMenu(false);
  };

  // Delete post
  const handleDelete = async (id) => {
    try {
      const postToDelete = posts.find((p) => p.$id === id);

      if (postToDelete?.imageId) {
        await storage.deleteFile(BUCKET_ID, postToDelete.imageId);
      }

      if (postToDelete.userId === user.$id || user.$id === import.meta.env.VITE_ADMIN_USER_ID) {
        await deletePost(id, user.$id);
        setShowConfirm(false);
        setPostToDelete(null);
      } else {
        alert("You don't have permission to delete this post.");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Toggle like/unlike
  const handleLikeToggle = async () => {
    try {
      let updatedLikes = liked
        ? post.likes.filter((id) => id !== user.$id)
        : [...(post.likes || []), user.$id];

      const updatedPost = await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        post.$id,
        { likes: updatedLikes }
      );

      setLiked(!liked);
      setLikeCount(updatedPost.likes.length);
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  // Save edited post
  const handleEditSave = async () => {
    try {
      const updatedPost = await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        post.$id,
        { content: editedContent }
      );

      post.content = updatedPost.content;
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating post:", err);
      alert("Failed to update post");
    }
  };

  return (
    <div
      key={post.$id}
      className="p-6 bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col gap-4 animate-fadeIn"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* User info */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold">
          {post.username?.charAt(0).toUpperCase()}
        </div>
        <div className="text-indigo-700 font-semibold text-lg">@{post.username}</div>
      </div>

      {/* Post content */}
      <div className="text-gray-800 text-base leading-relaxed tracking-wide">
        {isEditing ? (
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={3}
          />
        ) : (
          post.content
        )}
      </div>

      {/* Post image */}
      {post.imageId && imageUrl && (
        <div
          className="rounded-xl overflow-hidden border border-gray-300 shadow-sm w-full flex justify-center items-center"
          style={{ maxHeight: "550px", minHeight: "100px" }}
        >
          <img
            src={imageUrl}
            alt={`Post by ${post.username}`}
            className="w-full max-h-[600px] object-cover rounded-xl"
          />
        </div>
      )}

      {/* Like + actions */}
      <div className="flex items-center gap-3 mt-2">
        <button
          onClick={handleLikeToggle}
          className={`text-3xl transition-transform transform active:scale-125 ${liked ? "text-red-500" : "text-gray-400 hover:text-red-500 hover:scale-110"
            }`}
        >
          {liked ? (
            <FaHeart className="cursor-pointer text-red-500 text-2xl hover:scale-110 transition-transform" />
          ) : (
            <FaRegHeart className="cursor-pointer text-gray-400 text-2xl hover:text-red-500 hover:scale-110 transition-transform" />
          )}
        </button>
        <span className="text-gray-600 text-sm font-medium">
          {likeCount} {likeCount === 1 ? "like" : "likes"}
        </span>
      </div>

      {/* Edit & Delete buttons (owner or admin) */}
      {(post.userId === user.$id || user.$id === import.meta.env.VITE_ADMIN_USER_ID) && (
        <div className="absolute top-4 right-4" ref={menuRef}>
          <button 
            onClick={() => setShowMenu((prev) => !prev)}
            className="cursor-pointer p-2 rounded-full hover:bg-gray-100 transition"
          >
            <HiOutlineDotsHorizontal size={20} />
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className=" absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-xl border border-gray-100 z-50 overflow-hidden backdrop-blur-sm bg-white/95">
              <button 
                onClick={() => {
                  setIsEditing(true);
                  setShowMenu(false);
                }}
                className="block cursor-pointer w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-all duration-200 flex items-center gap-2 border-b border-gray-100"
              >
                <span className="text-blue-500 ">✏️</span>
                <span className="font-medium">Edit Post</span>
              </button>
              <button 
                onClick={() => handleDeleteClick(post.$id)}
                className="cursor-pointer block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-all duration-200 flex items-center gap-2"
              >
                <span className="text-red-500 font-bold ">🗑️</span>
                <span className="font-medium">Delete Post</span>
              </button>
            </div>
          )}
        </div>
      )}

      {isEditing && (
        <div className="flex justify-end mt-4 gap-3 backdrop-blur-sm bg-white/30 p-2 rounded-xl">
          <button
            onClick={() => setIsEditing(false)}
            className=" cursor-pointer px-4 py-2 rounded-xl bg-white/80 text-gray-700 hover:bg-white transition-all duration-200 border border-white/30 font-medium shadow-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleEditSave}
            className="cursor-pointer px-4 py-2 rounded-xl bg-blue-500/90 text-white hover:bg-blue-600 transition-all duration-200 font-medium shadow-md backdrop-blur-sm"
          >
            Save Changes
          </button>
        </div>
      )}

      <ConfirmModal
        isOpen={showConfirm}
        title="Delete Post?"
        message="Are you sure you want to delete this post? This action cannot be undone."
        onConfirm={() => handleDelete(postToDelete)}
        onCancel={() => {
          setShowConfirm(false);
          setPostToDelete(null);
        }}
      />
    </div>

  );
};

export default Post;
