import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchMovieById } from "./TMDB_api_calls.js";
import styles from "./styles/movie.module.css";

export default function Movie() {
  const POSTER_URL = "https://image.tmdb.org/t/p/w500";
  const ORIGINAL_POSTER_URL = "https://image.tmdb.org/t/p/original"; //Original poster on hyvä laatuisempi.
  const [movie, setMovies] = useState([]);
  let urlInfo = useParams();

  const [coolLarge, setCoolLarge] = useState(false);
  const [coolImg, setCoolImg] = useState("");

  const largeCool = (imgSrc) => {
    setCoolImg(imgSrc);
    setCoolLarge(true);
  };

  const closeCool = () => {
    setCoolLarge(false);
  };

  const Movies = () => {
    return (
      <div className={styles.container}>
        <div className={styles.side}>
          <p>user rating</p>
          <li>{movie.vote_average} / 10</li>

          <div>
            <img
              className={styles.img}
              src={`${POSTER_URL}${movie.poster_path}`}
              alt={movie.title}
              onClick={() => largeCool(`${ORIGINAL_POSTER_URL}${movie.poster_path}`)}
            ></img>
          </div>

          <ul>
            {movie.genres &&
              movie.genres.map((genre) => <li key={genre.id}>{genre.name}</li>)}
          </ul>
          <p>{movie.release_date}</p>
          {movie.spoken_languages &&
            movie.spoken_languages.map((language) => (
              <div>
                <p>{language.english_name}</p>
              </div>
            ))}
        </div>

        <div className={styles.main}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <br></br>
            <p>reviews</p>
            {/* 
            Yritin kirjoittaa itse mutta copilot ajatteli samaa ¯\_(ツ)_/¯
            Search the favourites table by the movie id to get user reviews for this movie
            make <Reviews /> component to show the reviews
            and const Reviews = () => { ... } function here to fetch and display reviews
            */}
        </div>
        <div className={`${styles.cool} ${coolLarge ? styles.show : ""}`} onClick={closeCool}>
        <span className={styles.close} onClick={closeCool}>
          &times;
        </span>
        <img className={styles.coolContent} src={coolImg} />
      </div>
      </div>
    );
  };

  const Search = (movie_id) => {
    searchMovieById(movie_id)
      .then((json) => {
        setMovies(json);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    Search(urlInfo.id);
  }, []);

  return (
    <div>
      <Movies/>
    </div>
  );
}
