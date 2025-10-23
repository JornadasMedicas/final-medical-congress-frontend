import { Button, Grid, Stack, styled, Switch, TextField, Typography, useMediaQuery } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import dayjs from "dayjs";
import { useContext, useState } from "react";
import { PropsCreateEdition } from "../../../interfaces/admin/IAdmin";
import { createEdition } from "../../../services/admin/adminService";
import { useSnackbar } from 'notistack';
import { PropsUIContext } from "../../../interfaces/context/IUIContext";
import UIContext from "../../../context/UIContext";

const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 15,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: '#06645d',
                ...theme.applyStyles('dark', {
                    backgroundColor: '#177ddc',
                }),
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 12,
        height: 12,
        borderRadius: 6,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
        ...theme.applyStyles('dark', {
            backgroundColor: 'rgba(255,255,255,.35)',
        }),
    },
}));

export const Ediciones = () => {
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");
    const { setModalAdminData } = useContext<PropsUIContext>(UIContext);
    const [payload, setPayload] = useState<PropsCreateEdition>({ edicion: dayjs().format('YYYY'), fec_inicial: '', fec_final: '', isFree: true });
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

    const handleCheckBox = (value: any) => {
        setPayload(prev => ({ ...prev, isFree: !value }));
    }

    return (
        <Grid container sx={{ mt: 2 }} spacing={3}>
            <Grid size={responsive ? 12 : 6}>
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
                <Typography fontSize={'15px'}>¿Es gratuito?</Typography>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', verticalAlign: 'middle', alignContent: 'center', border: '1px solid rgb(201, 199, 199)', borderRadius: 1, height: '39px' }}>
                    <Typography>Sí</Typography>
                    <AntSwitch onChange={(e) => handleCheckBox(e.target.checked)} />
                    <Typography>No</Typography>
                </Stack>
            </Grid>
            <Grid size={responsive ? 12 : 6}>
                <Typography fontSize={'15px'}>Fecha Inicial</Typography>
                <TextField
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                border: '1px solid green'
                            },
                        },
                    }}
                    variant="outlined"
                    size="small"
                    value={payload.fec_inicial}
                    onChange={(e) => setPayload({ ...payload, fec_inicial: e.target.value })}
                    fullWidth
                    error={(isSent && payload.fec_inicial === '') && true}
                    helperText={(isSent && payload.fec_inicial === '') && 'Campo necesario'}
                    type="date"
                />
            </Grid>
            <Grid size={responsive ? 12 : 6}>
                <Typography fontSize={'15px'}>Fecha Final</Typography>
                <TextField
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                border: '1px solid green'
                            },
                        },
                    }}
                    variant="outlined"
                    size="small"
                    value={payload.fec_final}
                    onChange={(e) => setPayload({ ...payload, fec_final: e.target.value })}
                    slotProps={{ htmlInput: { min: payload.fec_inicial, max: dayjs(payload.fec_inicial).add(2, 'days').format('YYYY-MM-DD') } }}
                    error={(isSent && payload.fec_final === '') && true}
                    helperText={(isSent && payload.fec_final === '') && 'Campo necesario'}
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
