import { Box, Paper, Typography, useMediaQuery } from '@mui/material'
import { motion } from 'framer-motion';
import { memo } from 'react';
import { PropsItemCarousel } from '../../../interfaces/inicio/IInicio';

export const ItemCarousel = memo((props: PropsItemCarousel) => {
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");

    return (
        <Paper
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.85, ease: 'easeInOut' }}
            sx={{
                minHeight: responsive ? '42vh' : '62vh',
                display: 'flex',
                flexDirection: 'row',
                position: 'relative',
                overflow: 'hidden',
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '100%',
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))',
                    zIndex: 2,
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                }
            }}>
            <Box loading='eager' component={'img'} src={props.item.img} sx={{ zIndex: 0, position: 'absolute', justifyContent: 'center', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}>
            </Box>
            <Typography
                fontFamily={'sans-serif'}
                fontWeight={'bold'}
                position={'absolute'}
                top="50%"
                left="50%"
                fontSize={responsive ? 27 : 43}
                zIndex={3}
                color='primary.main'
                sx={{
                    transform: 'translate(-50%, -50%)',
                    width: '100%'
                }}
            >
                <b style={{ color: '#d6bf9b' }}>¡</b>BIENVENIDOS A LAS JORNADAS MÉDICAS<b style={{ color: '#d6bf9b' }}>!</b>
            </Typography>
            <Box sx={{ width: responsive ? '50%' : '20%', height: '5px', background: 'linear-gradient(90deg,rgb(255, 247, 243) 0%, #d6bf9b 100%)', m: 'auto', position: 'absolute', top: responsive ? '27vh' : '35vh', left: '50%', transform: 'translate(-50%, -50%)' }} />
            <Box sx={{ height: { md: '70px', xs: '50px' }, mt: 'auto', ml: { md: '5vh', xs: '2vh' }, zIndex: 3 }}>
                <Typography
                    sx={{ fontWeight: 'bold', fontSize: { md: '25px', xs: '18px' }, border: '1px solid white', backgroundColor: 'rgba(255, 255, 255, 0.5)', pl: 4, pr: 4, borderRadius: 3, color: 'primary.main' }}
                >
                    {props.item.name}
                </Typography>
            </Box>
        </Paper>
    )
});