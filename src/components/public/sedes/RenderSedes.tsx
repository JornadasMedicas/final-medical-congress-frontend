import { Box, Divider, Grid, Typography, useMediaQuery } from "@mui/material"
import { useEffect, useMemo, useRef, useState } from "react";
import { PropsSedes } from "../../../interfaces/sedes/ISedes";
import mapboxgl from 'mapbox-gl';
import { SectionObserver } from "../../ui/SectionObserver";
import { motion } from "motion/react";

export const RenderSedes = ({ sedes }: any /* PropsISedes */) => {
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");
    const [selectedItem, setSelectedItem] = useState<number>(0);
    const itemData: PropsSedes[] = useMemo(() => sedes.filter((_item: PropsSedes, index: number) => index === selectedItem), [selectedItem]);
    const mapContainer = useRef(''); // Ref para el contenedor del mapa

    useEffect(() => {
        // Configura Mapbox GL con tu token de acceso
        mapboxgl.accessToken = `${import.meta.env.VITE_APP_MAPBOX_KEY}`;

        const map = new mapboxgl.Map({
            container: mapContainer.current, // Referencia al div del contenedor
            style: 'mapbox://styles/mapbox/streets-v12', // Estilo del mapa
            center: itemData[0].location, // starting position [lng, lat]
            zoom: 16, // Nivel de zoom inicial
            hash: false,
            projection: {
                name: 'globe'
            }
        });

        // Agregar un marcador (opcional)
        const marker = new mapboxgl.Marker({
            color: 'red', // Cambiar color del marcador (puede ser un color hex)
        })
            .setLngLat(itemData[0].location)
            .addTo(map);

        const markerElement = marker.getElement();
        markerElement.style.cursor = 'pointer';

        markerElement.addEventListener('click', () => {
            window.open(itemData[0].map, '_blank')
        });

        map.addControl(new mapboxgl.FullscreenControl());

        // Limpieza cuando el componente se desmonte
        return () => map.remove();
    }, [selectedItem, itemData]);

    return (
        <Grid container columns={12} sx={{ display: 'flex', minHeight: responsive ? 'auto' : '90.5vh', flexDirection: 'column', ml: responsive ? 3 : 20, mr: responsive ? 3 : 20, mt: responsive ? 2 : 5, mb: responsive ? 0 : -3 }}>
            <Grid size={responsive ? 12 : 6} sx={{ mb: responsive ? 2 : 2, position: 'relative' }}>
                <SectionObserver sectionId="Sedes" />
                <Divider
                    component={motion.div}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.85, ease: 'easeInOut' }}
                    viewport={{ once: true }}
                    sx={{ fontFamily: 'sans-serif', fontWeight: 700, fontSize: responsive ? '25px' : '33px', color: 'text.primary', width: responsive ? '80%' : '50%', m: 'auto' }}
                >
                    SEDES
                </Divider>
            </Grid>
            <Grid container size={12}>
                <Grid size={responsive ? 12 : 6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: responsive ? 'auto' : '75vh', gap: responsive ? 4 : 20, mb: responsive ? 3 : 0 }}>
                    {
                        sedes.map((sede: any, index: number) => (
                            <Box
                                key={sede.id}
                                sx={{

                                    boxShadow: '0px 2px 10px 5px rgba(1,18,38, 0.15)',
                                    borderTopLeftRadius: 5,
                                    borderBottomLeftRadius: 5,
                                    borderTopRightRadius: responsive ? 10 : 5,
                                    borderBottomRightRadius: responsive ? 10 : 0,
                                    transform: index === selectedItem ? 'scale(1.05)' : 'scale(1)',
                                    transition: 'transform 0.3s ease', ':hover': {
                                        cursor: 'pointer', transform: 'scale(1.05)',
                                        transition: 'transform 0.3s ease'
                                    },
                                    zIndex: 1
                                }}
                                onClick={() => setSelectedItem(index)}
                            >
                                <Grid container size={12}>
                                    <Grid size={responsive ? 12 : 6}
                                        sx={{
                                            p: responsive ? 2 : 2.5,
                                            backgroundColor: '#ffffff',
                                            borderTopLeftRadius: 5,
                                            borderBottomLeftRadius: 5,
                                            borderLeft: selectedItem === index ? '4px solid #50736c' : '',
                                            borderTopRightRadius: responsive ? 10 : 5,
                                            borderBottomRightRadius: responsive ? 10 : 0,
                                        }}>
                                        <Typography
                                            fontFamily={'sans-serif'}
                                            fontSize={responsive ? '16px' : '17px'}
                                            fontWeight={'bold'}
                                            sx={{ color: 'text.primary' }}
                                        >
                                            {sede.title}
                                        </Typography>
                                    </Grid>
                                    {
                                        !responsive &&
                                        <Grid size={6} sx={{ backgroundColor: '#50736c' }}>
                                            <Box sx={{ backgroundColor: 'white', height: '100%', width: '20%', borderBottomRightRadius: '100px' }} />
                                        </Grid>
                                    }
                                </Grid>
                            </Box>
                        ))
                    }
                </Grid>
                <Grid size={responsive ? 12 : 6} sx={{ backgroundColor: '#50736c', height: '100%', minHeight: 'auto', borderRadius: 3, p: responsive ? 1 : 2, zIndex: 2, boxShadow: '0 8px 10px 0 rgba(1,18,38, 0.15)', }}>
                    <Box
                        sx={{
                            backgroundColor: 'white',
                            height: 'auto',
                            p: 2,
                            textAlign: 'center',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                        <Typography
                            key={itemData[0].place}
                            component={motion.div}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            fontSize={responsive ? '17px' : '20px'}
                            color="background.default"
                            fontWeight={'bold'}
                        >
                            {itemData[0].place}
                        </Typography>
                        <Typography
                            key={itemData[0].address}
                            component={motion.div}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
                            fontSize={responsive ? '17px' : '20px'}
                            color="secondary.main"
                            fontWeight={'bold'}
                            mb={1}
                        >
                            {itemData[0].address}
                        </Typography>
                        <Divider sx={{ width: responsive ? '70%' : '50%', ml: 'auto', mr: 'auto', mb: 2 }} />
                        <Box
                            ref={mapContainer}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                verticalAlign: 'center',
                                width: '100%',
                                height: responsive ? '56vh' : '62.5dvh',
                                borderRadius: 2,
                                boxShadow: 2,
                                overflow: 'hidden'
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    )
}
