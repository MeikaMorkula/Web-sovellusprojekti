import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchMovieById } from "./TMDB_api_calls.js";

export default function Movie() {
  const POSTER_URL = "https://image.tmdb.org/t/p/w500";
  const [movie, setMovies] = useState([]);
  let urlInfo = useParams();

  // could be a seperate component but easier to change in here for now
  const styles = {
    container: {
      display: "flex",
      flexDirection: "row",
    },
    side: {
      flex: "20%",
      backgroundColor: "#f1f1f1",
      padding: "20px",
    },
    main: {
      flex: "80%",
      backgroundColor: "#ffffff",
      padding: "20px",
    },
    img: {
      width: "100%",
      objectFit: "cover",
    },
  };

  const Movies = () => {
    return (
      <div style={styles.container} key={movie.id}>
        <div style={styles.side}>
          <p>user rating</p>
          <li>{movie.vote_average} / 10</li>

          <div>
            <img
              style={styles.img}
              src={`${POSTER_URL}${movie.poster_path}`}
              alt={movie.title}
            ></img>
          </div>

          <ul>
            {movie.genres &&
              movie.genres.map((genre) => <li key={genre.id}>{genre.name}</li>)}
          </ul>
          <p>{movie.release_date}</p>
          {movie.spoken_languages &&
            movie.spoken_languages.map((language) => (
              <div key={language.iso_639_1}>
                <p>{language.english_name}</p>
              </div>
            ))}
        </div>

        <div style={styles.main}>
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
      <Movies />
    </div>
  );
}
