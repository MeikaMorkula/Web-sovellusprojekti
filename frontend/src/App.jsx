import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./pages/LoginPage.jsx"
import ProfilePage from ".pages/ProfilePage.jsx";
import Home from './home.js';
import Search from './search.js';

function App() {
  useEffect(() => {

  }, []);


  return (
    <div style={{madWidth: 600, margin: "2rem auto", fontFamily: "sans-serif" }}>
      {
        <router>
          <route path="/login" element={<LoginPage />}/>
          <route path="/profile" element={<ProfilePage />}/>
          <route path="/home" element={<Home />}/>
          <route path="/search" element={<Search />}/>
        </router>
      }
    </div>
  )
}

export default App;