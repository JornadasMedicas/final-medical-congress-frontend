import { ThemeProvider } from "@emotion/react";
import { AppRouter } from "./routes/AppRouter";
import theme from "./themes/theme";

export const App = () => {

    return (
        <ThemeProvider theme={theme}>
            <AppRouter />
        </ThemeProvider>
    )
}
