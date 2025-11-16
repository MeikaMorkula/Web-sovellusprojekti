import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './home';
import Search from './search';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/search">Search</Link></li>
          <li><Link to="/groups">Groups</Link></li>
          <li><Link to="/ratings">Ratings</Link></li>
          <li><Link to="/newReleases">New releases</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
      
      </Routes>
    </Router>
  ); //toiset route path pitää laittaa myöhemmin kun tällä hetkellä heittää muuten virhettä.
  //päätin nyt toistaseksi vielä käyttämään browserouter voi vaihtaa useNavigate tai navigate, Link.
}

export default App;