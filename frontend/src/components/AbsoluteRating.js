import Rating from "@mui/material/Rating";

export default function AbsoluteRating({ value, onChange , readOnly = false, precision = 1 }) {
  return (
    <Rating
      name="review-rating"
      value={value}
      precision={precision}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      readOnly={readOnly}
    />
  );
}