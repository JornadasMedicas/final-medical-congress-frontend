import { Button, Grid, TextField, Typography, useMediaQuery } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import dayjs from "dayjs";
import { useContext, useState } from "react";
import { PropsCreateEdition } from "../../interfaces/admin/IAdmin";
import { createEdition } from "../../services/admin/adminService";
import { useSnackbar } from 'notistack';
import { PropsUIContext } from "../../interfaces/context/IUIContext";
import UIContext from "../../context/UIContext";

export const Ediciones = () => {
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");
    const { setModalAdminData } = useContext<PropsUIContext>(UIContext);
    const [payload, setPayload] = useState<PropsCreateEdition>({ edicion: dayjs().format('YYYY'), fec_inicial: '', fec_final: '' });
    const [loading, setLoading] = useState<boolean>(false);
    const [isSent, setIsSent] = useState<boolean>(false);
    const { enqueueSnackbar } = useSnackbar();

    const handleClick = async () => {
        setLoading(true);
        setIsSent(true);

        if (payload.fec_inicial !== '' && payload.fec_final !== '') {
            const res: any = await createEdition(payload);

            if (!res.error) {
                enqueueSnackbar('Edición creada correctamente.', { variant: 'success' });
                setModalAdminData({ isOpen: false });
            } else {
                enqueueSnackbar(res.error.response.data.msg, { variant: 'error' });
            }
        }

        setLoading(false);
    }


    return (
        <Grid container sx={{ mt: 2 }} spacing={3}>
            <Grid size={responsive ? 12 : 12}>
                <Typography fontSize={'15px'}>Año</Typography>
                <TextField
                    variant="outlined"
                    size="small"
                    disabled
                    value={payload.edicion}
                    fullWidth
                />
            </Grid>
            <Grid size={responsive ? 12 : 6}>
                <Typography fontSize={'15px'}>Fecha Inicial</Typography>
                <TextField
                    variant="outlined"
                    size="small"
                    value={payload.fec_inicial}
                    onChange={(e) => setPayload({ ...payload, fec_inicial: e.target.value })}
                    fullWidth
                    error={(isSent && payload.fec_inicial === '') && true}
                    helperText={(isSent && payload.fec_inicial === '') && 'Este campo es requerido'}
                    type="date"
                />
            </Grid>
            <Grid size={responsive ? 12 : 6}>
                <Typography fontSize={'15px'}>Fecha Final</Typography>
                <TextField
                    variant="outlined"
                    size="small"
                    value={payload.fec_final}
                    onChange={(e) => setPayload({ ...payload, fec_final: e.target.value })}
                    error={(isSent && payload.fec_final === '') && true}
                    helperText={(isSent && payload.fec_final === '') && 'Este campo es requerido'}
                    fullWidth
                    type="date"
                />
            </Grid>
            <Grid size={12}>
                <Button onClick={handleClick} loading={loading} fullWidth color="success" variant="outlined" startIcon={<AddIcon />}>
                    Agregar
                </Button>
            </Grid>
        </Grid>
    )
}
