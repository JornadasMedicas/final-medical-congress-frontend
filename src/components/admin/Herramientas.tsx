import { Box, Button, Card, CardActions, CardContent, Chip, Grid, LinearProgress, Stack, Typography, useMediaQuery } from "@mui/material"
import { ReqCountCatalogs, ReqEventEditions } from "../../interfaces/admin/IAdmin"
import MedicalInformationTwoToneIcon from '@mui/icons-material/MedicalInformationTwoTone';
import VaccinesTwoToneIcon from '@mui/icons-material/VaccinesTwoTone';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import CategoryIcon from '@mui/icons-material/Category';
import DraftsTwoToneIcon from '@mui/icons-material/DraftsTwoTone';
import { useEffect, useState } from "react";
import { getCountCatalogs } from "../../services/admin/adminService";

export const Herramientas = ({ editions }: { editions: ReqEventEditions[] }) => {
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");
    const [catalogs, setCatalogs] = useState<ReqCountCatalogs>({ ediciones: 0, modulos: 0, talleres: 0, categorias: 0 });

    useEffect(() => {
        getCountCatalogs().then((data: ReqCountCatalogs) => {
            setCatalogs(data);
        });

    }, []);

    return (
        <>
            {
                editions.length === 0 ?
                    <LinearProgress color='inherit' sx={{ width: '100%', color: 'text.secondary', position: 'absolute', top: 0 }} />
                    :
                    <Stack direction={'column'} sx={{ width: '100%', height: '100%' }}>
                        <Grid container className='animate__animated animate__fadeIn' spacing={responsive ? 5 : 3} columns={12} sx={{ width: '100%', height: '100%', p: responsive ? 2 : 2, display: 'flex' }}>
                            <Grid size={responsive ? 12 : 3}>
                                <Card sx={{ height: '200px', p: 0, width: '100%', transition: 'all 0.3s ease', ':hover': { boxShadow: '0px 5px 12px 1px rgba(1,18,38, 0.1)' } }}>
                                    <CardContent sx={{ height: '30%', display: 'flex', m: 0, p: 2 }}>
                                        <Box sx={{ flexGrow: 1 }}>
                                            <LocalActivityIcon sx={{ width: '45px', height: '45px', color: 'background.default' }} />
                                        </Box>
                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'end' }}>
                                            <Chip label={`${catalogs.ediciones} Ediciones Activas`} />
                                        </Box>
                                    </CardContent>
                                    <CardContent sx={{ height: '30%', display: 'flex', m: 0, p: 2 }}>
                                        <Box sx={{ width: '100%' }}>
                                            <Typography fontWeight={'bold'} fontSize={'16px'} color="background.default">Ediciones</Typography>
                                            <Typography fontSize={'14px'}>Crear nueva edición del programa.</Typography>
                                        </Box>
                                    </CardContent>
                                    <CardActions sx={{ height: '40%' }}>
                                        <Button sx={{ m: 'auto', width: '95%' }} size="small" variant="outlined" color="success">Gestionar</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid size={responsive ? 12 : 3}>
                                <Card sx={{ height: '200px', p: 0, width: '100%', transition: 'all 0.3s ease', ':hover': { boxShadow: '0px 5px 12px 1px rgba(1,18,38, 0.1)' } }}>
                                    <CardContent sx={{ height: '30%', display: 'flex', m: 0, p: 2 }}>
                                        <Box sx={{ flexGrow: 1 }}>
                                            <MedicalInformationTwoToneIcon sx={{ width: '45px', height: '45px', color: 'background.default' }} />
                                        </Box>
                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'end' }}>
                                            <Chip label={`${catalogs.modulos} Módulos Activos`} />
                                        </Box>
                                    </CardContent>
                                    <CardContent sx={{ height: '30%', display: 'flex', m: 0, p: 2 }}>
                                        <Box sx={{ width: '100%' }}>
                                            <Typography fontWeight={'bold'} fontSize={'16px'} color="background.default">Módulos</Typography>
                                            <Typography fontSize={'14px'}>Agregar y editar módulos del programa.</Typography>
                                        </Box>
                                    </CardContent>
                                    <CardActions sx={{ height: '40%' }}>
                                        <Button sx={{ m: 'auto', width: '95%' }} size="small" variant="outlined" color="success">Gestionar</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid size={responsive ? 12 : 3}>
                                <Card sx={{ height: '200px', p: 0, width: '100%', transition: 'all 0.3s ease', ':hover': { boxShadow: '0px 5px 12px 1px rgba(1,18,38, 0.1)' } }}>
                                    <CardContent sx={{ height: '30%', display: 'flex', m: 0, p: 2 }}>
                                        <Box sx={{ flexGrow: 1 }}>
                                            <VaccinesTwoToneIcon sx={{ width: '45px', height: '45px', color: 'background.default' }} />
                                        </Box>
                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'end' }}>
                                            <Chip label={`${catalogs.talleres} Talleres Activos`} />
                                        </Box>
                                    </CardContent>
                                    <CardContent sx={{ height: '30%', display: 'flex', m: 0, p: 2 }}>
                                        <Box sx={{ width: '100%' }}>
                                            <Typography fontWeight={'bold'} fontSize={'16px'} color="background.default">Talleres</Typography>
                                            <Typography fontSize={'14px'}>Agregar y editar talleres del programa.</Typography>
                                        </Box>
                                    </CardContent>
                                    <CardActions sx={{ height: '40%' }}>
                                        <Button sx={{ m: 'auto', width: '95%' }} size="small" variant="outlined" color="success">Gestionar</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid size={responsive ? 12 : 3}>
                                <Card sx={{ height: '200px', p: 0, width: '100%', transition: 'all 0.3s ease', ':hover': { boxShadow: '0px 5px 12px 1px rgba(1,18,38, 0.1)' } }}>
                                    <CardContent sx={{ height: '30%', display: 'flex', m: 0, p: 2 }}>
                                        <Box sx={{ flexGrow: 1 }}>
                                            <CategoryIcon sx={{ width: '45px', height: '45px', color: 'background.default' }} />
                                        </Box>
                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'end' }}>
                                            <Chip label={`${catalogs.categorias} Categorias Activas`} />
                                        </Box>
                                    </CardContent>
                                    <CardContent sx={{ height: '30%', display: 'flex', m: 0, p: 2 }}>
                                        <Box sx={{ width: '100%' }}>
                                            <Typography fontWeight={'bold'} fontSize={'16px'} color="background.default">Categorias</Typography>
                                            <Typography fontSize={'14px'}>Agregar y editar categorias del programa.</Typography>
                                        </Box>
                                    </CardContent>
                                    <CardActions sx={{ height: '40%' }}>
                                        <Button sx={{ m: 'auto', width: '95%' }} size="small" variant="outlined" color="success">Gestionar</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid size={responsive ? 12 : 3}>
                                <Card sx={{ height: '200px', p: 0, width: '100%', transition: 'all 0.3s ease', ':hover': { boxShadow: '0px 5px 12px 1px rgba(1,18,38, 0.1)' } }}>
                                    <CardContent sx={{ height: '30%', display: 'flex', m: 0, p: 2 }}>
                                        <Box>
                                            <DraftsTwoToneIcon sx={{ width: '45px', height: '45px', color: 'background.default' }} />
                                        </Box>
                                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'end' }}>
                                            <Chip label="0 Constancias Enviadas" />
                                        </Box>
                                    </CardContent>
                                    <CardContent sx={{ height: '30%', display: 'flex', m: 0, p: 2 }}>
                                        <Box sx={{ width: '100%' }}>
                                            <Typography fontWeight={'bold'} fontSize={'16px'} color="background.default">Constancias</Typography>
                                            <Typography fontSize={'14px'}>Enviar constancias de participación.</Typography>
                                        </Box>
                                    </CardContent>
                                    <CardActions sx={{ height: '40%' }}>
                                        <Button sx={{ m: 'auto', width: '95%' }} size="small" variant="outlined" color="success">Gestionar</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grid>
                    </Stack>
            }
        </>
    )
}
