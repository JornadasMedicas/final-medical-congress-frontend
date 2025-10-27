import { Button, FormControl, FormHelperText, Grid, IconButton, Menu, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, useMediaQuery } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { createWorkshop, editWorkshop, getEventEditions, getModules, getWorkshops } from "../../../services/admin/adminService";
import { EditWorkshops, ModuleErrors, PayloadWorkshops, ReqEventEditions, ReqGenCatalogs } from "../../../interfaces/admin/IAdmin";
import { moduleErrors, validateForm } from '../../../helpers/admin/formErrors';
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import { useSnackbar } from "notistack";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import { ModalConfirmDelete } from "./ModalConfirmDelete";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { PropsUIContext } from "../../../interfaces/context/IUIContext";
import UIContext from "../../../context/UIContext";
import CheckIcon from '@mui/icons-material/Check';

dayjs.extend(utc);

const initialState = { nombre: '', fecha: '', cupos: 0, hora_inicio: '', hora_fin: '', modulo: 0, edicion: 0 };

interface Column {
    field: 'acciones' | 'nombre' | 'cupos' | 'fecha' | 'hora_inicio' | 'hora_fin' | 'created_at' | 'updated_at';
    headerName: string;
    headerAlign?: 'left' | 'center';
    align?: string;
    flex: number;
    sortable: boolean;
    format?: (value: number) => string;
    renderCell?: (params: any) => any;
}

const columns: Column[] = [
    { field: 'acciones', headerName: 'Acciones', flex: 1, headerAlign: 'left', align: 'left', sortable: false },
    { field: 'nombre', headerName: 'Taller', flex: 1, headerAlign: 'left', align: 'center', sortable: false },
    { field: 'cupos', headerName: 'Cupos', flex: 1, headerAlign: 'left', align: 'center', sortable: false },
    { field: 'fecha', headerName: 'Fecha', flex: 1, headerAlign: 'left', align: 'center', sortable: false },
    { field: 'hora_inicio', headerName: 'Hora Inicio', flex: 1, headerAlign: 'left', align: 'center', sortable: false },
    { field: 'hora_fin', headerName: 'Hora Fin', flex: 1, headerAlign: 'left', align: 'center', sortable: false },
    { field: 'created_at', headerName: 'Fecha Alta', flex: 1, headerAlign: 'center', align: 'center', sortable: false },
    { field: 'updated_at', headerName: 'Fecha Actualización', flex: 1, headerAlign: 'center', align: 'center', sortable: false }
];

