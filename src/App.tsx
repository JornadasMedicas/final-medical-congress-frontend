import { ThemeProvider } from "@emotion/react";
import { AppRouter } from "./routes/AppRouter";
import theme from "./themes/theme";
import { UIProvider } from "./providers/UIProvider";

export const App = () => {

    return (
        <UIProvider>
            <ThemeProvider theme={theme}>
                <AppRouter />
            </ThemeProvider>
        </UIProvider>
    )
}
