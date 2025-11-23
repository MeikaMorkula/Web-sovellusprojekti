import Button from '@mui/material/Button';

export default function CustomButton({text, ...props}) {
  return <Button variant="contained" {...props}
  sx={{margin: 2}}
  >{text}</Button>;
}