import { useEffect, useState } from "react";
import { newMovies } from "./TMDB_api_calls.js";
import styles from "./styles/newReleases.module.css";
import { useNavigate } from "react-router-dom"

const BASE_URL = "https://image.tmdb.org/t/p/w200";

export default function newReleases() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    newMovies()
      .then((movieArray) => {
        setMovies(movieArray.slice(0, 20));
      })
      .catch((err) => console.error("Error getting new movies:", err));
  }, []);

  return (
    <div className={styles.Container}>
      <main className={styles.main}>
        <h1>Popular New Releases</h1>
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
  );
}