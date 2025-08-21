// src/pages/Home.js
import React from 'react';
import PostBox from '../components/PostBox';
import PostList from '../components/PostList';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LightRays from '../components/LightRays';

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="absolute inset-0 w-full h-screen z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />

      <div className="absolute inset-0 z-10 flex items-start justify-center pt-10 px-4">
        <div className="max-w-xl w-full bg-white/10 backdrop-blur-xl rounded-2xl p-8 text-white shadow-2xl border border-white/20">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold tracking-wide">
              ✨ Welcome, {user.name}
            </h1>
            <button
              onClick={logout}
              className="px-4 py-1.5 rounded-lg text-sm font-medium text-blue-500 bg-blue-500/10 border border-blue-400/20 hover:bg-blue-500/20 hover:text-blue-100 transition-all"

            >
              Logout
            </button>
          </div>
          <PostBox />
          <PostList />
        </div>
      </div>
    </div>
  );
};

export default Home;
