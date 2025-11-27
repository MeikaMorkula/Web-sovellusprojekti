
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "./App.css";
import Home from './home.js';
import Search from './Search.jsx';
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";


function App() {
  
    useEffect(() => {
  }, []);
  
  return (
    <div>
    <Router>
      <nav className="navbar">
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/search">Search</Link></li>
          <li><Link to="/groups">Groups</Link></li>
          <li><Link to="/ratings">Ratings</Link></li>
          <li><Link to="/newReleases">New releases</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/moviesSearch">Movies search</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />

      </Routes>

    </Router>
  </div>
  );
}

export default App;
