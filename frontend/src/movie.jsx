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
import Reviews from "./components/Reviews.jsx";

export default function Movie() {
  const POSTER_URL = "https://image.tmdb.org/t/p/w500";
  const ORIGINAL_POSTER_URL = "https://image.tmdb.org/t/p/original"; //Original poster on hyvä laatuisempi.
  const [movie, setMovies] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [favouriteStatus, setFavouriteStatus] = useState([]);
  const [userData, setUserData] = useState([]);
  const [me, setMe] = useState(null);
  const [reviewDescription, setReviewDescription] = useState("");
  const [reviewRating, setReviewRating] = useState(2.5);
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

  const Reviews = () => {
    return (
      <div>
        <h3>Add your review!</h3>
        <label>Review text</label>
        <input
          name="review_description"
          type="text"
          id="review_description"
        ></input>
        <label>Review rating</label>
        <input type="text" id="review_rating"></input>
        <button
          onClick={() => {
            const review = {
              review_description: review_description.value,
              review_rating: review_rating.value,
              user_id: userData.user_id,
              movie_id: urlInfo.id,
              poster_path: movie.poster_path,
              movie_name: movie.title,
              username: userData.username,
            };
            console.log(review);
            addReview(review);
          }}
        >
          Submit Review
        </button>

        <h3>Reviews Section</h3>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.review_id}>
              <p>{review.user_id}</p>
              <p>{review.review_description}</p>
              <p>{review.review_rating}</p>
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    );
  };

  useEffect(() => {
    fetch("http://localhost:3001/user/me", {
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((meData) => {
        if (!meData) return null;

        return fetch(`http://localhost:3001/user/${meData.id}`, {
          credentials: "include",
        });
      })
      .then((res) => (res ? res.json() : null))
      .then((profile) => {
        if (profile) setMe(profile);
      })
      .catch(() => {});
  }, []);

  const Favourite = () => {
    if (!me) return;

    if (favouriteStatus.movie_id === parseInt(urlInfo.id)) {
      return (
        <button
          onClick={() => {
            deleteFavourite(favouriteStatus.favourite_id);
          }}
        >
          Remove from favourites
        </button>
      );
    } else {
      return (
        <button
          disabled={!me}
          onClick={() => {
            console.log("ADDING FAV:", me);
            addFavourite({
              user_id: me.user_id ?? me.id,
              movie_id: urlInfo.id,
              username: me.username,
            });
          }}
        >
          {" "}
        </button>
      );
    }
  };

  const Movies = () => {
    return (
      <div className={styles.container} key={movie.id}>
        <div ClassName={styles.side}>
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
            movieId={parseInt(urlInfo.id)}
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
    });
    Search(urlInfo.id);
    fetchFavourite(urlInfo.id, 1)
      .then((data) => {
        console.log(data);
        setFavouriteStatus(data);
      })
      .catch((error) => console.error(error));

    fetchReviews(urlInfo.id)
      .then((data) => {
        console.log(data);
        setReviews(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <Movies />
    </div>
  );
}
