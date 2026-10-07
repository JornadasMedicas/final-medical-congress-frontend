import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#ffffff',
            light: '#2a5a4f',
            dark: '#0b211d',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#d6bf9b',
            light: '#efe4d0',
            dark: '#a88d5f',
            contrastText: '#13322c',
        },
        background: {
            default: '#13322c',
            paper: '#faf6ee',
        },
        text: {
            primary: '#1f2a27',   // texto sobre superficies claras (cards)
            secondary: '#d6bf9b', // texto sobre el fondo verde
        },
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
    },
});

export default theme;