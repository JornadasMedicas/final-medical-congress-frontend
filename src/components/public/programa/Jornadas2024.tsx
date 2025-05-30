import Masonry from '@mui/lab/Masonry';
import { Box, Button, useMediaQuery } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const programa2024 = [
    {
        img: 'https://i.imgur.com/8eLVUG2.png',
        onDowload: 'https://www.dropbox.com/scl/fi/m8xo31q9vfdgdcla1ihka/DIPTICO-ENFERMERIA-2024.pdf?rlkey=ao69g7sxvlrz6mol85p09992l&st=2zgq9t1f&dl=1',
        buttonText: 'DESCARGAR DÍPTICO ENFERMERÍA ORIGINAL',
        altImgText: 'Díptico Enfermería 2024'
    },
    {
        img: 'https://i.imgur.com/IVWviwM.png',
        onDowload: 'https://www.dropbox.com/scl/fi/xyac2z7i83hgqu9w22bk2/DIPTICO-Odontolog-a-2024.pdf?rlkey=tmvrvoppx2oc1xvx2u8dgwjdc&st=fvw01poa&dl=1',
        buttonText: 'DESCARGAR DÍPTICO ESTOMATOLOGÍA ORIGINAL',
        altImgText: 'Díptico Estomatología 2024'
    },
    {
        img: 'https://i.imgur.com/OlCBqGK.png',
        onDowload: 'https://www.dropbox.com/scl/fi/0svpr11lp88r2651f78ro/tiptico-de-medicina-final.pdf?rlkey=05zm5r2el0cs8gjc9fib1ula3&st=wcprlloj&dl=1',
        buttonText: 'DESCARGAR DÍPTICO MEDICINA ORIGINAL',
        altImgText: 'Díptico Medicina 2024'
    },
    {
        img: 'https://i.imgur.com/19fuVyp.png',
        onDowload: 'https://www.dropbox.com/scl/fi/1ek86jcy0vesgl5yghesu/DIPTICO-quimicos-2024.pdf?rlkey=z6a26dbqe9swmvm94ep8x2i7z&st=g22x1umu&dl=1',
        buttonText: 'DESCARGAR DÍPTICO QUÍMICOS ORIGINAL',
        altImgText: 'Díptico Químicos 2024'
    },
    {
        img: 'https://i.imgur.com/EUrzWZO.jpeg',
        onDowload: 'https://www.dropbox.com/scl/fi/x3a9f4a1qm8gq5beqdo8v/talleres-quimicos-sin-QR.pdf?rlkey=rxnslvenqn8esvgsifdw2vw2h&st=pxd9hsmq&dl=1',
        buttonText: 'DESCARGAR PÓSTER TALLER QUÍMICOS ORIGINAL',
        altImgText: 'Póster Taller Químicos 2024'
    },
    {
        img: 'https://i.imgur.com/26SjVDN.png',
        onDowload: 'https://www.dropbox.com/scl/fi/htvnqvo109ljxsk6g4dly/talleres-de-medicina-sin-QR.pdf?rlkey=7ap19coy2kkcon3qgpaqqyzjh&st=d48538am&dl=1',
        buttonText: 'DESCARGAR PÓSTER TALLER MEDICINA ORIGINAL',
        altImgText: 'Póster Taller Medicina 2024'
    }
]

export const Jornadas2024 = () => {
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");

    const onDownload = (_e: any, doc: string) => {
        const link = document.createElement("a");
        link.download = `JORNADAS.pdf`;
        link.href = doc;
        link.click();
    };

    return (
        <Masonry columns={responsive ? 1 : 3} spacing={responsive ? 2 : 5} sx={{ width: '100%', margin: 'auto' }}>
            {
                programa2024.map((item) => (
                    <Box key={item.buttonText} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box sx={{ cursor: 'pointer' }}>
                            <img loading='lazy' alt={item.altImgText} style={{ transition: 'all 0.3s ease', filter: 'drop-shadow(0px 0px 5px grey)', width: '100%', height: 'auto' }} src={item.img} />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button onClick={(e) => onDownload(e, item.onDowload)} variant="contained" endIcon={<DownloadIcon />} sx={{ backgroundColor: 'background.default', color: 'primary.main', ":hover": { backgroundColor: 'primary.main', color: 'background.default' }, width: responsive ? '100%' : '100%' }}>
                                {item.buttonText}
                            </Button>
                        </Box>
                    </Box>
                ))
            }
        </Masonry>
    )
}
