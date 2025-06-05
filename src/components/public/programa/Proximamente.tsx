import { Box, Grid, Typography, useMediaQuery } from "@mui/material"
import { motion } from "motion/react";

export const Proximamente = () => {
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");

    return (
        <Grid
            container
            columns={12}
            sx={{ display: 'flex', justifyContent: 'center', height: '77vh' }}>
            <Typography
                component={motion.div}
                initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
                whileInView={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
                viewport={{ once: true }}
                sx={{
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: responsive ? '41vh' : '38.5vh',
                    fontSize: responsive ? '11vw' : '5vw',
                    fontWeight: 'bold',
                    backgroundImage: 'linear-gradient(45deg, #afd5cd, #13322c)',
                    backgroundClip: 'text',
                    color: 'transparent',
                    zIndex: 1
                }}
            >
                PRÓXIMAMENTE
            </Typography>
            {
                responsive ?
                    <Box
                        component={motion.div}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.5, ease: 'easeOut' }}
                        viewport={{ once: true }}
                        sx={{ width: '100%', position: 'relative', overflow: 'hidden' }}>
                        <img width={'100%'} height={'100%'} style={{ position: 'absolute', bottom: 0, filter: 'drop-shadow(0px 0px 3.5px grey)', zIndex: 2 }} src={`${import.meta.env.VITE_APP_BASE_ROUTE}/incoming.webp`} />
                    </Box>
                    :
                    <Box
                        component={motion.div}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.5, ease: 'easeOut' }}
                        viewport={{ once: true }}
                        sx={{ zIndex: 2 }}
                    >
                        <Box
                            component="img"
                            loading="eager"
                            src={`${import.meta.env.VITE_APP_BASE_ROUTE}/incoming.webp`}
                            sx={{
                                height: '100%',
                                width: 'auto',
                                overflow: 'hidden',
                                filter: 'drop-shadow(0px 0px 9px grey)',
                                mt: 2
                            }}
                        />
                    </Box>
            }
        </Grid>
    )
}
