
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "./App.css";
import Home from './home.js';
import Search from './Search.jsx';
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import Movie from "./movie.jsx";
import Groups from "./pages/Groups.jsx";
import NewReleases from "./newReleases.jsx"
import AbsoluteNavBar from "./components/AbsoluteNavBar.js";
import CreateGroup from "./pages/CreateGroup.jsx";
import JoinGroup from "./pages/JoinGroup.jsx"

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
        <Route path="/groups" element={<Groups />} />
        <Route path="/creategroup" element={<CreateGroup />} />
        <Route path="/joingroup" element={<JoinGroup />} />

      </Routes>

    </Router>
  </div>
  );
}

export default App;
