import { Box, Divider, Grid, Typography, useMediaQuery } from "@mui/material"
import { sedes2024 } from "../../../helpers/sedes/data";
import { useEffect, useRef, useState } from "react";
import { PropsSedes } from "../../../interfaces/sedes/ISedes";
import { motion } from "motion/react";
import mapboxgl from 'mapbox-gl';

export const Sedes = () => {
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");
    const [selectedItem, setSelectedItem] = useState<number>(0);
    const itemData: PropsSedes[] = sedes2024.filter((_item, index) => index === selectedItem);
    const mapContainer = useRef(''); // Ref para el contenedor del mapa

    useEffect(() => {
        // Configura Mapbox GL con tu token de acceso
        mapboxgl.accessToken = `${import.meta.env.VITE_APP_MAPBOX_KEY}`;

        const map = new mapboxgl.Map({
            container: mapContainer.current, // Referencia al div del contenedor
            style: 'mapbox://styles/mapbox/streets-v12', // Estilo del mapa
            center: itemData[0].location, // starting position [lng, lat]
            zoom: 16, // Nivel de zoom inicial
            hash: false
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
    }, [selectedItem]);

    return (
        <Grid container columns={12} sx={{ display: 'flex', minHeight: responsive ? 'auto' : '100vh', flexDirection: 'column', ml: responsive ? 3 : 13, mr: responsive ? 3 : 13, mt: responsive ? 2 : 0 }}>
            <Grid size={responsive ? 12 : 6} sx={{ mb: 2, mt: responsive ? 0 : 3 }}>
                <Divider sx={{ fontFamily: 'sans-serif', fontWeight: 700, fontSize: responsive ? '25px' : '33px', color: 'text.primary', width: responsive ? '80%' : '50%', m: 'auto' }}>
                    SEDES
                </Divider>
            </Grid>
            <Grid container size={12}>
                <Grid size={responsive ? 12 : 6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: responsive ? 'auto' : '75vh', gap: responsive ? 4 : 10, mb: responsive ? 3 : 0 }}>
                    {
                        sedes2024.map((sede, index) => (
                            <Box
                                key={sede.id}
                                sx={{
                                    boxShadow: '0px 8px 10px 0px rgba(1,18,38, 0.15)',
                                    borderTopLeftRadius: 10,
                                    borderBottomLeftRadius: 10,
                                    borderTopRightRadius: responsive ? 10 : 0,
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
                                            p: responsive ? 2 : 2.5
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
                                    <Grid size={responsive ? 12 : 6} sx={{ backgroundColor: '#50736c' }}>
                                        <Box sx={{ backgroundColor: 'white', height: '100%', width: '20%', borderBottomRightRadius: '100px' }} />
                                    </Grid>
                                </Grid>
                            </Box>
                        ))
                    }
                </Grid>
                <Grid size={responsive ? 12 : 6} sx={{ backgroundColor: '#50736c', height: '100%', minHeight: 'auto', borderRadius: 3, p: 2, zIndex: 2, boxShadow: '0 8px 10px 0 rgba(1,18,38, 0.15)', }}>
                    <Box sx={{ backgroundColor: 'white', height: responsive ? 'auto' : '74.5vh', p: 2, textAlign: 'center' }}>
                        <Typography
                            key={itemData[0].address}
                            component={motion.div}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            fontSize={responsive ? '17px' : '20px'}
                            color="text.primary"
                            fontWeight={'bold'}
                            mb={2}
                        >
                            {itemData[0].address}
                        </Typography>
                        <Divider sx={{ width: responsive ? '70%' : '50%', ml: 'auto', mr: 'auto', mb: 3 }} />
                        <Box
                            ref={mapContainer}
                            sx={{
                                width: '100%',
                                height: responsive ? '56vh' : '64vh',
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
