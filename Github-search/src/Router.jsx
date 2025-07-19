import React from 'react'
import Cardcontainer from './components/Cardcontainer'
import Profile from './components/Profile'
import { Routes, Route } from "react-router-dom";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Cardcontainer />} />
            <Route path="/profile/:username" element={<Profile />} />
        </Routes>
    )
}

export default Router
