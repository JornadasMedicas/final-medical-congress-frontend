import { Box, Stack, useMediaQuery } from '@mui/material'
import { useEffect, useState } from 'react';
import { ItemCarousel } from './ItemCarousel';

const items = [
    {
        name: "Medicina",
        img: `${import.meta.env.VITE_APP_BASE_ROUTE}/carousel/carousel1.jpeg`
    },
    {
        name: "Enfermería",
        img: `${import.meta.env.VITE_APP_BASE_ROUTE}/carousel/carousel3.jpeg`
    },
    {
        name: "Químicos",
        img: `${import.meta.env.VITE_APP_BASE_ROUTE}/carousel/carousel2.jpeg`
    },
    {
        name: "Estomatología",
        img: `${import.meta.env.VITE_APP_BASE_ROUTE}/carousel/carousel4.jpeg`
    }
]

export const Carousel = () => {
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");
    const [activeItem, setActiveItem] = useState<number>(0);

    const handleClick = (index: number) => {
        setActiveItem(index);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveItem((prevActiveItem) => (prevActiveItem + 1) % items.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [activeItem]);

    return (
        <Stack>
            <Box
                sx={{
                    width: '100%',
                    minHeight: responsive ? '44vh' : '62vh', //42
                    position: 'relative'
                }}
            >
                {items.map((item: { name: string, img: string }, index: number) => (
                    <Box
                        key={item.name}
                        sx={{
                            position: 'absolute',
                            width: '100%',
                            opacity: index === activeItem ? 1 : 0,
                            transition: 'opacity 1s ease-in-out',
                            willChange: 'opacity',
                            pointerEvents: index === activeItem ? 'auto' : 'none'
                        }}
                    >
                        <ItemCarousel item={item} />
                    </Box>
                ))}
            </Box>
            <Box gap={3} sx={{ display: 'flex', justifyContent: 'center', width: '100%', minHeight: responsive ? '2.5vh' : '3vh', alignItems: 'center', mt: responsive ? 0 : 2, mb: responsive ? 1 : 0 }}>
                {items.map((item: { name: string, img: string }, index: number) => (
                    <Box
                        key={item.name}
                        onClick={() => handleClick(index)}
                        sx={{ backgroundColor: index === activeItem ? 'rgba(84, 14, 38, 1)' : 'rgba(84, 14, 38, 0.3)', width: '13px', height: '13px', borderRadius: 10, transition: 'background 1s ease', '&:hover': { cursor: 'pointer' } }} />
                ))}
            </Box>
        </Stack>
    )
}