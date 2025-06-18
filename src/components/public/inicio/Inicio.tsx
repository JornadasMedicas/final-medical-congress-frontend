import { Box, Card, CardContent, Grid, Typography, useMediaQuery } from "@mui/material"
import { Carousel } from "./Carousel";
import { motion, useInView } from "motion/react";
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import CalendarTodayTwoToneIcon from '@mui/icons-material/CalendarTodayTwoTone';
import WorkspacePremiumTwoToneIcon from '@mui/icons-material/WorkspacePremiumTwoTone';
import { useContext, useEffect, useRef } from "react";
import { PropsUIContext } from "../../../interfaces/context/IUIContext";
import UIContext from "../../../context/UIContext";

const cards = [
    {
        title: '35 Años',
        subtitle: 'de Asistencia Médica',
        icon: <CalendarTodayTwoToneIcon sx={{ fontSize: 40, color: '#13322c' }} />,
        color: '#275e51'
    },
    {
        title: 'Colaboración',
        subtitle: 'y Avances en Salud',
        icon: <PeopleAltTwoToneIcon sx={{ fontSize: 40, color: '#13322c' }} />,
        color: '#275e51'
    },
    {
        title: 'Innovación',
        subtitle: 'y Excelencia',
        icon: <WorkspacePremiumTwoToneIcon sx={{ fontSize: 40, color: '#13322c' }} />,
        color: '#275e51'
    }
]

export const Inicio = () => {
    const { setActiveSection, setTriggerRelocation } = useContext<PropsUIContext>(UIContext);
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");
    const refs = useRef(null);
    const isInView = useInView(refs, { once: false });

    useEffect(() => {
        if (isInView) {
            setActiveSection('Inicio');
            setTriggerRelocation(false);
        }
    }, [isInView, setActiveSection, setTriggerRelocation]);

    return (
        <Grid container columns={12} sx={{ display: 'flex', minHeight: 'auto', flexDirection: 'column', mt: responsive ? 0 : 2, mb: responsive ? 4 : 7 }}>
            <Grid size={12} sx={{ textAlign: 'center', minHeight: responsive ? '46.5vh' : '65vh' }}>
                <Carousel />
            </Grid>
            <Box sx={{ ml: responsive ? 3 : 20, mr: responsive ? 3 : 20 }}>
                <Grid container columns={12} sx={{ display: 'flex', flexDirection: responsive ? 'column' : 'row', justifyContent: 'center', gap: 3, mb: 4, mt: 2 }}>
                    {
                        cards.map((card, index) => (
                            <Grid key={card.title} size={'auto'}>
                                <Card
                                    component={motion.div}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.85, delay: 0.3 * index }}
                                    viewport={{ once: true }}
                                    sx={{
                                        borderRadius: 3,
                                        boxShadow: 3,
                                        borderTop: `4px solid ${card.color}`,
                                        width: responsive ? '100%' : 370,
                                        textAlign: 'center',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            boxShadow: 4,
                                        },
                                    }}
                                >
                                    <CardContent>
                                        <Box display="flex" justifyContent="center" mb={1}>
                                            {card.icon}
                                        </Box>
                                        <Typography variant="h6" fontWeight="bold" color="text.primary">
                                            {card.title}
                                        </Typography>
                                        <Typography variant="body2" color="background.default">
                                            {card.subtitle}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
                <Grid
                    component={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.85, ease: 'easeInOut', delay: 0.8 }}
                    viewport={{ once: true }}
                    size={12}
                    sx={{ pt: responsive ? 0 : 2 }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            pt: responsive ? 2 : 0,
                            backgroundColor: 'primary.main',
                            boxShadow: '3px 5px 10px 0px rgba(1,18,38, 0.2)',
                            borderRadius: 5,
                            width: responsive ? 'auto' : '60%',
                            m: 'auto',
                            p: responsive ? 2 : 5,
                            gap: 3,
                            borderLeft: ''
                        }}>
                        <Typography
                            ref={refs}
                            m={'auto'}
                            fontFamily={'sans-serif'}
                            fontWeight={'bold'}
                            textAlign={'justify'}
                            sx={{
                                color: 'secondary.main',
                                fontSize: responsive ? '18px' : '27px',
                            }}
                        >
                            MENSAJE DE BIENVENIDA
                        </Typography>
                        <img
                            loading="eager"
                            width={responsive ? '165px' : '200px'}
                            height={'auto'}
                            src={`${import.meta.env.VITE_APP_BASE_ROUTE}/leaf_ornament.webp`}
                            style={{ margin: 'auto', marginTop: -20 }}
                        />
                        <Typography
                            fontFamily={'sans-serif'}
                            fontWeight={500}
                            textAlign={'justify'}
                            letterSpacing={0.5}
                            lineHeight={responsive ? 'auto' : 2}
                            sx={{
                                color: 'secondary.main',
                                fontSize: responsive ? '18px' : '20px'
                            }}>
                            Es un honor darles la bienvenida a este congreso tan especial, donde celebramos <b style={{ color: '#13322c' }}> 35 años de logros, colaboración y avances</b> en el campo de la salud de Veracruz.
                        </Typography>
                        <Typography
                            fontFamily={'sans-serif'}
                            fontWeight={500}
                            textAlign={'justify'}
                            letterSpacing={0.5}
                            lineHeight={responsive ? 'auto' : 2}
                            sx={{
                                color: 'secondary.main',
                                fontSize: responsive ? '18px' : '20px'
                            }}>
                            A lo largo de estos 35 años, hemos enfrentado numerosos desafíos, pero también hemos alcanzado metas significativas gracias al esfuerzo y dedicación de cada uno de ustedes. Este congreso es un testimonio de nuestro <b style={{ color: '#322118' }}>compromiso continuo con la excelencia y la innovación</b>.
                        </Typography>
                        <Typography
                            fontFamily={'sans-serif'}
                            fontWeight={500}
                            textAlign={'justify'}
                            letterSpacing={0.5}
                            lineHeight={responsive ? 'auto' : 2}
                            fontStyle={'italic'}
                            sx={{
                                color: 'gray',
                                fontSize: responsive ? '18px' : '20px',
                                p: 2,
                                textAlign: 'right',
                                borderRadius: 5,
                                borderLeft: '4px solid #50736c'
                            }}>
                            "Quiero expresar mi más profundo agradecimiento a todos los que han contribuido a este viaje: a nuestros directivos, por su apoyo incondicional; a los ponentes, por compartir su valioso conocimiento; y a todos los asistentes, por su entusiasmo y participación activa".
                        </Typography>
                        <Typography
                            fontFamily={'sans-serif'}
                            fontWeight={500}
                            textAlign={'justify'}
                            letterSpacing={0.5}
                            lineHeight={responsive ? 'auto' : 2}
                            sx={{
                                color: 'secondary.main',
                                fontSize: responsive ? '18px' : '20px'
                            }}>
                            En este evento, no solo celebraremos nuestros logros pasados, sino que también exploraremos nuevas ideas y estrategias para enfrentar los retos futuros.
                        </Typography>
                    </Box>
                </Grid>
            </Box>
        </Grid>
    )
};
