import { useEffect, useState } from "react";
import { fetchMovies } from "./TMBD_api_calls.js"; //en tiedä sisältääkö pyyntö poster_path ja onko fetchMovies oikea.
import styles from "./home.modules.css";

const BASE_URL = "https://image.tmdb.org/t/p/w200"; //postereille

export default function Home() {
  const [movies, setMovies] = useState([]);

  //mahdollinen auth puuttuu ehkä.
  
  useEffect(() => {
    fetchMovies()
      .then((data) => {
        setMovies(data.results.slice(0, 3)); //näyttää kolme elokuvaa.
      })
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Home</h1>
        <p>Welcome to the page</p>
        <h2>Recommended for you:</h2>
        <div className={styles.movieBox}>
          {movies.map((
            movie) => (
            <div key={movie.id} className={styles.movieCard}>
              <img src={`${BASE_URL}${movie.poster_path}`} alt={movie.title} className={styles.poster}/>
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