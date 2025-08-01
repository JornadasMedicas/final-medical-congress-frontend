
import { Container, Grid } from '@mui/material';

export const Footer = () => {

    return (
        <>
            <Grid sx={{ backgroundColor: 'text.secondary' }}>
                <Container maxWidth='xl' sx={{ padding: '10px' }}>
                    <Grid container sx={{ justifyContent: { xs: 'center' }, display: 'flex', gap: { md: 4, xs: 1 } }}>
                        <Grid sx={{ display: 'flex', textAlign: 'center' }}>
                            <img loading='lazy' src={`${import.meta.env.VITE_APP_BASE_ROUTE}/gob_ver.webp`} alt="Gob" width="auto" height="55px" />
                        </Grid>
                        <Grid>
                            <img loading='lazy' src={`${import.meta.env.VITE_APP_BASE_ROUTE}/sesver_logo.webp`} alt="sesver" width="auto" height="50px" />
                        </Grid>
                        <Grid sx={{ display: 'flex', textAlign: 'center' }}>
                            <img loading='lazy' src={`${import.meta.env.VITE_APP_BASE_ROUTE}/imssb_logo.webp`} alt="imss" width="auto" height="50px" />
                        </Grid>
                        <Grid>
                            <img loading='lazy' src={`${import.meta.env.VITE_APP_BASE_ROUTE}/favicon.ico`} alt="CAE" width="auto" height="44px" style={{ marginTop: 3 }} />
                        </Grid>
                    </Grid>
                </Container>
            </Grid>
        </>
    )
}
