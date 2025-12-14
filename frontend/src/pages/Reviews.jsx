import { useState, useEffect } from "react";
import { fetchAllReviews } from "../database_api_calls.js";
import { searchMovieById } from "../TMDB_api_calls.js";
import CustomButton from "../components/CustomButton.js";
import ReactPaginate from "react-paginate";
import styles from "../styles/reviews.module.css";
import { useNavigate } from "react-router-dom";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const POSTER_URL = "https://image.tmdb.org/t/p/w200";

  const Reviews = () => {
    const navigate = useNavigate();
    return (
      <div className={styles.Container}>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.review_id} className={styles.review}>
              <img
                src={`${POSTER_URL}${review.poster_path}`}
                alt={review.movie_name}
                className={styles.img}
                onClick={() => navigate(`/movie/${review.movie_id}`)}
              ></img>
              <h2 className={styles.box}>{review.movie_name}</h2>
              <h2 className={styles.box}>{review.review_rating}</h2>
              <h4
                className={styles.box}
                // Link to favourites list / profile
                //onClick={() => navigate(`/profile/${review.user_id}`)}
              >
                {review.username}
              </h4>
              <p className={styles.review_description}>{review.review_description}</p>
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    );
  };

  useEffect(() => {
    fetchAllReviews().then((data) => {
      console.log(data);
      setReviews(data);
      setPageCount(data.total_pages);
    });
  }, [page]);

  return (
    <div>
      <ReactPaginate
        className={styles.pagination}
        breakLabel="..."
        nextLabel=">>"
        onPageChange={(event) => {
          setPage(event.selected + 1);
        }}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
      />
      <Reviews />
    </div>
  );
}
