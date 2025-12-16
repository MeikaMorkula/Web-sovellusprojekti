import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

export default function CustomButton({text, ...props}) {
  return <Button variant="contained" {...props}
  sx={{margin: 2}}
  startIcon={<SearchIcon/>}
  >{text}</Button>;
}