import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchMovieById } from "./TMDB_api_calls.js";

export default function Movie() {
  const POSTER_URL = "https://image.tmdb.org/t/p/w500";
  const [movie, setMovies] = useState([]);
  let urlInfo = useParams();

  const Movies = () => {
    return (
      <div>
        <div>
          <img
            src={`${POSTER_URL}${movie.poster_path}`}
            alt={movie.title}
          ></img>

          <ul>
            {movie.genres &&
              movie.genres.map((genre) => (
                <li key={genre.name}>{genre.name}</li>
              ))}
          </ul>
        </div>

        <div>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
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
