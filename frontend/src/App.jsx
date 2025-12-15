import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import "./App.css";
import Search from "./Search.jsx";
import Home from './home.jsx';
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import Movie from "./movie.jsx";
import Groups from "./pages/Groups.jsx";
import Group from "./pages/Group.jsx";
import NewReleases from "./newReleases.jsx";
import Favourites from "./pages/Favourites.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import Register from "./pages/Register.jsx";
import Reviews from "./pages/Reviews.jsx";

import AbsoluteNavBar from "./components/AbsoluteNavBar.js";

function App() {
  return (
    <div>
      <Router>
        <AbsoluteNavBar />

        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/newReleases" element={<NewReleases />} />
          <Route path="/movie/:id" element={<Movie />} />

          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/register" element={<Register />} />

          <Route path="/reviews" element={<Reviews />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/group/:id" element={<Group />} />
          <Route path="/favourites/:id" element={<Favourites />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;