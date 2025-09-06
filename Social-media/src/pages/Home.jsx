import React, { useRef, useState } from 'react';
import PostBox from '../components/PostBox';
import PostList from '../components/PostList';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LightRays from '../components/LightRays';
import GradientText from '../components/GradientText';
import Profile from '../components/Profile';

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const timelineRef = useRef(null);
  const [showProfile, setShowProfile] = useState(false); // 🔑 state for modal

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
      <div className="absolute mt-2.5 inset-0 z-10 flex justify-center px-2 sm:px-4">
        <div className="flex gap-4 w-full max-w-7xl">

          {/* Left Sidebar */}
          <div className="hidden md:flex w-1/5 flex-col justify-between 
                bg-white/10 backdrop-blur-xl rounded-2xl p-4 
                border border-white/20 shadow-xl h-screen sticky top-0">

            {/* Top Menu */}
            <div>
              <h2 className="text-xl font-bold mb-4">Menu</h2>
              <nav className="flex flex-col gap-3 w-full">
                <button
                  onClick={scrollToTop}
                  className="text-left px-3 py-2 rounded-lg hover:bg-white/10 transition"
                >
                  🏠 Home
                </button>
              </nav>
            </div>

            {/* Bottom Avatar  */}
            <div
              onClick={() => setShowProfile(true)}
              className="mt-auto flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-white/10 cursor-pointer transition"
            >
              {/* Avatar  */}
              <div className="w-12 h-12 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </div>

              {/* User info */}
              <div className="flex flex-col overflow-hidden">
                <span className="font-medium text-black truncate">{user.name}</span>
                <span className="text-sm text-black/60 truncate">
                  @{user.username || user.name || "user"}
                </span>
              </div>
            </div>
          </div>

          {/* Center Timeline */}
          <div
            ref={timelineRef}
            className="flex-1 h-screen overflow-y-auto 
                       bg-white/10 backdrop-blur-xl rounded-2xl 
                       border border-white/20 shadow-2xl 
                       custom-scrollbar"
          >
            {/* Header */}
            <div className="sticky top-0 z-20 bg-transparent backdrop-blur-lg py-4 px-4 sm:px-6 border-b border-white/20 flex justify-between items-center">
              <div className="text-xl sm:text-2xl font-semibold tracking-wide">
                <GradientText
                  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                  animationSpeed={8}
                  showBorder={false}
                >
                  ✨ Welcome, {user.name}
                </GradientText>
              </div>

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
        </div>
      </div>

      {/* Bottom nav for mobile */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-white/10 backdrop-blur-lg border-t border-white/20 flex justify-around py-2 z-50">
        <button onClick={scrollToTop} className="p-2">🏠</button>
      </div>

      {/*  Profile Modal */}
      {showProfile && (
        <Profile
          user={user}
          updateProfile={(data) => {
            console.log("Update profile with:", data);
            setShowProfile(false);
          }}
          closeModal={() => setShowProfile(false)}
        />
      )}
    </div>
  );
};

export default Home;
