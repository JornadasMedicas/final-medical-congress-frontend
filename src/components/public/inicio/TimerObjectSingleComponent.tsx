import { Box, Typography, useMediaQuery } from "@mui/material"
import { motion } from "motion/react";

export const TimerObjectSingleComponent = ({ type, title }: any) => {
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");

    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: 'easeInOut', delay: 1 }}
            viewport={{ once: true }}
            sx={{ width: responsive ? 'auto' : '130px', height: responsive ? '100px' : '130px', backgroundColor: 'text.secondary', borderRadius: responsive ? '10px' : 20, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', boxShadow: 3, p: 0.5 }}>
            <Typography sx={{ color: 'background.default', fontWeight: 'bold', fontSize: 40 }}>{type.toString().padStart(2, '0')}</Typography>
            <Typography sx={{ color: 'background.default' }}>{title}</Typography>
        </Box>
    )
}