export const Talleres = () => {
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");
    const { setModalConfirmDelete, refetch, setRefetch } = useContext<PropsUIContext>(UIContext);
    const [catModules, setCatModules] = useState<ReqGenCatalogs[]>([]);
    const [catEditions, setCatEditions] = useState<ReqEventEditions[]>([]);
    const [editData, setEditData] = useState<EditWorkshops>({ id: 0, nombre: '', cupos: 0, fecha: '', hora_inicio: '', hora_fin: '' });
    const [rows, setRows] = useState<ReqGenCatalogs[]>([]);
    const [payload, setPayload] = useState<PayloadWorkshops>(initialState);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedRow, setSelectedRow] = useState<ReqGenCatalogs | null>(null);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [errors, setErrors] = useState<ModuleErrors>(moduleErrors);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [editMode, setEditMode] = useState<boolean>(false);
    const open = Boolean(anchorEl);
    const { enqueueSnackbar } = useSnackbar();

    const handleRegistry = async () => {
        const isOk = validateForm(payload, errors, setErrors);

        if (!isOk) return;
        setLoading(true);

        const res = await createWorkshop(payload);

        if (!res.error) {
            enqueueSnackbar('Taller creado correctamente.', { variant: 'success' });
            setPayload(initialState);
            setRefetch(true);
        } else {
            enqueueSnackbar(res.error.response.data.msg, { variant: 'error' });
        }

        setLoading(false);
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, row: ReqGenCatalogs) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(row);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = (row: ReqGenCatalogs | null) => {
        if (!row) return;
        setEditData({ id: row.id, nombre: row.nombre, cupos: row.cupos ? row.cupos : 0, fecha: dayjs.utc(row.fecha).format('YYYY-MM-DD'), hora_inicio: dayjs.utc(row.hora_inicio).format('HH:mm:ss'), hora_fin: dayjs.utc(row.hora_fin).format('HH:mm:ss') });
        setEditMode(true);
        handleClose();
    }

    const handleConfirmDelete = async (row: ReqGenCatalogs | null) => {
        setModalConfirmDelete({ isOpen: true, title: 'Eliminar Taller', width: '400px', description: '¿Está seguro de eliminar el registro?', id: row!.id, deleteType: 'workshop' });
        handleClose();
    }

    const handleSave = async () => {
        const ogItem = rows.find((item) => item.id === editData.id);

        const hasChanges =
            editData.nombre !== ogItem?.nombre ||
            editData.cupos !== ogItem?.cupos ||
            editData.fecha !== dayjs.utc(ogItem?.fecha).format('YYYY-MM-DD') ||
            editData.hora_inicio !== dayjs.utc(ogItem?.hora_inicio).format('HH:mm:ss') ||
            editData.hora_fin !== dayjs.utc(ogItem?.hora_fin).format('HH:mm:ss');

        if (!hasChanges) {
            setEditData({ id: 0, nombre: '', cupos: 0, fecha: '', hora_inicio: '', hora_fin: '' });
            return;
        };

        const res = await editWorkshop({ id: editData.id, nombre: editData.nombre, cupos: editData.cupos, fecha: editData.fecha, hora_inicio: editData.hora_inicio, hora_fin: editData.hora_fin });

        if (!res.error) {
            enqueueSnackbar('Taller editado correctamente.', { variant: 'success' });
            setRefetch(true);
        } else {
            enqueueSnackbar(res.error.response.data.msg, { variant: 'error' });
        }

        setEditData({ id: 0, nombre: '', cupos: 0, fecha: '', hora_inicio: '', hora_fin: '' });
        setEditMode(false);
    };

    const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        getModules().then(((res: ReqGenCatalogs[]) => {
            setCatModules(res);
        }));

        getEventEditions().then(((res: ReqEventEditions[]) => {
            setCatEditions(res);
        }));

        getWorkshops().then(((res: ReqGenCatalogs[]) => {
            setRows(res);
        }));
    }, []);

    useEffect(() => {
        if (refetch) {

            getWorkshops().then(((res: ReqGenCatalogs[]) => {
                setRows(res);
            }));

            setRefetch(false);
        }
    }, [refetch]);

    return (
        <Grid container sx={{ mt: 2 }} spacing={2}>
            <Grid size={responsive ? 12 : 6}>
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
            <Grid size={responsive ? 12 : 3}>
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
                <Typography fontSize={'15px'}>Cupos</Typography>
                <TextField
                    variant="outlined"
                    size="small"
                    value={payload.cupos}
                    onChange={(e) => setPayload({ ...payload, cupos: parseInt(e.target.value) >= 0 ? parseInt(e.target.value) : '' })}
                    fullWidth
                    type="number"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                border: '1px solid green'
                            },
                        },
                    }}
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
                <Button onClick={handleRegistry} loading={loading} fullWidth color="inherit" variant="outlined" startIcon={<AddIcon />}>
                    Agregar
                </Button>
            </Grid>
            <Grid size={12}>
                <TableContainer component={Paper} sx={{ boxShadow: '0 8px 25px 0 rgba(1,18,38, 0.15)' }}>
                    <Table size="small">
                        <TableHead
                            sx={{
                                "& .MuiTableCell-head": {
                                    color: "white",
                                    backgroundColor: "background.default"
                                }
                            }}>
                            <TableRow>
                                {columns.map((col) => {
                                    return <TableCell key={col.headerName} align={col.headerAlign}>{col.headerName}</TableCell>
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody
                            sx={{
                                "& .MuiTableCell-body": {
                                    color: "secondary.main"
                                },
                            }}
                        >
                            {
                                rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <TableRow
                                            key={row.id}
                                        >
                                            {
                                                editMode && row.id === editData.id ?
                                                    <TableCell sx={{ display: 'flex', justifyContent: 'center' }}>
                                                        <IconButton onClick={handleSave} aria-label="Guardar" sx={{ color: 'primary.main', backgroundColor: '#006758', ":hover": { color: 'primary.main', backgroundColor: '#005b4d' }, width: '35px', height: '35px' }}>
                                                            <CheckIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                    :
                                                    <TableCell>
                                                        <Button
                                                            color={'inherit'}
                                                            aria-controls={open ? 'basic-menu' : undefined}
                                                            aria-haspopup="true"
                                                            aria-expanded={open ? 'true' : undefined}
                                                            onClick={(e) => { handleClick(e, row) }}
                                                        >
                                                            <MenuSharpIcon />
                                                        </Button>
                                                        <Menu
                                                            key={row.id}
                                                            id="basic-menu"
                                                            anchorEl={anchorEl}
                                                            open={open}
                                                            onClose={handleClose}
                                                            slotProps={{
                                                                list: {
                                                                    'aria-labelledby': 'basic-button',
                                                                },
                                                                paper: {
                                                                    sx: {
                                                                        boxShadow: '0px 0px 3px rgba(0,0,0,0.05)', // Más suave
                                                                    },
                                                                }
                                                            }}
                                                        >
                                                            <MenuItem onClick={() => handleEdit(selectedRow)}>
                                                                <EditIcon sx={{ mr: 1 }} />
                                                                Editar
                                                            </MenuItem>
                                                            <MenuItem onClick={() => handleConfirmDelete(selectedRow)}>
                                                                <DeleteIcon sx={{ mr: 1 }} />
                                                                Eliminar
                                                            </MenuItem>
                                                        </Menu>
                                                    </TableCell>
                                            }
                                            <TableCell sx={{ fontSize: 15, maxWidth: '13vw' }}>
                                                {editData.id === row.id ?
                                                    <TextField
                                                        variant="standard"
                                                        value={editData.nombre}
                                                        onChange={(e) => setEditData({ ...editData, nombre: e.target.value.toUpperCase() })}
                                                        size="small"
                                                        sx={{
                                                            '& .MuiInputBase-root:after': {
                                                                borderBottom: '2px solid green', // Línea inferior cuando está enfocado
                                                            },
                                                            '& .MuiInputLabel-root.Mui-focused': {
                                                                color: 'green', // Color del label cuando está enfocado
                                                            },
                                                            width: '200px'
                                                        }}
                                                    />
                                                    :
                                                    <Typography fontSize={15}>{row.nombre}</Typography>
                                                }
                                            </TableCell>
                                            <TableCell align="center">
                                                {editData.id === row.id ?
                                                    <TextField
                                                        variant="standard"
                                                        value={editData.cupos}
                                                        onChange={(e) => setEditData({ ...editData, cupos: parseInt(e.target.value) >= 0 ? parseInt(e.target.value) : '' })}
                                                        size="small"
                                                        type="number"
                                                        sx={{
                                                            '& .MuiInputBase-root:after': {
                                                                borderBottom: '2px solid green', // Línea inferior cuando está enfocado
                                                            },
                                                            '& .MuiInputLabel-root.Mui-focused': {
                                                                color: 'green', // Color del label cuando está enfocado
                                                            },
                                                            width: '80px'
                                                        }}
                                                    />
                                                    :
                                                    <Typography fontSize={15}>{row.cupos}</Typography>
                                                }
                                            </TableCell>
                                            <TableCell align="center">
                                                {
                                                    editData.id === row.id ?
                                                        <TextField
                                                            variant="standard"
                                                            value={editData.fecha}
                                                            onChange={(e) => setEditData({ ...editData, fecha: e.target.value })}
                                                            size="small"
                                                            type="date"
                                                            sx={{
                                                                '& .MuiInputBase-root:after': {
                                                                    borderBottom: '2px solid green', // Línea inferior cuando está enfocado
                                                                },
                                                                '& .MuiInputLabel-root.Mui-focused': {
                                                                    color: 'green', // Color del label cuando está enfocado
                                                                },
                                                                width: 'auto'
                                                            }}
                                                        />
                                                        :
                                                        <Typography fontSize={15}>{dayjs.utc(row.fecha).format('YYYY-MM-DD')}</Typography>
                                                }
                                            </TableCell>
                                            <TableCell align="center">
                                                {
                                                    editData.id === row.id ?
                                                        <TextField
                                                            variant="standard"
                                                            value={editData.hora_inicio}
                                                            onChange={(e) => setEditData({ ...editData, hora_inicio: e.target.value })}
                                                            size="small"
                                                            type="time"
                                                            sx={{
                                                                '& .MuiInputBase-root:after': {
                                                                    borderBottom: '2px solid green', // Línea inferior cuando está enfocado
                                                                },
                                                                '& .MuiInputLabel-root.Mui-focused': {
                                                                    color: 'green', // Color del label cuando está enfocado
                                                                },
                                                                width: 'auto'
                                                            }}
                                                        />
                                                        :
                                                        <Typography fontSize={15}>{dayjs.utc(row.hora_inicio).format('HH:mm:ss')}
                                                        </Typography>
                                                }
                                            </TableCell>
                                            <TableCell align="center">
                                                {
                                                    editData.id === row.id ?
                                                        <TextField
                                                            variant="standard"
                                                            value={editData.hora_fin}
                                                            onChange={(e) => setEditData({ ...editData, hora_fin: e.target.value })}
                                                            size="small"
                                                            type="time"
                                                            sx={{
                                                                '& .MuiInputBase-root:after': {
                                                                    borderBottom: '2px solid green', // Línea inferior cuando está enfocado
                                                                },
                                                                '& .MuiInputLabel-root.Mui-focused': {
                                                                    color: 'green', // Color del label cuando está enfocado
                                                                },
                                                                width: 'auto'
                                                            }}
                                                        />
                                                        :
                                                        <Typography fontSize={15}>{dayjs.utc(row.hora_fin).format('HH:mm:ss')}</Typography>
                                                }
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography fontSize={15}>{dayjs.utc(row.created_at).format('YYYY-MM-DD HH:mm:ss')}</Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography fontSize={15}>{dayjs.utc(row.updated_at).format('YYYY-MM-DD HH:mm:ss')}</Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    sx={{ backgroundColor: 'primary.main' }}
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(e, page) => handleChangePage(e, page)}
                    onRowsPerPageChange={(e) => handleChangeRowsPerPage(e)}
                />
            </Grid>
            <ModalConfirmDelete />
        </Grid>
    )
}
