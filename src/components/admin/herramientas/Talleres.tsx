import { Button, FormControl, FormHelperText, Grid, MenuItem, Select, TextField, Typography, useMediaQuery } from "@mui/material"
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { getEventEditions, getModules } from "../../../services/admin/adminService";
import { ModuleErrors, PayloadWorkshops, ReqEventEditions, ReqGenCatalogs } from "../../../interfaces/admin/IAdmin";
import { moduleErrors, validateForm } from '../../../helpers/admin/formErrors';

export const Talleres = () => {
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");
    const [catModules, setCatModules] = useState<ReqGenCatalogs[]>([]);
    const [catEditions, setCatEditions] = useState<ReqEventEditions[]>([]);
    const [payload, setPayload] = useState<PayloadWorkshops>({ nombre: '', fecha: '', hora_inicio: '', hora_fin: '', modulo: 0, edicion: 0 });
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<ModuleErrors>(moduleErrors);

    const handleClick = () => {
        /* setLoading(true); */
        const isOk = validateForm(payload, errors, setErrors);


        if (!isOk) return;

        /* setLoading(false); */
    }

    useEffect(() => {
        getModules().then(((res: ReqGenCatalogs[]) => {
            setCatModules(res);
        }));

        getEventEditions().then(((res: ReqEventEditions[]) => {
            setCatEditions(res);
        }));
    }, []);

    return (
        <Grid container sx={{ mt: 2 }} spacing={2}>
            <Grid size={responsive ? 12 : 7}>
                <Typography fontSize={'15px'}>Nombre</Typography>
                <TextField
                    variant="outlined"
                    size="small"
                    value={payload.nombre.toUpperCase()}
                    onChange={(e) => setPayload({ ...payload, nombre: e.target.value })}
                    fullWidth
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                border: '1px solid green'
                            },
                        },
                    }}
                    error={(errors.nombre && payload.nombre === '') && true}
                    helperText={(errors.nombre && payload.nombre === '') && "Campo necesario"}
                />
            </Grid>
            <Grid size={responsive ? 12 : 5}>
                <Typography fontSize={'15px'}>Fecha</Typography>
                <TextField
                    variant="outlined"
                    size="small"
                    value={payload.fecha}
                    onChange={(e) => setPayload({ ...payload, fecha: e.target.value })}
                    fullWidth
                    type="date"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                border: '1px solid green'
                            },
                        },
                    }}
                    error={(errors.fecha && payload.fecha === '') && true}
                    helperText={(errors.fecha && payload.fecha === '') && "Campo necesario"}
                />
            </Grid>
            <Grid size={responsive ? 12 : 3}>
                <Typography fontSize={'15px'}>Hora Inicio</Typography>
                <TextField
                    variant="outlined"
                    size="small"
                    value={payload.hora_inicio}
                    onChange={(e) => setPayload({ ...payload, hora_inicio: e.target.value })}
                    fullWidth
                    type="time"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                border: '1px solid green'
                            },
                        },
                    }}
                    error={(errors.hora_inicio && payload.hora_inicio === '') && true}
                    helperText={(errors.hora_inicio && payload.hora_inicio === '') && "Campo necesario"}
                />
            </Grid>
            <Grid size={responsive ? 12 : 3}>
                <Typography fontSize={'15px'}>Hora Fin</Typography>
                <TextField
                    variant="outlined"
                    size="small"
                    value={payload.hora_fin}
                    onChange={(e) => setPayload({ ...payload, hora_fin: e.target.value })}
                    fullWidth
                    type="time"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                border: '1px solid green'
                            },
                        },
                    }}
                    error={(errors.hora_fin && payload.hora_fin === '') && true}
                    helperText={(errors.hora_fin && payload.hora_fin === '') && "Campo necesario"}
                />
            </Grid>
            <Grid size={responsive ? 12 : 3}>
                <Typography fontSize={'15px'}>Modulo</Typography>
                <FormControl fullWidth>
                    <Select
                        fullWidth
                        size="small"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={payload.modulo}
                        sx={{
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                border: '1px solid green', // borde al enfocar
                            },
                        }}
                        onChange={(e) => setPayload({ ...payload, modulo: e.target.value })}
                        error={(errors.modulo && payload.modulo === 0) && true}
                    >
                        {
                            catModules.map((module: ReqGenCatalogs) => <MenuItem value={module.id}>{module.nombre}</MenuItem>)
                        }
                    </Select>
                    {
                        (errors.modulo && payload.modulo === 0) &&
                        <FormHelperText sx={{ color: '#c34d52' }}>Campo necesario</FormHelperText>
                    }
                </FormControl>
            </Grid>
            <Grid size={responsive ? 12 : 3}>
                <Typography fontSize={'15px'}>Edicion</Typography>
                <FormControl fullWidth>
                    <Select
                        fullWidth
                        size="small"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={payload.edicion}
                        sx={{
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                border: '1px solid green', // borde al enfocar
                            },
                        }}
                        onChange={(e) => setPayload({ ...payload, edicion: e.target.value })}
                        error={(errors.edicion && payload.edicion === 0) && true}
                    >
                        {
                            catEditions.map(edition => <MenuItem value={edition.id}>{edition.edicion}</MenuItem>)
                        }
                    </Select>
                    {
                        (errors.edicion && payload.edicion === 0) &&
                        <FormHelperText sx={{ color: '#c34d52' }}>Campo necesario</FormHelperText>
                    }
                </FormControl>
            </Grid>
            <Grid size={12}>
                <Button onClick={handleClick} loading={loading} fullWidth color="success" variant="outlined" startIcon={<AddIcon />}>
                    Agregar
                </Button>
            </Grid>
        </Grid>
    )
}
