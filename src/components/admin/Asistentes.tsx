import { useContext, useEffect, useState } from 'react';
import { Autocomplete, Box, Card, FormControl, Grid, InputLabel, Paper, Select, TableContainer, TextField, Typography, useMediaQuery } from '@mui/material';
import { getAssitants, getAssitantsAutocomplete, getEventEditions, getTotalAssitants } from '../../services/admin/adminService';
import { DataGrid } from '@mui/x-data-grid';
import AsistentesPaginationTable from './AsistentesPaginationTable';
import AdminContext from '../../context/AdminContext';
import { assistantsRows, columns } from '../../helpers/admin/asistantsTable';
import { ReqAssistants, ReqAssistantsAutocomplete, ReqAssistantsAutocompleteInterface, ReqAssistantsTableData, ReqAssistantsTotalCount, ReqEventEditions } from '../../interfaces/admin/IAdmin';
import { modulosFiltros, talleresFiltros } from '../../helpers/admin/data';

export const Asistentes = () => {
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");
    const [tableData, setTableData] = useState<ReqAssistantsTableData>({ rows: [], totalRows: 0, editions: [] });
    const [options, setOptions] = useState<ReqAssistantsAutocompleteInterface[]>([]);
    const { assistantsTable, setAssistantsTableAction } = useContext(AdminContext);

    const handleFilters = (value: string | number) => {
        if (value.toString() === '0') {
            setAssistantsTableAction({ ...assistantsTable, filters: { ...assistantsTable.filters, module: '', workshop: '' } });
        } else if (value.toString().length > 1) {
            setAssistantsTableAction({ ...assistantsTable, filters: { ...assistantsTable.filters, module: value.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase(), workshop: '' } });
        } else {
            setAssistantsTableAction({ ...assistantsTable, filters: { ...assistantsTable.filters, module: '', workshop: value.toString() } });
        }
    }

    const handleEditions = (value: string) => {
        setAssistantsTableAction({ ...assistantsTable, filters: { ...assistantsTable.filters, module: '', year: value } });
    }

    const handleAutoChange = (value: ReqAssistantsAutocompleteInterface | null) => {
        if (value === null) {
            setAssistantsTableAction({ ...assistantsTable, filters: { ...assistantsTable.filters, email: '' } });
        } if (value != null) {
            setAssistantsTableAction({ ...assistantsTable, filters: { ...assistantsTable.filters, email: value.correo } });
        }
    }

    const searchAssistant = async (value: string) => {
        if (value !== '') {
            const asistente: ReqAssistantsAutocomplete = await getAssitantsAutocomplete(value);
            setOptions(asistente.data);
        } else {
            setOptions([]);
        }
    }

    useEffect(() => {
        getAssitants({
            limit: '10',
            page: assistantsTable.tablePage,
            email: assistantsTable.filters.email,
            module: assistantsTable.filters.module,
            workshop: assistantsTable.filters.workshop,
            year: assistantsTable.filters.year
        }).then((res: ReqAssistants) => {
            const row = assistantsRows(res.data);
            setTableData(prev => ({ ...prev, rows: row }));
        });

        getTotalAssitants({
            email: assistantsTable.filters.email,
            module: assistantsTable.filters.module,
            workshop: assistantsTable.filters.workshop,
            year: assistantsTable.filters.year
        }).then((res: ReqAssistantsTotalCount) => {
            setTableData(prev => ({ ...prev, totalRows: res.data }));
            setAssistantsTableAction(prev => ({ ...prev, totalRows: res.data }));
        });

        getEventEditions().then(((res: ReqEventEditions[]) => {
            setTableData(prev => ({ ...prev, editions: res }));
        }));
    }, [assistantsTable.tablePage, assistantsTable.filters.email, assistantsTable.filters.module, assistantsTable.filters.workshop, assistantsTable.filters.year, setAssistantsTableAction]);

    return (
        <Grid container className='animate__animated animate__fadeIn' rowSpacing={3} columns={12} sx={{ display: 'flex', flexDirection: 'row', mt: responsive ? 0 : -4, width: '100%' }}>
            <Grid size={'auto'}>
                <Box sx={{ height: '7vh', width: '100%', mb: -3, pl: 3, pr: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end' }}>
                    <FormControl sx={{ minWidth: 300 }}>
                        <InputLabel
                            htmlFor="grouped-native-select"
                            sx={{
                                '&.Mui-focused': {
                                    color: 'black',
                                },
                                color: 'black'
                            }}
                        >
                            Filtros
                        </InputLabel>
                        <Select
                            variant='outlined'
                            size='small'
                            native
                            defaultValue={0}
                            id="grouped-native-select"
                            onChange={(e) => handleFilters(e.target.value)}
                            label="Filtros"
                            sx={{
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#bd4f2b'
                                }
                            }}>
                            <option value={0}>Todos</option>
                            <optgroup label="MODULOS">
                                {
                                    modulosFiltros.map((item: { id: number, nombre: string }) => (
                                        <option key={item.id} value={item.nombre}>{item.nombre}</option>
                                    ))
                                }
                            </optgroup>
                            <optgroup label="TALLERES">
                                {
                                    talleresFiltros.map((item: { id: number, nombre: string }) => (
                                        <option key={item.id} value={item.id}>{item.nombre}</option>
                                    ))
                                }
                            </optgroup>
                        </Select>
                    </FormControl>
                </Box>
            </Grid>
            <Grid size={'auto'}>
                <Box sx={{ height: '7vh', width: '100%', mb: -3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end' }}>
                    <Autocomplete
                        autoComplete={false}
                        autoHighlight
                        sx={{
                            width: '400px',
                            ml: responsive ? '30px' : '0px',
                        }}
                        getOptionLabel={(option: ReqAssistantsAutocompleteInterface) => option.nombre}
                        includeInputInList
                        filterOptions={(x) => x}
                        filterSelectedOptions
                        onChange={(_e, value) => handleAutoChange(value)}
                        options={options}
                        renderOption={(props, option: ReqAssistantsAutocompleteInterface) => (
                            <Box
                                component='li'
                                sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}
                            >
                                <Grid container spacing={2}>
                                    <Grid size={12}>
                                        <Typography variant='body2'>
                                            {option.nombre} :: {option.correo}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                sx={{
                                    width: responsive ? '80%' : '95%',
                                    mt: 0.5,
                                    "& .MuiInput-underline:after": {
                                        borderBottomColor: "#b7402a"
                                    }
                                }}
                                size='small'
                                variant='standard'
                                autoComplete='off'
                                placeholder='Nombre o correo...'
                                slotProps={{
                                    htmlInput: {
                                        ...params.inputProps,
                                        autoComplete: 'new-password'
                                    }
                                }}
                                onChange={(e) => searchAssistant(e.target.value)}
                            />
                        )}
                    />
                </Box>
            </Grid>
            <Grid size={'grow'} sx={{ height: '7vh', width: '100%', mb: -3, pl: 3, pr: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end' }}>
                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel
                        htmlFor="grouped-native-select"
                        sx={{
                            '&.Mui-focused': {
                                color: 'black',
                            },
                            color: 'black'
                        }}
                    >
                        Edición
                    </InputLabel>
                    <Select
                        variant='outlined'
                        size='small'
                        native
                        value={assistantsTable.filters.year}
                        onChange={(e) => handleEditions(e.target.value)}
                        label="Filtros"
                        sx={{
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#bd4f2b'
                            }
                        }}>
                        {tableData.editions.map(edition => (
                            <option key={edition.edicion} value={edition.edicion}>{edition.edicion}</option>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Card sx={{ width: '100%' }}>
                <Paper sx={{ height: '100%', width: '100%', minHeight: '74vh' }}>
                    <TableContainer sx={{ height: '74vh', width: '100%' }}>
                        <DataGrid
                            sx={{
                                backgroundColor: '#ffffff',
                                border: 2,
                                borderColor: 'darkgray',
                                '& .MuiDataGrid-columnHeaderTitle': {
                                    textOverflow: "clip",
                                    whiteSpace: "break-spaces",
                                    lineHeight: 1.5
                                },
                                "& .MuiDataGrid-cell": {
                                    borderRight: 0,
                                    borderTop: 0
                                },
                                '& .MuiDataGrid-columnHeader': {
                                    borderBottom: 1,
                                    fontWeight: 'bold',
                                    borderColor: 'lightblue',
                                    color: 'primary.main'
                                },
                                '& ::-webkit-scrollbar': {
                                    width: '10px',
                                },
                                '& ::-webkit-scrollbar-track': {
                                    background: '#f1f1f1',
                                },
                                '& ::-webkit-scrollbar-thumb': {
                                    backgroundColor: 'background.default',
                                },
                                '& ::-webkit-scrollbar-thumb:hover': {
                                    background: 'background.default',
                                },
                            }}
                            hideFooterSelectedRowCount
                            rowHeight={70}
                            disableColumnMenu
                            filterMode="server"
                            disableColumnFilter
                            rows={tableData.rows}
                            paginationMode='server'
                            getRowId={(row) => row.id}
                            rowCount={assistantsTable.totalRows}
                            pageSizeOptions={[10]}
                            columns={columns}
                            slots={{ pagination: AsistentesPaginationTable }}
                        />
                    </TableContainer>
                </Paper>
            </Card>
        </Grid>
    )
}
