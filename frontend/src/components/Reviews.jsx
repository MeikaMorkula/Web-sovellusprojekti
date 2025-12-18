import { useState } from "react";
import AbsoluteRating from "./AbsoluteRating.js";
import styles from "../styles/reviews.module.css";
import CustomButton from "./CustomButton.js";

export default function Reviews({ body, reviews, addReviewCallback }) {
  const [reviewDescription, setReviewDescription] = useState("");
  const [reviewRating, setReviewRating] = useState(2.5);

  return (
    <div>
      <div>
        <h3>Add your review!</h3>
        <AbsoluteRating value={reviewRating} onChange={setReviewRating} />
        <br></br>
        <textarea
          rows="4"
          type="text"
          value={reviewDescription}
          onChange={(e) => setReviewDescription(e.target.value)}
        />
      </div>
      <CustomButton
        text="Submit Review"
        onClick={() => {
          addReviewCallback({
            review_description: reviewDescription,
            review_rating: reviewRating,
            user_id: body.user_id,
            movie_id: body.movie_id,
            poster_path: body.poster_path,
            movie_name: body.movie_name,
            username: body.username,
          })
            .then(() => {
              window.location.reload();
            })
            .catch((error) => {
              console.error("Failed to add review:", error);
            });
          setReviewDescription("");
          setReviewRating(2.5);
        }}
      ></CustomButton>
    </div>
  );
}
