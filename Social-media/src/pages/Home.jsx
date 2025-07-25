// src/pages/Home.js
import React from 'react';
import PostBox from '../components/PostBox';
import PostList from '../components/PostList';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Welcome, {user.username}</h1>
        <button onClick={logout} className="text-red-500">Logout</button>
      </div>
      <PostBox />
      <PostList />
    </div>
  );
};

export default Home;
