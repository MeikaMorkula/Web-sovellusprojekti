import { useState } from "react";
import AbsoluteRating from "./AbsoluteRating.js";

export default function Reviews({ movieId, reviews, addReviewCallback }) {
  const [reviewDescription, setReviewDescription] = useState("");
  const [reviewRating, setReviewRating] = useState(2.5);

  return (
    <div>
      <h3>Add your review!</h3>
      <label>Review text</label>
      <input
        type="text"
        value={reviewDescription}
        onChange={(e) => setReviewDescription(e.target.value)}
      />
      <label>Review rating</label>
      <AbsoluteRating value={reviewRating} onChange={setReviewRating} />
      <button
        onClick={() => {
          addReviewCallback({
            review_description: reviewDescription,
            review_rating: reviewRating,
            user_id: 1,
            movie_id: movieId,
          });
          setReviewDescription("");
          setReviewRating(2.5);
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
            <AbsoluteRating value={review.review_rating} readOnly />
          </div>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
}
