import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#ffffff',

        },
        secondary: {
            main: '#333333'
        },
        background: {
            default: '#13322c'
        },
        text: {
            primary: '#333',
            secondary: '#d6bf9b'
        },
    },
    typography: {
        fontFamily: 'Arial, sans-serif'
    }
});

export default theme;