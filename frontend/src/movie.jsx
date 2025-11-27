import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchMovieById } from "./TMDB_api_calls.js";

export default function Movie() {
  const POSTER_URL = "https://image.tmdb.org/t/p/w500";
  const [movie, setMovies] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [favouriteStatus, setFavouriteStatus] = useState([]);
  let favourite = null;
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

  const Favourite = () => { 
     if (favouriteStatus.movie_id === parseInt(urlInfo.id)) {
      return <button>Remove from favourites</button>;
    } else {
      return <button>Add to favourites</button>;
    }
  };

  const Movies = () => {
    return (
      <div style={styles.container} key={movie.id}>
        <div style={styles.side}>
          <p>Star rating component</p>
          <p>{movie.vote_average} / 10</p>
          <div>
            <Favourite />
          </div>
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

          {/*reviews && reviews.results.length > 0 ? (
            reviews.results.map((review) => 
              <div key={review.id}></div>)
            ) : (
              <p>No reviews available.</p>
          )*/}
        </div>
      </div>
    );
  };

  async function fetchFavourite() {
    try {
      const res = await fetch(
        `http://localhost:3001/favourite/getFavourite${urlInfo.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: 1, username: "Simo" }),
        }
      );
      const data = await res.json();
      console.log(data);
      //setFavouriteStatus(data);
    } catch (error) {};
  }

  const Search = (movie_id) => {
    searchMovieById(movie_id)
      .then((json) => {
        setMovies(json);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    //Search(urlInfo.id);
    fetchFavourite();
  }, []);

  return (
    <div>
      <Movies />
    </div>
  );
}
