import { useState } from "react";
import AbsoluteRating from "./AbsoluteRating.js";
import styles from "../styles/reviews.module.css";

export default function Reviews({ body, reviews, addReviewCallback }) {
  const [reviewDescription, setReviewDescription] = useState("");
  const [reviewRating, setReviewRating] = useState(2.5);

  return (
    <div>
      <h3>Add your review!</h3>
      <AbsoluteRating value={reviewRating} onChange={setReviewRating} />
      <br></br>
      <input
        type="text"
        value={reviewDescription}
        onChange={(e) => setReviewDescription(e.target.value)}
      />
      
      <button
        onClick={() => {
          addReviewCallback({
            review_description: reviewDescription,
            review_rating: reviewRating,
            user_id: body.user_id,
            movie_id: body.movie_id,
            poster_path: body.poster_path,
            movie_name: body.movie_name,
            username: body.username,
          });
          setReviewDescription("");
          setReviewRating(2.5);
        }}
      >
        Submit Review
      </button>

      <h3>Reviews Section</h3>
      <div className={styles.Container}>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.review_id} className={styles.review}>
              <table>
                <tr>
                  <th>
                    <span
                      className={styles.topBox}
                      // Link to favourites list / profile
                      //onClick={() => navigate(`/profile/${review.user_id}`)}
                    >
                      {review.username}
                    </span>
                  </th>
                  <th>
                    <span className={styles.topBox}>
                      <AbsoluteRating value={review.review_rating} readOnly />
                    </span>
                  </th>
                </tr>
                <tr>
                  <td>
                    <span className={styles.bottomBox}>profile picture</span>
                  </td>
                  <td>
                    <span className={styles.review_description}>
                      {review.review_description}
                    </span>
                  </td>
                </tr>
              </table>
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    </div>
  );
}
