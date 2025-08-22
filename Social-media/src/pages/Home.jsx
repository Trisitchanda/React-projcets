// src/pages/Home.js
import React, { useRef } from 'react';
import PostBox from '../components/PostBox';
import PostList from '../components/PostList';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LightRays from '../components/LightRays';

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const timelineRef = useRef(null);

  const scrollToTop = () => {
    if (timelineRef.current) {
      timelineRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="absolute ubuntu-light inset-0 w-full h-screen z-0 overflow-hidden">
      <LightRays
        raysOrigin="top-center"
        raysColor="#00ffff"
        raysSpeed={1}
        lightSpread={1.6}
        rayLength={3}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0.01}
        distortion={0.05}
        className="custom-rays"
      />

      {/* Main layout */}
      <div className="absolute mt-2.5  inset-0 z-10 flex justify-center px-2 sm:px-4">
        <div className="flex gap-4 w-full max-w-7xl">

          {/* Left Sidebar */}
          <div className="hidden md:flex w-1/5 flex-col items-start gap-6 
                          bg-white/10 backdrop-blur-xl rounded-2xl p-4 
                          border border-white/20 shadow-xl h-screen sticky top-0">
            <h2 className="text-xl font-bold">Menu</h2>
            <nav className="flex flex-col gap-3 w-full">
              <button 
                onClick={scrollToTop}
                className="text-left  px-3 py-2 rounded-lg hover:bg-white/10 transition"
              >
                🏠 Home
              </button>
              {/* <button className="text-left px-3 py-2 rounded-lg hover:bg-white/10 transition">🔔 Notifications</button>
              <button className="text-left px-3 py-2 rounded-lg hover:bg-white/10 transition">✉️ Messages</button>
              <button className="text-left px-3 py-2 rounded-lg hover:bg-white/10 transition">⚙️ Settings</button> */}
            </nav>
          </div>

          {/* Center Timeline */}
          <div
            ref={timelineRef}
            className="flex-1 h-screen overflow-y-auto 
                       bg-white/10 backdrop-blur-xl rounded-2xl 
                       border border-white/20 shadow-2xl 
                       custom-scrollbar"
          >
            {/* Header  */}
            <div className="sticky top-0 z-20 bg-white/10 backdrop-blur-lg py-4 px-4 sm:px-6 border-b border-white/20 flex justify-between items-center">
              <h1 className=" text-xl sm:text-2xl font-semibold tracking-wide text-white">
                ✨ Welcome, {user.name}
              </h1>
              <button
                onClick={logout}
                className="px-4 py-1.5 rounded-lg text-sm font-medium text-blue-500 
                           bg-blue-500/10 border border-blue-400/20 
                           hover:bg-blue-500/20 hover:text-blue-100 transition-all"
              >
                Logout
              </button>
            </div>

            <div className="px-4 mt-5 sm:px-6 pb-20">
              <PostBox />
              <PostList />
            </div>
          </div>

          {/* Right Sidebar */}
          {/* <div className="hidden lg:flex w-1/4 flex-col gap-6 
                          bg-white/10 backdrop-blur-xl rounded-2xl p-4 
                          border border-white/20 shadow-xl h-screen sticky top-0">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-3 py-2 rounded-lg bg-white/20 backdrop-blur-sm 
                         border border-white/30 placeholder-white/70 text-white 
                         focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div> */}
        </div>
      </div>

      {/* Bottom nav for mobile */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-white/10 backdrop-blur-lg border-t border-white/20 flex justify-around py-2 z-50">
        <button onClick={scrollToTop} className="p-2">🏠</button>
      </div>
    </div>

  );
};

export default Home;
