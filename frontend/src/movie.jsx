import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchMovieById } from "./TMDB_api_calls.js";
import {
  fetchFavourite,
  fetchReviews,
  addReview,
  deleteFavourite,
  addFavourite,
  fetchUserData,
} from "./database_api_calls.js";
import styles from "./styles/movie.module.css";
import AbsoluteRating from "./components/AbsoluteRating.js";
import FavouriteButton from "./components/FavouriteButton.js";
import Reviews from "./components/Reviews.jsx";
import CustomButton from "./components/CustomButton.js";

export default function Movie() {
  const POSTER_URL = "https://image.tmdb.org/t/p/w500";
  const ORIGINAL_POSTER_URL = "https://image.tmdb.org/t/p/original"; //Original poster on hyvä laatuisempi.
  const [movie, setMovies] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [favouriteStatus, setFavouriteStatus] = useState([]);
  const [userData, setUserData] = useState([]);
  const [clicked, setClicked] = useState(true);
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

  const Favourite = () => {
    if (!userData) return;

    const handleClick = () => {
      if (clicked == false) {
        console.log("delete");
        deleteFavourite(favouriteStatus.favourite_id);
      } else if (clicked == true) {
        console.log("ADDING FAV:", userData);
        addFavourite({
          user_id: userData.user_id,
          movie_id: urlInfo.id,
          username: userData.username,
          poster_path: movie.poster_path,
          movie_name: movie.title,
        });
        fetchFavourite(urlInfo.id, userData.user_id)
        .then((data) => {
          setFavouriteStatus(data);
          if (!data) {
            setClicked(false);
          }
        })
        .catch((error) => console.error(error));
      }
      setClicked(!clicked);
      
    };

    return (
      <button
        onClick={() => {
          handleClick();
        }}
      >
        <FavouriteButton 
        />
      </button>
    );
  };

  const Movies = () => {
    return (
      <div className={styles.container} key={movie.id}>
        <div className={styles.side}>
          <AbsoluteRating
            value={movie.vote_average / 2}
            readOnly
            precision={0.1}
          />
          {movie.vote_average / 2} / 5
          <div>
            <Favourite />
          </div>
          <div>
            <img
              className={styles.img}
              src={`${POSTER_URL}${movie.poster_path}`}
              alt={movie.title}
              onClick={() =>
                largeCool(`${ORIGINAL_POSTER_URL}${movie.poster_path}`)
              }
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

        <div className={styles.main}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <br></br>
          <Reviews
            body={{
              user_id: userData.user_id,
              movie_id: urlInfo.id,
              poster_path: movie.poster_path,
              movie_name: movie.title,
              username: userData.username,
            }}
            reviews={reviews}
            addReviewCallback={addReview}
          />
        </div>
        <div
          className={`${styles.cool} ${coolLarge ? styles.show : ""}`}
          onClick={closeCool}
        >
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
    fetchUserData().then((data) => {
      setUserData(data);
    })
    .catch((error) => console.error(error));
    Search(urlInfo.id);
    fetchReviews(urlInfo.id)
      .then((data) => {
        setReviews(data);
      })
      .catch((error) => console.error(error));
    fetchFavourite(urlInfo.id, userData.user_id)
        .then((data) => {
          setFavouriteStatus(data);
          if (!data) {
            setClicked(false);
          }
        })
        .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <Movies />
    </div>
  );
}
