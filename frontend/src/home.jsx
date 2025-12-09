import { useEffect, useState } from "react";
import { trendingMovies } from "./TMDB_api_calls.js";
import styles from "./styles/home.module.css";
import { useNavigate } from "react-router-dom"

const BASE_URL = "https://image.tmdb.org/t/p/w200"; //postereille

export default function Home() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  //mahdollinen auth puuttuu ehkä.
  
  useEffect(() => {
    trendingMovies()
      .then((movieArray) => {
        setMovies(movieArray.slice(0, 3)); //näyttää kolme elokuvaa.
      })
      .catch((err) => console.error("Error getting trending movies:", err));
  }, []);

  return (
    <div className={styles.Container}>
      <main className={styles.main}>
        <h1>Home</h1>
        <p>Welcome to the page</p>
        <h2>Trending:</h2>
        <div className={styles.movieBox}>
          {movies.map((
            movie) => (
            <div key={movie.id} className={styles.movieCard}>
              <img src={`${BASE_URL}${movie.poster_path}`} onClick={() => navigate(`/movie/${movie.id}`)} alt={movie.title} className={styles.poster}/>
              <p>{movie.title}</p>
              <p>{movie.release_date}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  ); //tällä hetkellä käytän <p> (paragraph) teksteissä.
  //key={movie.id} sillä se on uniikki ja voi muuttua uusilla movie.id. HUOM. Ei ole pääsyä komponentin sisällä.
}