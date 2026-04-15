import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#ffffff' },
    background: {
      default: '#050505', // Bohat gehra black
      paper: 'rgba(255, 255, 255, 0.03)', // Transparent effect
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
});

export default theme;
