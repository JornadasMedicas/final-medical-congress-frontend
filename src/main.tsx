import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { UIProvider } from './providers/UIProvider.tsx';
import theme from './themes/theme.ts';

createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <CssBaseline />
        <UIProvider>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </UIProvider>
    </StrictMode>,
);