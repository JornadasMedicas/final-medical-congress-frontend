import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material"
import { useContext } from "react";
import { PropsUIContext } from "../../interfaces/context/IUIContext";
import UIContext from "../../context/UIContext";

export const Modal = () => {
    const { modalAdminData, setModalAdminData } = useContext<PropsUIContext>(UIContext);
    const { Icon } = modalAdminData;


    const handleClose = () => {
        setModalAdminData({ isOpen: false });
    }

    return (
        <Dialog
            open={modalAdminData.isOpen}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            slotProps={{
                paper: {
                    sx: {
                        width: modalAdminData.width, // Set desired width
                        height: 'auto', // Set desired height (optional)
                        maxWidth: 'none', // Prevent default maxWidth
                    },
                }
            }}
        >
            <Stack sx={{ p: 2 }}>
                <DialogTitle id="responsive-dialog-title" sx={{ p: 0, m: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {modalAdminData?.Icon && <Icon sx={{ width: '23px', height: '23px', color: 'background.default' }} />}
                        <Typography fontSize={'20px'}>{modalAdminData.title}</Typography>
                    </Box>
                </DialogTitle>
                <DialogContent sx={{ p: 0, m: 0 }}>
                    <Typography fontSize={'14px'} sx={{ color: 'gray' }}>{modalAdminData.description}</Typography>
                    {modalAdminData?.Component && <modalAdminData.Component />}
                </DialogContent>
                <DialogActions sx={{ p: 0, m: 0 }}>
                    {/* <Button onClick={handleClose} size="small" variant="outlined" color="success" autoFocus>
                        Cerrar
                    </Button> */}
                </DialogActions>
            </Stack>
        </Dialog>
    )
}
