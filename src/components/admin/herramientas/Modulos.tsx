import { Button, Grid, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useMediaQuery } from "@mui/material"
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import { createModule, deleteModule, editModule, getModules } from "../../../services/admin/adminService";
import { ReqGenCatalogs } from "../../../interfaces/admin/IAdmin";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";

interface Column {
    field: 'acciones' | 'nombre' | 'created_at' | 'updated_at';
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
    { field: 'nombre', headerName: 'Módulo', flex: 1, headerAlign: 'left', align: 'center', sortable: false },
    {
        field: 'created_at',
        headerName: 'Fecha Alta',
        flex: 2,
        headerAlign: 'center',
        align: 'center',
        sortable: false
    },
    {
        field: 'updated_at', headerName: 'Fecha Actualización', flex: 1, headerAlign: 'center', align: 'center', sortable: false
    }
];

export const Modulos = () => {
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");
    const [rows, setRows] = useState<ReqGenCatalogs[]>([]);
    const [selectedRow, setSelectedRow] = useState<ReqGenCatalogs | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [editData, setEditData] = useState<{ id: number, nombre: string }>({ id: 0, nombre: '' });
    const [payload, setPayload] = useState<string>('');
    const [isSent, setIsSent] = useState<boolean>(false);
    const open = Boolean(anchorEl);
    const { enqueueSnackbar } = useSnackbar();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, row: ReqGenCatalogs) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(row);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = (row: ReqGenCatalogs | null) => {
        if (!row) return;
        setEditData({ id: row.id, nombre: row.nombre });
        handleClose();
    }

    const handleConfirmDelete = async (row: ReqGenCatalogs | null) => {
        const res = await deleteModule(row!.id);

        if (!res.error) {
            enqueueSnackbar('Módulo eliminado correctamente.', { variant: 'success' });
        } else {
            enqueueSnackbar(res.error.response.data.msg, { variant: 'error' });
        }

        handleClose();
    }

    const handleSave = async () => {
        if (editData.nombre === rows.filter((item) => item.id === editData.id)[0].nombre) {
            setEditData({ id: 0, nombre: '' });
            return;
        };

        const res = await editModule({ id: editData.id, nombre: editData.nombre.charAt(0).toUpperCase() + editData.nombre.slice(1).toLowerCase() });

        if (!res.error) {
            enqueueSnackbar('Módulo editado correctamente.', { variant: 'success' });
        } else {
            enqueueSnackbar(res.error.response.data.msg, { variant: 'error' });
        }

        setEditData({ id: 0, nombre: '' });
    };

    const handleRegistry = async () => {
        setIsSent(true);

        if (payload === '') return;

        const res = await createModule(payload.charAt(0).toUpperCase() + payload.slice(1).toLowerCase());

        if (!res.error) {
            enqueueSnackbar('Módulo creado correctamente.', { variant: 'success' });
            setPayload('');
            setIsSent(false);
        } else {
            enqueueSnackbar(res.error.response.data.msg, { variant: 'error' });
        }
    }

    useEffect(() => {
        getModules().then(((res: ReqGenCatalogs[]) => {
            setRows(res);
        }));
    }, []);

    return (
        <Grid container sx={{ mt: 2 }} spacing={2}>
            <Grid size={12} sx={{ display: 'flex', flexDirection: responsive ? 'column' : 'row', justifyContent: 'end', gap: 2 }}>
                <TextField
                    variant="standard"
                    value={payload}
                    placeholder="Nombre del Módulo..."
                    onChange={(e) => setPayload(e.target.value)}
                    size="small"
                    sx={{
                        '& .MuiInputBase-root:after': {
                            borderBottom: '2px solid green', // Línea inferior cuando está enfocado
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: 'green', // Color del label cuando está enfocado
                        },
                    }}
                    onBlur={handleSave}
                    error={(isSent && payload === '') && true}
                    helperText={(isSent && payload === '') && 'Este campo es necesario'}
                />
                <Button onClick={handleRegistry} sx={{ width: 'auto' }} size="small" variant="outlined" color="success">+ Añadir</Button>
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
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                >
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
                                    <TableCell sx={{ fontSize: 15, maxWidth: '13vw' }}>
                                        {editData.id === row.id ?
                                            <TextField
                                                variant="standard"
                                                value={editData.nombre}
                                                onChange={(e) => setEditData({ ...editData, nombre: e.target.value })}
                                                size="small"
                                                sx={{
                                                    '& .MuiInputBase-root:after': {
                                                        borderBottom: '2px solid green', // Línea inferior cuando está enfocado
                                                    },
                                                    '& .MuiInputLabel-root.Mui-focused': {
                                                        color: 'green', // Color del label cuando está enfocado
                                                    },
                                                }}
                                                onBlur={handleSave}
                                            />
                                            :
                                            <Typography fontSize={15}>{row.nombre}</Typography>
                                        }
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography fontSize={15}>{dayjs(row.created_at).format('YYYY-MM-DD HH:mm:ss')}</Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography fontSize={15}>{dayjs(row.updated_at).format('YYYY-MM-DD HH:mm:ss')}</Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}
