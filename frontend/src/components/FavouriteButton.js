import FavoriteIcon from '@mui/icons-material/Favorite';

export default function FavouriteButton({ value, onChange , readOnly = false, precision = 1 }) {
  
  return (
    <FavoriteIcon
      color="error"
      name="Favourite-button"
      value={value}
      precision={precision}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      readOnly={readOnly}
    />
  );
}