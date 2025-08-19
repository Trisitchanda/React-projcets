import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { Storage } from 'appwrite';
import { client } from '../config/Appwite';
import { usePosts } from '../context/PostContext';

const storage = new Storage(client);
const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET;



const Post = ({ post, index }) => {
    const { user } = useAuth();
    const [imageUrl, setImageUrl] = useState('')
    const { posts, deletePost } = usePosts();

    const handleDelete = async (id) => {
            try {
                const postToDelete = posts.find((post) => post.$id === id);
                if (postToDelete?.imageId) {
                    await storage.deleteFile(BUCKET_ID, postToDelete.imageId);
                }
                await deletePost(id);
            } catch (error) {
                console.error('Error deleting post:', error);
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
            className="p-6 bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col gap-4 animate-fadeIn"
            style={{ animationDelay: `${index * 0.05}s` }}
        >
            <div className="text-indigo-700 font-semibold text-lg">
                @{post.email.slice(0, 5)}
            </div>

            <div className="text-gray-800 text-base leading-relaxed tracking-wide">
                {post.content}
            </div>

            {post.imageId && imageUrl && (
                <div className="rounded-xl overflow-hidden border border-gray-300 shadow-sm">
                    <img
                        src={imageUrl}
                        alt={`Post by ${post.email}`}
                        className="w-full h-auto object-cover"
                    />
                </div>
            )}

            {(post.userId === user.$id || user.$id === import.meta.env.VITE_ADMIN_USER_ID) && (
                <div className="flex justify-end">
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
