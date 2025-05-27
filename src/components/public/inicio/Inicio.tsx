import { Grid, useMediaQuery } from "@mui/material"
import { Carousel } from "./Carousel";

export const Inicio = () => {
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");

    return (
        <Grid container columns={12} sx={{ display: 'flex', minHeight: responsive ? 'auto' : '100vh', flexDirection: 'column' }}>
            <Grid size={12} sx={{ textAlign: 'center', minHeight: responsive ? '46.5vh' : '45vh' }}>
                <Carousel />
            </Grid>
        </Grid>
    )
}
