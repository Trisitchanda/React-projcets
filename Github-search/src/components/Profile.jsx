import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const { username } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://api.github.com/users/${username}`)
            .then((res) => res.json())
            .then((data) => setProfile(data))
            .catch((err) => {
                console.error(err);
                setProfile(null);
            });
    }, [username]);

    if (!profile) {
        return <div className="text-center py-12">Loading profile...</div>;
    }
    return (
        <div className="max-w-md mx-auto my-50 text-center p-6 border rounded-lg shadow">
            <img
                src={profile.avatar_url}
                alt={profile.login}
                className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h2 className="text-2xl font-semibold mb-2">{profile.name}</h2>
            <p className="text-gray-600 mb-2">Followers: {profile.followers}</p>
            <p className="text-gray-600 mb-4">Following: {profile.following}</p>
            <a
                href={profile.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
            >
                View GitHub Profile
            </a>
            <br />
            <button
                onClick={() => navigate(-1)}
                className="mt-6 inline-block px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
                ← Back
            </button>
        </div>
    );
}

export default Profile