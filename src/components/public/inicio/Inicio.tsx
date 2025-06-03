import { Box, Grid, Typography, useMediaQuery } from "@mui/material"
import { Carousel } from "./Carousel";
import { motion } from "motion/react";

export const Inicio = () => {
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");

    return (
        <Grid container columns={12} sx={{ display: 'flex', minHeight: responsive ? 'auto' : '100vh', flexDirection: 'column' }}>
            <Grid size={12} sx={{ textAlign: 'center', minHeight: responsive ? '46.5vh' : '45vh' }}>
                <Carousel />
            </Grid>
            <Box sx={{ ml: responsive ? 3 : 13, mr: responsive ? 3 : 13 }}>
                <Grid size={12} sx={{ display: 'flex', textAlign: 'center', minHeight: '10vh', alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: 'fit-content'
                    }}>
                        <Typography
                            component={motion.div}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.85, ease: 'easeInOut' }}
                            viewport={{ once: true }}
                            fontFamily={'sans-serif'}
                            fontWeight={700}
                            sx={{
                                color: 'text.primary',
                                fontSize: responsive ? '25px' : '30px',
                                pl: responsive ? 1 : 0,
                                pr: responsive ? 1 : 0
                            }}>
                            ¡BIENVENIDOS A LAS JORNADAS MÉDICAS!
                        </Typography>
                    </Box>
                </Grid>
                <Grid
                    size={12}
                    sx={{ pt: responsive ? 0 : 2}}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            pt: responsive ? 2 : 0
                        }}>
                        <Typography
                            component={motion.div}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.85, ease: 'easeInOut', delay: 0.8 }}
                            viewport={{ once: true }}
                            fontFamily={'sans-serif'}
                            fontWeight={500}
                            textAlign={'justify'}
                            letterSpacing={1}
                            lineHeight={responsive ? 'auto' : 2}
                            sx={{
                                color: 'secondary.main',
                                fontSize: responsive ? '18px' : '20px'
                            }}>
                            Es un honor darles la bienvenida a este congreso tan especial, donde celebramos 35 años de logros, colaboración y avances en el campo de la salud de Veracruz. Este aniversario no solo marca un hito en nuestra historia, sino que también nos brinda la oportunidad de reflexionar sobre nuestro recorrido y mirar hacia el futuro con renovada esperanza y determinación.
                            A lo largo de estos 35 años, hemos enfrentado numerosos desafíos, pero también hemos alcanzado metas significativas gracias al esfuerzo y dedicación de cada uno de ustedes. Este congreso es un testimonio de nuestro compromiso continuo con la excelencia y la innovación.
                            Quiero expresar mi más profundo agradecimiento a todos los que han contribuido a este viaje: a nuestros directivos, por su apoyo incondicional; a los ponentes, por compartir su valioso conocimiento; y a todos los asistentes, por su entusiasmo y participación activa.
                            En este evento, no solo celebraremos nuestros logros pasados, sino que también exploraremos nuevas ideas y estrategias para enfrentar los retos futuros. Estoy seguro de que las discusiones y presentaciones que tendremos en los próximos días serán inspiradoras y fructíferas.
                            Cerramos este mensaje con un llamado a la acción: sigamos trabajando juntos, con pasión y dedicación, para construir un futuro aún más brillante. ¡Feliz 35 aniversario!
                        </Typography>
                    </Box>
                </Grid>
            </Box>
        </Grid>
    )
}
