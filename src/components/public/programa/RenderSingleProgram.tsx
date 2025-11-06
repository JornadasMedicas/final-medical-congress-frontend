import { Box, Button, useMediaQuery } from "@mui/material";
import { useContext, useState } from "react";
import { PropsUIContext } from "../../../interfaces/context/IUIContext";
import UIContext from "../../../context/UIContext";
import { motion } from "motion/react";
import DownloadIcon from '@mui/icons-material/Download';

export const RenderSingleProgram = ({ image, url }: any) => {
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");
    const { setModalProgramData } = useContext<PropsUIContext>(UIContext);
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);

    const onDownload = () => {
        setButtonLoading(true);

        window.open(`${import.meta.env.VITE_APP_BASE_ROUTE}/programas/2025/${url}`, '_blank');

        const timer = setTimeout(() => {
            setButtonLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    };

    const handleClickOpen = (img: string) => {
        setModalProgramData({ isOpen: true, img });
    };

    return (
        <>
            <Box
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    mb: responsive ? 4 : 7
                }}
            >
                <Box component={'img'} src={image} width={responsive ? '100%' : image.includes('MEDICOS') ? '65%' : '55%'} height={'auto'} loading='lazy' sx={{ cursor: 'pointer', transition: 'transform 0.3s ease', filter: 'drop-shadow(0px 0px 5px grey)', ':hover': { transform: 'scale(1.03)', transition: 'transform 0.3s ease' }, m: 'auto' }} onClick={() => handleClickOpen(image)}>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', width: responsive ? '100%' : '40%', m: 'auto' }}>
                    <Button loading={buttonLoading} onClick={() => onDownload()} variant="contained" endIcon={<DownloadIcon />} sx={{ backgroundColor: 'background.default', color: 'primary.main', ":hover": { backgroundColor: 'primary.main', color: 'background.default' }, width: responsive ? '100%' : '100%' }}>
                        Descargar
                    </Button>
                </Box>
            </Box>
        </>
    )
}
