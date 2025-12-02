import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchMovieById } from "./TMDB_api_calls.js";
import  { fetchFavourite, fetchReviews, addReview, deleteFavourite, addFavourite } from "./database_api_calls.js";

export default function Movie() {
  const POSTER_URL = "https://image.tmdb.org/t/p/w500";
  const [movie, setMovies] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [favouriteStatus, setFavouriteStatus] = useState([]);
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
      return <button onClick={() => {
        deleteFavourite(favouriteStatus.favourite_id);
      }}>Remove from favourites</button>;
    } else {
      return <button onClick={() => {
        
       addFavourite(
        {movie_id: urlInfo.id, username: "testuser1", user_id: "1"}
      );
       }}>Add to favourites</button>
    }
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
        <input
          type="text"
          id="review_rating"
        ></input>
        <button onClick={() => {
          const review = {
            review_description: review_description.value,
            review_rating: review_rating.value,
            user_id: 1,
            movie_id: parseInt(urlInfo.id),
          };
          addReview(review);
        }}>Submit Review</button>
        
        <h3>Reviews Section</h3>
        {reviews.length > 0 ? (
            reviews.map((review) => 
              <div key={review.review_id}>
                <p>{review.user_id}</p>
                <p>{review.review_description}</p>
                <p>{review.review_rating}</p>
              </div>)
            ) : (
              <p>No reviews available.</p>
          )
        }
      </div>
    );
  }

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
          <Reviews />
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
