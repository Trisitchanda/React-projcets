import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const { login } = useAuth()
    const [username, setUsername] = useState('')
    const navigate = useNavigate()

    const handleLogin = () => {
        if (username.trim()) {
            login(username);
            navigate('/');
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mb-4 px-4 py-2 border rounded"
            />
            <button
                onClick={handleLogin}
                className="bg-blue-500 text-white px-6 py-2 rounded"
            >
                Login
            </button>
        </div>
    );
}

export default Login;