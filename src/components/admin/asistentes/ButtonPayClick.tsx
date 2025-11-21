import { Box, Button, Chip, Dialog, DialogActions, DialogContent, Divider, IconButton, TextField, Tooltip } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { getReason, putPaymentStatus, putScholarshipReason } from "../../../services/admin/adminService";
import Swal from "sweetalert2";
import AdminContext from "../../../context/AdminContext";
import SaveIcon from '@mui/icons-material/Save';
import { useSnackbar } from "notistack";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

export const ButtonPayClick = ({ params }: any) => {
    const [pagado, setPagado] = useState<number>(params.row.pagado);
    const { printableIds, setPrintableIds } = useContext(AdminContext);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [razonBeca, setRazonBeca] = useState<string>('');
    const { enqueueSnackbar } = useSnackbar();

    const handleClick = () => {
        if ((pagado + 1) % 3 === 0) {
            setPagado(0);
        } else {
            setPagado(pagado + 1);
        }

        if (pagado === 0) {
            setIsOpen(true);
        }
    }

    useEffect(() => {
        putPaymentStatus(pagado, params.row.id).then((res: any) => {
            if (res.error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: 'No se ha podido procesar su solicitud. Intente más tarde',
                    confirmButtonColor: '#d37c6b'
                });
            } else {
                setPagado(pagado);
            }

        }).catch((err) => {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: 'No se ha podido procesar su solicitud. Intente más tarde',
                confirmButtonColor: '#d37c6b'
            });
        });

        if (pagado === 2) {
            if (!printableIds.includes(params.row.id)) {
                setPrintableIds([...printableIds, params.row.id]);
            }
        } else {
            setPrintableIds(printableIds.filter((id) => id !== params.row.id));
        }

        params.row.pagado = pagado;

        if (pagado === 1) {
            getReason(params.row.id).then((res: any) => {
                if (res.error) {
                    enqueueSnackbar(res.error, { variant: 'error' });
                } else {
                    setRazonBeca(res.razon_beca === null ? '' : res.razon_beca);
                }

            }).catch((err) => {
                enqueueSnackbar(err, { variant: 'error' });
            });
        }

    }, [pagado]);

    const handleSave = () => {
        if (razonBeca === '') {
            return;
        }

        putScholarshipReason(params.row.id, razonBeca).then((res: any) => {
            if (res.error) {
                enqueueSnackbar(res.error.response.data.msg, { variant: 'error' });
            } else {
                enqueueSnackbar('Guardado exitosamente.', { variant: 'success' });
                setIsOpen(false)
            }

        }).catch((err) => {
            console.error(err);
            enqueueSnackbar('No se ha podido procesar su solicitud. Intente más tarde.', { variant: 'error' });
        });
    }

    return (
        <>
            {
                pagado === 0 &&
                <Chip label="No Pagado" color="error" sx={{ boxShadow: '0 2px 5px 2px rgba(0, 0, 0, 0.3)', transition: 'all 1s ease', ':hover': { cursor: 'pointer' }, width: '50%' }} onClick={handleClick} disabled={params.row.costo === 'N/A' ? true : false} />
            }
            {
                pagado === 1 &&
                <Box sx={{ pl: 4 }}>
                    <Chip label="Becado" color="info" sx={{ boxShadow: '0 2px 5px 2px rgba(0, 0, 0, 0.3)', transition: 'all 1s ease', ':hover': { cursor: 'pointer' }, width: '50%' }} onClick={handleClick} />
                    <Tooltip title={'Editar'} placement="right">
                        <IconButton sx={{ ml: 1 }} onClick={() => setIsOpen(true)}>
                            <RemoveRedEyeIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            }
            {
                pagado === 2 &&
                <Chip label="Pagado" color="success" sx={{ boxShadow: '0 2px 5px 2px rgba(0, 0, 0, 0.3)', transition: 'all 1s ease', ':hover': { cursor: 'pointer' }, width: '50%' }} onClick={handleClick} />
            }
            <Dialog open={isOpen}>
                <Divider sx={{ width: '95%', m: 'auto' }} />
                <DialogContent sx={{ m: 2, p: 1, mb: 0 }}>
                    <TextField
                        label='A razón de:'
                        size="small"
                        fullWidth
                        autoComplete='off'
                        value={razonBeca}
                        sx={{
                            '& .MuiOutlinedInput-root.Mui-focused': {
                                '& fieldset': {
                                    borderColor: 'text.secondary', // Cambia el color del borde
                                }
                            },
                            "& label": {
                                color: 'text.primary'
                            },
                            "& label.Mui-focused": {
                                color: 'black'
                            }
                        }}
                        onChange={(e) => setRazonBeca(e.target.value.toUpperCase())}
                    />
                </DialogContent>
                <DialogActions sx={{ width: '470px' }}>
                    <Button onClick={() => setIsOpen(false)} variant="contained" sx={{ backgroundColor: 'background.default', color: 'primary.main' }}>
                        Cerrar
                    </Button>
                    <Tooltip title={'Guardar'} placement="right">
                        <IconButton onClick={handleSave} sx={{ backgroundColor: 'text.primary', width: '50px', height: '50px', color: 'white', ':hover': { backgroundColor: 'rgb(158, 94, 57)' } }}>
                            <SaveIcon />
                        </IconButton>
                    </Tooltip>
                </DialogActions>
            </Dialog>
        </>
    )
}
