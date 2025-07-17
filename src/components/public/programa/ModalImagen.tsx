import { Dialog, DialogContent } from "@mui/material"
import { useContext } from "react";
import UIContext from "../../../context/UIContext";
import { PropsUIContext } from "../../../interfaces/context/IUIContext";

export const ModalImagen = () => {
    const { modalProgramData, setModalProgramData } = useContext<PropsUIContext>(UIContext);

    const handleClose = () => {
        setModalProgramData({ isOpen: false, img: '' });
    }

    return (
        <>
            <Dialog
                open={modalProgramData.isOpen}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                fullWidth={true}
                maxWidth='lg'
                scroll="body"
                slotProps={{ paper: { sx: { boxShadow: 'none', background: 'transparent', p: 0, m: 0 } } }}
                sx={{ backdropFilter: 'blur(5px)' }}
            >
                <DialogContent>
                    <img loading='lazy' alt={'algo'} style={{ transition: 'all 0.3s ease', filter: 'drop-shadow(0px 0px 5px grey)', width: '100%', height: '100%' }} src={modalProgramData.img} />
                </DialogContent>
            </Dialog>
        </>
    )
}
