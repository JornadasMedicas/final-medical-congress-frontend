import { Box, Button, Card, CardActions, CardContent, Chip, Grid, LinearProgress, Stack, Typography, useMediaQuery } from "@mui/material"
import { PropsAdminToolCards, ReqCountCatalogs, ReqEventEditions } from "../../../interfaces/admin/IAdmin"
import MedicalInformationTwoToneIcon from '@mui/icons-material/MedicalInformationTwoTone';
import VaccinesTwoToneIcon from '@mui/icons-material/VaccinesTwoTone';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import CategoryIcon from '@mui/icons-material/Category';
import DraftsTwoToneIcon from '@mui/icons-material/DraftsTwoTone';
import { useContext, useEffect, useState } from "react";
import { getCountCatalogs } from "../../../services/admin/adminService";
import { Modal } from "../../ui/Modal";
import { PropsUIContext } from "../../../interfaces/context/IUIContext";
import UIContext from "../../../context/UIContext";
import { Ediciones } from "./Ediciones";
import { Modulos } from "./Modulos";
import { Talleres } from "./Talleres";
import { Categorias } from "./Categorias";

export const Herramientas = ({ editions }: { editions: ReqEventEditions[] }) => {
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");
    const [catalogs, setCatalogs] = useState<ReqCountCatalogs>({ ediciones: 0, modulos: 0, talleres: 0, categorias: 0, constancias: 0 });
    const { setModalAdminData } = useContext<PropsUIContext>(UIContext);

    const items: PropsAdminToolCards[] = [
        {
            id: 0,
            Icon: LocalActivityIcon,
            title: 'Ediciones',
            description: 'Crear nueva edición del programa',
            label: 'Ediciones Activas',
            registries: catalogs.ediciones,
            Cmp: Ediciones,
            width: '600px'
        },
        {
            id: 1,
            Icon: MedicalInformationTwoToneIcon,
            title: 'Módulos',
            description: 'Agregar, editar y eliminar módulos del programa',
            label: 'Módulos Activos',
            registries: catalogs.modulos,
            Cmp: Modulos,
            width: '800px'
        },
        {
            id: 2,
            Icon: VaccinesTwoToneIcon,
            title: 'Talleres',
            description: 'Agregar talleres del programa',
            label: 'Talleres Activos',
            registries: catalogs.talleres,
            Cmp: Talleres,
            width: '650px'
        },
        {
            id: 3,
            Icon: CategoryIcon,
            title: 'Categorias',
            description: 'Agregar, editar y eliminar categorias del programa',
            label: 'Categorias Activas',
            registries: catalogs.categorias,
            Cmp: Categorias,
            width: '800px'
        },
        {
            id: 4,
            Icon: DraftsTwoToneIcon,
            title: 'Constancias',
            description: 'Enviar constancias de participación',
            label: 'Constancias Enviadas',
            registries: 0,
            Cmp: Ediciones,
            width: '1000px'
        }
    ]

    useEffect(() => {
        getCountCatalogs().then((data: ReqCountCatalogs) => {
            setCatalogs(data);
        });

    }, []);

    const handleOpenModal = (item: PropsAdminToolCards) => {
        setModalAdminData({ isOpen: true, Component: item.Cmp, title: item.title, Icon: item.Icon, description: item.description, width: item.width });
    }

    return (
        <>
            {
                editions.length === 0 ?
                    <LinearProgress color='inherit' sx={{ width: '100%', color: 'text.secondary', position: 'absolute', top: 0 }} />
                    :
                    <Stack direction={'column'} sx={{ width: '100%', height: '100%' }}>
                        <Grid container className='animate__animated animate__fadeIn' spacing={responsive ? 5 : 3} columns={12} sx={{ width: '100%', height: '100%', p: responsive ? 2 : 2, display: 'flex' }}>
                            {
                                items.map((item) => (
                                    <Grid key={item.id} size={responsive ? 12 : 3}>
                                        <Card sx={{ height: '200px', p: 0, width: '100%', transition: 'all 0.3s ease', ':hover': { boxShadow: '0px 5px 12px 1px rgba(1,18,38, 0.1)' } }}>
                                            <CardContent sx={{ height: '30%', display: 'flex', m: 0, p: 2 }}>
                                                <Box sx={{ flexGrow: 1 }}>
                                                    <item.Icon sx={{ width: '42px', height: '42px', color: 'background.default' }} />
                                                </Box>
                                                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'end' }}>
                                                    <Chip label={`${item.registries} ${item.label}`} />
                                                </Box>
                                            </CardContent>
                                            <CardContent sx={{ height: '30%', display: 'flex', m: 0, p: 2 }}>
                                                <Box sx={{ width: '100%' }}>
                                                    <Typography fontWeight={'bold'} fontSize={'16px'} color="background.default">{item.title}</Typography>
                                                    <Typography fontSize={'14px'}>{item.description}</Typography>
                                                </Box>
                                            </CardContent>
                                            <CardActions sx={{ height: '40%' }}>
                                                <Button onClick={() => handleOpenModal(item)} sx={{ m: 'auto', width: '95%' }} size="small" variant="outlined" color="success">Gestionar</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))
                            }
                            <Modal />
                        </Grid>
                    </Stack>
            }
        </>
    )
}
