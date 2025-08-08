import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack, Typography } from "@mui/material"
import { useContext, useState } from "react";
import { PropsUIContext } from "../../../interfaces/context/IUIContext";
import UIContext from "../../../context/UIContext";
import { deleteCategory, deleteModule, deleteWorkshop } from "../../../services/admin/adminService";
import { useSnackbar } from "notistack";

export const ModalConfirmDelete = () => {
    const { modalConfirmDelete, setModalConfirmDelete, setRefetch } = useContext<PropsUIContext>(UIContext);
    const [loading, setLoading] = useState<boolean>(false);
    const { enqueueSnackbar } = useSnackbar();

    const handleClose = () => {
        setModalConfirmDelete({ isOpen: false });
    }

    const handleDelete = async () => {
        let res: any = {};

        if (modalConfirmDelete.id !== undefined) {
            setLoading(true);
            switch (modalConfirmDelete.deleteType) {
                case 'category':
                    res = await deleteCategory(modalConfirmDelete.id);
                    if (!res.error) {
                        enqueueSnackbar('Categoría eliminada correctamente', { variant: 'success' });
                        setModalConfirmDelete({ isOpen: false });
                        setRefetch(true);
                    } else {
                        enqueueSnackbar(res.error.response.data.msg, { variant: 'error' });
                    }
                    break;

                case 'module':
                    res = await deleteModule(modalConfirmDelete.id);

                    if (!res.error) {
                        enqueueSnackbar('Módulo eliminado correctamente.', { variant: 'success' });
                        setModalConfirmDelete({ isOpen: false });
                        setRefetch(true);
                    } else {
                        enqueueSnackbar(res.error.response.data.msg, { variant: 'error' });
                    }
                    break;

                case 'workshop':
                    res = await deleteWorkshop(modalConfirmDelete.id);

                    if (!res.error) {
                        enqueueSnackbar('Taller eliminado correctamente.', { variant: 'success' });
                        setModalConfirmDelete({ isOpen: false });
                        setRefetch(true);
                    } else {
                        enqueueSnackbar(res.error.response.data.msg, { variant: 'error' });
                    }
                    break;

                default:
                    break;
            }

            setLoading(false);
        }
    }

    return (
        <Dialog
            open={modalConfirmDelete.isOpen}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            slotProps={{
                paper: {
                    sx: {
                        width: modalConfirmDelete.width,
                        height: 'auto',
                        maxWidth: 'none',
                    },
                }
            }}
        >
            <Stack sx={{ p: 2 }}>
                <DialogTitle id="responsive-dialog-title" sx={{ p: 0, m: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'left', gap: 0.5, flexDirection: 'column' }}>
                        <Typography fontSize={'16px'} fontWeight={'bold'}>{modalConfirmDelete.title}</Typography>
                        <Divider sx={{ borderColor: 'black', width: '100%' }} />
                    </Box>
                </DialogTitle>
                <DialogContent sx={{ p: 0, m: 0 }}>
                    <Typography fontSize={'16px'} sx={{ color: 'gray', textAlign: 'center', mt: 3, mb: 3 }}>{modalConfirmDelete.description}</Typography>
                </DialogContent>
                <DialogActions sx={{ p: 0, m: 0 }}>
                    <Button loading={loading} onClick={handleDelete} size="small" variant="outlined" color="success">
                        Confirmar
                    </Button>
                    <Button onClick={handleClose} size="small" variant="outlined" color="error">
                        Cerrar
                    </Button>
                </DialogActions>
            </Stack>
        </Dialog>
    )
}

