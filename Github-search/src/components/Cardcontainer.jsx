import React from 'react';
import Cards from './Cards';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const Cardcontainer = () => {
  const [searchTerm, SetsearchTerm] = useState('')
  const [users, SetUsers] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm.trim() == "") {
      SetUsers([])
      return;
    }
    const timer = setTimeout(() => {
      fetch(`https://api.github.com/search/users?q=${searchTerm}`)
        .then((res) => res.json())
        .then((data) => SetUsers(data.items || []))
        .catch(() => SetUsers([]))
    }, 900);
    return () => clearInterval(timer)
  }, [searchTerm]);

  const handleCardClick = (username) => {
    navigate(`/profile/${username}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search GitHub users..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => SetsearchTerm(e.target.value)}
        />
      </div>

      {searchTerm.trim() === "" ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-xl">Start typing to search for users</p>
        </div>
      ) : users.length > 0 ? (
        <div className="flex flex-wrap -mx-3">
          {users.map((user, index) => (
            <Cards
              key={index}
              name={user.login}
              avatar={user.avatar_url}
              onClick={() => handleCardClick(user.login)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-xl">No matching users found</p>
        </div>
      )}
    </div>
  );

};

export default Cardcontainer;