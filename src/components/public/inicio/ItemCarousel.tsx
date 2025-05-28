import { Box, Paper, Typography } from '@mui/material'
import { motion } from 'framer-motion';

export const ItemCarousel = (props: any) => {

    return (
        <Paper
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.85, ease: 'easeInOut' }}
            sx={{
                minHeight: '42vh',
                display: 'flex',
                flexDirection: 'row',
                position: 'relative',
                overflow: 'hidden'
            }}>
            <Box component={'img'} src={props.item.img} sx={{ zIndex: 0, position: 'absolute', justifyContent: 'center', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}>
            </Box>
            <Box sx={{ height: { md: '70px', xs: '50px' }, mt: 'auto', ml: { md: '5vh', xs: '2vh' }, zIndex: 2 }}>
                
                <Typography
                    sx={{ fontWeight: 'bold', fontSize: { md: '25px', xs: '18px' }, border: '1px solid white', backgroundColor: 'rgba(255, 255, 255, 0.5)', pl: 4, pr: 4, borderRadius: 3, color: 'secondary.main' }}
                >
                    {props.item.name}
                </Typography>
            </Box>
        </Paper>
    )
}