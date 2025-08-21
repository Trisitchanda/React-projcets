import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { Storage } from 'appwrite';
import { client } from '../config/Appwite';
import { usePosts } from '../context/PostContext';
import { Databases } from 'appwrite';

const storage = new Storage(client);
const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET;
const databases = new Databases(client);

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DB;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION;



const Post = ({ post, index }) => {
    const { user } = useAuth();
    const [imageUrl, setImageUrl] = useState('')
    const { posts, deletePost } = usePosts();
    const [liked, setLiked] = useState(post.likes?.includes(user.$id));
    const [likeCount, setLikeCount] = useState(post.likes?.length || 0);

    const handleDelete = async (id) => {
        try {
            const postToDelete = posts.find((post) => post.$id === id);

            if (postToDelete?.imageId) {
                await storage.deleteFile(BUCKET_ID, postToDelete.imageId);
            }

            if (postToDelete.userId === user.$id || user.$id === import.meta.env.VITE_ADMIN_USER_ID) {
                await deletePost(id, user.$id);
            } else {
                alert("You don't have permission to delete this post.");
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const handleLikeToggle = async () => {
        try {
            let updatedLikes;

            if (liked) {
                // Unlike → remove user id
                updatedLikes = post.likes.filter((id) => id !== user.$id);
            } else {
                // Like → add user id
                updatedLikes = [...(post.likes || []), user.$id];
            }

            // Update post document in Appwrite
            const updatedPost = await databases.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                post.$id,
                { likes: updatedLikes }
            );

            // Update local state immediately
            setLiked(!liked);
            setLikeCount(updatedPost.likes.length);
        } catch (err) {
            console.error("Error toggling like:", err);
        }
    };

    useEffect(() => {
        (async () => {
            const result = await storage.getFileView(BUCKET_ID, post.imageId);
            setImageUrl(result);
        })();
    }, []);


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
                <div className="text-indigo-700 font-semibold text-lg">
                    @{post.username}
                </div>
            </div>

            {/* Post text */}
            <div className="text-gray-800 text-base leading-relaxed tracking-wide">
                {post.content}
            </div>

            {/* Post image */}
            {post.imageId && imageUrl && (
                <div className="rounded-xl overflow-hidden border border-gray-300 shadow-sm">
                    <img
                        src={imageUrl}
                        alt={`Post by ${post.email}`}
                        className="w-full h-auto object-cover"
                    />
                </div>
            )}

            {/* Like + actions */}
            <div className="flex items-center gap-3 mt-2">
                <button
                    onClick={handleLikeToggle}
                    className={`text-3xl transition-transform transform active:scale-125 ${liked
                            ? "text-red-500"
                            : "text-gray-400 hover:text-red-500 hover:scale-110"
                        }`}
                >
                    {liked ? "❤️" : "🤍"}
                </button>
                <span className="text-gray-600 text-sm font-medium">
                    {likeCount} {likeCount === 1 ? "like" : "likes"}
                </span>
            </div>

            {/* Delete button (only for owner or admin) */}
            {(post.userId === user.$id ||
                user.$id === import.meta.env.VITE_ADMIN_USER_ID) && (
                    <div className="flex justify-end mt-3">
                        <button
                            onClick={() => handleDelete(post.$id)}
                            className="text-sm text-red-600 hover:text-white hover:bg-red-600 font-medium px-4 py-1.5 rounded-full border border-red-300 transition"
                            title="Delete your post"
                        >
                            ❌ Delete
                        </button>
                    </div>
                )}
        </div>

    )
}

export default Post
