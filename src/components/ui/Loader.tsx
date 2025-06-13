import { Grid, Typography, useMediaQuery } from "@mui/material";
import { motion } from 'framer-motion';

export const Loader = () => {
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");

    return (
        <Grid
            component={motion.div}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            container
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 3,
                position: 'fixed',
                backgroundColor: '#fbfffe',
                flexDirection: 'column',
                gap: 5
            }}>
            <img width={responsive ? '120px' : 'auto'} height={responsive ? '50px' : '70px'} alt="heart-pulse.svg" loading="lazy" src={`${import.meta.env.VITE_APP_BASE_ROUTE}/heart-pulse.svg`} style={{
                position: 'absolute', top: '50%',
                left: responsive ? '48%' : '49.4%',
                transform: 'translate(-50%, -50%)'
            }}
            />
            <Typography
                sx={{
                    color: 'primary.dark',
                    fontSize: responsive ? '17px' : '19px',
                    position: 'absolute',
                    top: '57%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}>
                Cargando...
            </Typography>
        </Grid>
    )
}
