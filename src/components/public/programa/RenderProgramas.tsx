import { Box, Button, Divider, Typography, useMediaQuery } from "@mui/material";
import { useContext, useState } from "react";
import { PropsUIContext } from "../../../interfaces/context/IUIContext";
import UIContext from "../../../context/UIContext";
import { Masonry } from "@mui/lab";
import { PropsIProgramas } from "../../../interfaces/programas/IProgramas";
import { motion } from "motion/react";
import DownloadIcon from '@mui/icons-material/Download';

export const RenderProgramas = ({ programas }: PropsIProgramas) => {
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");
    const { setModalProgramData } = useContext<PropsUIContext>(UIContext);
    const [buttonLoading, setButtonLoading] = useState<string | null>(null);

    const onDownload = (doc: string, id: string) => {
        setButtonLoading(id);
        const link = document.createElement("a");
        link.download = `JORNADAS.pdf`;
        link.href = doc;
        link.target = '_blank'
        link.click();
        link.remove();

        const timer = setTimeout(() => {
            setButtonLoading(null);
        }, 1000);

        return () => clearTimeout(timer);
    };

    const handleClickOpen = (img: string) => {
        setModalProgramData({ isOpen: true, img });
    };

    return (
        <>
            <Masonry columns={responsive ? 1 : 3} spacing={responsive ? 2 : 5} sx={{ width: '100%', margin: 'auto' }}>
                {
                    programas.map((item, index) => (
                        <Box
                            key={item.buttonText}
                            component={motion.div}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            }}
                        >
                            <Typography sx={{ m: 'auto', fontFamily: 'sans-serif', fontSize: '20px', fontWeight: 700, color: 'background.default', textAlign: 'center' }}>
                                {item.title}
                            </Typography>
                            <Box component={'img'} src={item.img} loading='lazy' alt={item.altImgText} sx={{ cursor: 'pointer', transition: 'transform 0.3s ease', filter: 'drop-shadow(0px 0px 5px grey)', ':hover': { transform: 'scale(1.03)', transition: 'transform 0.3s ease' } }} onClick={() => handleClickOpen(item.img)}>
                            </Box>
                            {
                                item.onDowload &&
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button loading={buttonLoading === item.buttonText} onClick={() => onDownload(item.onDowload, item.buttonText)} variant="contained" endIcon={<DownloadIcon />} sx={{ backgroundColor: 'background.default', color: 'primary.main', ":hover": { backgroundColor: 'primary.main', color: 'background.default' }, width: responsive ? '100%' : '100%' }}>
                                        {item.buttonText}
                                    </Button>
                                </Box>
                            }
                            {
                                (responsive && index !== programas.indexOf(programas[programas.length - 1])) && <Divider sx={{ width: '50%', m: 'auto', mt: 1, mb: 1, border: 'ridge' }} />
                            }
                        </Box>
                    ))
                }
            </Masonry>
        </>
    )
}
