import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './themes/theme.ts';
import { UIContextProvider } from './context/UIContext.tsx';
import { SnackbarProvider } from 'notistack';

createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <CssBaseline />
        <UIContextProvider>
            <ThemeProvider theme={theme}>
                <SnackbarProvider>
                    <App />
                </SnackbarProvider>
            </ThemeProvider>
        </UIContextProvider>
    </StrictMode>
);