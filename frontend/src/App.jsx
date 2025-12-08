
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "./App.css";
import Home from './home.js';
import Search from './Search.jsx';
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import Movie from "./movie.jsx";
import Groups from "./pages/Groups.jsx";
import Group from "./pages/Group.jsx";
import NewReleases from "./newReleases.jsx"

import SettingsPage from "./pages/SettingsPage.jsx"
import Register from "./pages/Register.jsx"

import AbsoluteNavBar from "./components/AbsoluteNavBar.js";


function App() {
  
  return (
    <div>
    <Router>
      <AbsoluteNavBar />

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/newReleases" element={<NewReleases />} />
        <Route path="/movie/:id" element={<Movie />} />

        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/register" element={<Register />} />

        <Route path="/groups" element={<Groups />} />
        <Route path="/group/:id" element={<Group />} />
      </Routes>

    </Router>
  </div>
  );
}

export default App;
