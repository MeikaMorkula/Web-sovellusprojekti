import { useState, useEffect } from "react";
import { fetchAllReviews } from "../database_api_calls.js";
import { searchMovieById } from "../TMDB_api_calls.js";
import CustomButton from "../components/CustomButton.js";
import AbsoluteRating from "../components/AbsoluteRating.js";
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
              <table>
                <tr>
                  <th>
                    <h4
                      className={styles.topBox}
                      // Link to favourites list / profile
                      //onClick={() => navigate(`/profile/${review.user_id}`)}
                    >
                      {review.username}
                    </h4>
                  </th>
                  <th>
                    <h2 className={styles.topBox}>
                      <AbsoluteRating
                        value={review.review_rating}
                        readOnly
                        precision={1}
                      />
                    </h2>
                  </th>
                  <th>
                    <h2 className={styles.review_description}>
                      {review.movie_name}
                    </h2>
                  </th>
                </tr>
                <tr>
                  <td>
                    <p className={styles.bottomBox}>profile picture</p>
                  </td>
                  <td>
                    <img
                      src={`${POSTER_URL}${review.poster_path}`}
                      alt={review.movie_name}
                      className={styles.img}
                      onClick={() => navigate(`/movie/${review.movie_id}`)}
                    ></img>
                  </td>
                  <td>
                    <p className={styles.review_description}>
                      {review.review_description}
                    </p>
                  </td>
                </tr>
              </table>
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
