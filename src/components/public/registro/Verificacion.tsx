import { Autocomplete, Box, Button, Card, Checkbox, Grid, ListItemText, MenuItem, Stack, TextField, Typography, useMediaQuery } from "@mui/material";
import { navBarHeigth, navBarHeigthResponsive } from "../../../pages/HomePage";
import { motion } from "motion/react";
import MedicalServicesTwoToneIcon from '@mui/icons-material/MedicalServicesTwoTone';
import AddTaskIcon from '@mui/icons-material/AddTask';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { ReqEventEditions, ReqGenCatalogs } from "../../../interfaces/admin/IAdmin";
import { CompletePreRegistration, EventsValuesInterface, PropsTalleresInterface } from "../../../interfaces/registro/IRegistForm";
import { initValuesFormCompletePreRegistration, initValuesFormJornadasErrors } from "../../../helpers/registro/initValues";
import _ from "lodash";
import { getEventEditions, getModules, getWorkshops } from "../../../services/admin/adminService";
import { formatWorkshops } from "../../../helpers/registro/formatWorkshops";
import Swal from "sweetalert2";
import { SocketContext } from "../../../context/SocketContext";
import { validateEventsOnly } from "../../../helpers/registro/validateRegistForm";
import { completePreRegistration, sendVerify } from "../../../services/registro/registroService";
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import { regexMailPre } from "../../../helpers/registro/regex";

const Verificacion = () => {
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");
    const [catalogs, setCatalogs] = useState<{ modules: ReqGenCatalogs[], workshops: ReqGenCatalogs[], editions: ReqEventEditions[] }>({ modules: [], workshops: [], editions: [] });
    const [payload, setPayload] = useState<CompletePreRegistration>(initValuesFormCompletePreRegistration);
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<number[]>([]);
    const [isPreRegistered, setIsPreRegistered] = useState<boolean>(false);
    const groupedWorkshops = _.groupBy(catalogs.workshops, 'jrn_modulo.nombre');
    const [errors, setErrors] = useState<EventsValuesInterface>(initValuesFormJornadasErrors);
    const [emailError, setEmailError] = useState(false);
    const { socket } = useContext(SocketContext);

    const handleSubmit = async () => {
        const { isOk, errors } = validateEventsOnly(payload);

        if (!isOk) {
            setErrors(errors);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Verifica los campos e intenta de nuevo',
            });
            return;
        }

        setLoading(true);

        try {
            const recaptchaToken = await window.grecaptcha.execute(import.meta.env.VITE_APP_SITE_KEY, { action: 'submit' });

            const res = await completePreRegistration({ ...payload, correo: email.trim() }, recaptchaToken);

            if (res.data) {
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    html: 'Gracias por completar su registro. <hr><b>En breve recibirá un correo electrónico con su pase de entrada (código QR) junto con las indicaciones posteriores.<b>',
                    confirmButtonColor: '#d3c19b'
                });

                socket?.emit('isValidRegistry', payload);
                setSelectedItem([]);
                setPayload({ ...initValuesFormCompletePreRegistration, edicion: catalogs.editions[0].id });
            } else if (res.error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: res.error.response ? res.error.response.data.msg : 'No se ha podido procesar su solicitud. Intente más tarde',
                    showConfirmButton: true,
                    confirmButtonColor: '#d37c6b'
                });
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: 'No se ha podido procesar su solicitud. Intente más tarde',
                confirmButtonColor: '#d37c6b'
            });
        } finally {
            setErrors(initValuesFormJornadasErrors);
            setLoading(false);
        }
    }

    const handleVerify = async () => {
        if (email === '') {
            setEmailError(true);
            return;
        }

        setLoading(true);
        try {
            const res = await sendVerify(email);

            if (res.ok) {
                setIsPreRegistered(true);
            } else if (res.error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: res.error.response ? res.error.response.data.msg : 'No se ha podido procesar su solicitud. Intente más tarde',
                    showConfirmButton: true,
                    confirmButtonColor: '#d37c6b'
                });
            }
        } catch (err) {
            console.log(err)
            Swal.fire({
                icon: "error",
                title: "Error",
                text: 'No se ha podido procesar su solicitud. Intente más tarde',
                confirmButtonColor: '#d37c6b'
            });
        } finally {
            setLoading(false);
        }
    }

    const handleModuleSelect = (id: number | null) => {
        const selectedModule = catalogs.modules.find(mod => mod ? mod.id === id : null);

        if (selectedModule?.cupos === 0 && payload.modulo === selectedModule.id) {
            setPayload(prevPayload => ({ ...prevPayload, modulo: 0 }));
        } else {
            setPayload({ ...payload, modulo: id });
        }

    }

    const handleCheckboxes = (isChecked: boolean, workshop: ReqGenCatalogs) => {
        const formatWorkshop: PropsTalleresInterface = {
            asistio: false,
            constancia_enviada: false,
            id_taller: workshop.id,
            nombre: workshop.nombre
        }

        if (isChecked) {
            setPayload({ ...payload, talleres: [...(payload.talleres || []), formatWorkshop] });
            setSelectedItem([...selectedItem, workshop.id]);
        } else {
            setPayload(prevPayload => ({
                ...prevPayload,
                talleres: (prevPayload.talleres || []).filter(
                    (taller) => taller.id_taller !== workshop.id
                )
            }));

            setSelectedItem(selectedItem.filter((id: number) => id != workshop.id));
        }
    }

    useEffect(() => {
        getModules().then(((res: ReqGenCatalogs[]) => {
            setCatalogs(prev => ({ ...prev, modules: res }));
        }));

        getWorkshops().then(((res: ReqGenCatalogs[]) => {
            const data = formatWorkshops(res);
            setCatalogs(prev => ({ ...prev, workshops: data }));
        }));

        getEventEditions().then(((res: ReqEventEditions[]) => {
            setCatalogs(prev => ({ ...prev, editions: res }));
        }));
    }, []);

    useEffect(() => {

        socket?.on('updateCounters', (data: { modules: ReqGenCatalogs[], workshops: ReqGenCatalogs[] }) => {
            if (data.modules.length !== 0) {
                setCatalogs(prev => ({ ...prev, modules: data.modules }));
            }

            if (data.workshops.length !== 0) {
                const processedWorkshops = formatWorkshops(data.workshops);
                setCatalogs(prev => ({ ...prev, workshops: processedWorkshops }));
            }
        });

    }, [socket]);

    useEffect(() => {
        const currentYear: string = dayjs.utc().format('YYYY');
        const currentEdition: ReqEventEditions[] = catalogs.editions.filter((edition: ReqEventEditions) => edition.edicion === currentYear);

        setPayload({ ...payload, edicion: currentEdition[0]?.id });
    }, [catalogs.editions]);

    //limpiar talleres del payload en cada cliente que quede seleccionado al acabarse los cupos
    useEffect(() => {

        catalogs.workshops.map((workshop) => {
            if (workshop.cupos === 0) {
                handleCheckboxes(false, workshop);
            }
        });

    }, [catalogs.workshops]);

    //limpiar modulo del payload en cada cliente que quede seleccionado al acabarse los cupos
    useEffect(() => {

        catalogs.modules.map((mod) => {
            if (mod.cupos === 0 && payload.modulo === mod.id) {
                handleModuleSelect(mod.id);
            }

        });

    }, [catalogs.modules]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            {
                isPreRegistered ?
                    <Stack sx={{ pt: responsive ? `${navBarHeigthResponsive}px` : `${navBarHeigth}px`, mt: 3, mb: 4 }}>
                        <Grid
                            container
                            component={motion.div}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: 'easeOut' }}
                            viewport={{ once: true }}
                            sx={{
                                width: responsive ? '95%' : '850px',
                                m: 'auto',
                                borderRadius: 5,
                                boxShadow: '0 7px 10px 3px rgba(1,18,38, 0.1)',
                                gap: 0
                            }}
                        >
                            <Grid size={12} sx={{ height: '15%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(90deg, rgb(116, 160, 152) 0%, rgb(75, 114, 107) 48%, rgba(19, 50, 44, 1) 100%);', borderTopLeftRadius: 18, borderTopRightRadius: 15, pt: 4, pb: 4, flexDirection: 'column' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                                    <AddTaskIcon sx={{ width: 'auto', height: '30px', color: 'white' }} />
                                    <Typography sx={{ color: 'primary.main', fontWeight: 'bold', fontSize: responsive ? '23px' : '23px' }}>FINALIZAR REGISTRO</Typography>
                                </Box>
                            </Grid>
                            <Grid container sx={{ width: '100%', p: responsive ? 3 : 4 }} spacing={3}>
                                <Grid size={12}>
                                    <Box sx={{ display: 'flex', mb: 0, gap: 0.7 }}>
                                        <MedicalServicesTwoToneIcon sx={{ width: 'auto', height: '23px', color: 'background.default' }} />
                                        <Typography sx={{ fontSize: '18px', fontWeight: 'bold', color: 'text.primary' }}>Módulos</Typography>
                                    </Box>
                                    <Box sx={{ mb: 2 }}>
                                        {/* <Typography sx={{ fontSize: '17px', textAlign: 'justify' }}>Seleccione el módulo al que desea asistir.</Typography> */}
                                        <Typography sx={{ fontSize: '17px', textAlign: 'justify' }}>Seleccione los eventos a los que desea asistir. Debe elegir al menos un módulo o taller.</Typography>
                                    </Box>
                                    <Box sx={{ mb: 3 }}>
                                        <Autocomplete
                                            id='select-modulo'
                                            options={catalogs.modules}
                                            getOptionLabel={option => option.nombre}
                                            value={catalogs.modules.find(modulo => modulo.id === payload.modulo) || null}
                                            onChange={(_e, value) => handleModuleSelect(value ? value.id : null)}
                                            sx={{ backgroundColor: 'primary.main' }}
                                            renderOption={(props, option) => {
                                                const { key, ...rest } = props;
                                                return (
                                                    <MenuItem key={key} {...rest} disabled={option.cupos === 0} sx={{ backgroundColor: 'primary.main' }}>
                                                        <ListItemText primary={option.nombre} />
                                                        {
                                                            option.cupos !== 0 ?
                                                                <Typography sx={{ color: 'gray' }}>{option.cupos} cupos disponibles</Typography>
                                                                :
                                                                option.costo !== 0 ? <Typography sx={{ color: '#c53933', fontWeight: 'bold' }}>cupos agotados</Typography> : <Typography sx={{ color: '#c53933', fontWeight: 'bold' }}>No Disponible</Typography>
                                                        }
                                                    </MenuItem>
                                                )
                                            }}
                                            renderInput={params => (
                                                <TextField
                                                    {...params}
                                                    label='Módulo al que asiste'
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
                                                        },
                                                        backgroundColor: 'primary.main'
                                                    }}
                                                    error={errors.modulo.error}
                                                    helperText={errors.modulo.error ? errors.modulo.msg : ''}
                                                />
                                            )}
                                        />
                                    </Box>
                                    <Box sx={{ display: 'flex', mb: 1, gap: 0.7 }}>
                                        <HomeRepairServiceIcon sx={{ width: 'auto', height: '23px', color: 'background.default' }} />
                                        <Typography sx={{ fontSize: '18px', fontWeight: 'bold', color: 'text.primary' }}>Talleres</Typography>
                                    </Box>
                                    {Object.entries(groupedWorkshops).map(([categoria, workshops], index: number) => (
                                        <Card
                                            key={categoria}
                                            sx={{
                                                borderTop: `4px solid ${workshops[0].borderStyle}`,
                                                borderRadius: 3,
                                                mb: index === Object.entries(groupedWorkshops).length - 1 ? 0 : 3,
                                                paddingBottom: 2,
                                                backgroundColor: 'primary.main'
                                            }}
                                        >
                                            <legend style={{ margin: 'auto', fontSize: responsive ? 24 : 25, paddingLeft: '1rem', paddingRight: '1rem', marginTop: '8px', marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>
                                                {categoria}
                                            </legend>

                                            {workshops.map((workshop) => (
                                                <Grid
                                                    key={workshop.id}
                                                    sx={{ textAlign: 'left', paddingLeft: '20px' }}
                                                >
                                                    <Box sx={{ display: 'flex' }}>
                                                        <Checkbox
                                                            sx={{ '&.Mui-checked': { color: '#2a7dd3' } }}
                                                            disabled={workshop.cupos === 0}
                                                            checked={workshop.cupos !== 0 && selectedItem.includes(workshop.id)}
                                                            onChange={(e) => handleCheckboxes(e.target.checked, workshop)}
                                                        />
                                                        <Typography sx={{ mt: 1.2 }}>
                                                            <b>{dayjs.utc(workshop.fecha).format('DD')} de {dayjs(workshop.fecha).format('MMMM')}</b> ─ {workshop.nombre}
                                                            <span style={{ color: workshop.cupos !== 0 ? 'gray' : '#c53933', fontWeight: workshop.cupos !== 0 ? 'normal' : 'bold' }}>
                                                                {workshop.cupos !== 0 ?
                                                                    ` (${workshop.cupos} cupos disponibles)`
                                                                    :
                                                                    ` (cupos agotados)`
                                                                }
                                                            </span>
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                            ))}
                                        </Card>
                                    ))}
                                </Grid>
                                <Grid size={12} textAlign={'center'}>
                                    <Button loading={loading} variant='contained' onClick={handleSubmit} sx={{ backgroundColor: "text.secondary", ":hover": { backgroundColor: '#b09a6b' }, color: 'primary.main' }}>
                                        Enviar
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Stack>
                    :
                    <Grid container sx={{ pt: responsive ? `${navBarHeigthResponsive}px` : `${navBarHeigth}px`, mt: 3, mb: 3 }}>
                        <Grid size={12} sx={{ height: '80.9vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Box sx={{ maxWidth: responsive ? '95%' : '40%', width: '100%', boxShadow: '0 8px 10px 0 rgba(1,18,38, 0.15)', borderRadius: '20px' }}>
                                <Grid size={12} sx={{ height: '15%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(90deg, rgba(83,115,109,1) 0%, rgba(19,50,44,1) 48%, rgba(36,70,63,1) 100%);', borderTopLeftRadius: 18, borderTopRightRadius: 18, pt: 3, pb: 3 }}>
                                    <ForwardToInboxIcon sx={{ width: 'auto', height: '60px', color: 'white' }} />
                                </Grid>
                                <Grid size={12} sx={{ p: responsive ? 3 : 5, height: '85%', display: 'flex', flexDirection: 'column', gap: 4 }}>
                                    <Box>
                                        <Typography fontWeight={'bold'} sx={{ textAlign: 'left', mb: 1 }}>Correo Electrónico: </Typography>
                                        <Typography sx={{ textAlign: 'left', mb: 1, color: 'gray' }}>Introduzca su dirección de correo para validar su pre-registro</Typography>
                                        <TextField
                                            value={email}
                                            sx={{
                                                width: '100%',
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: '#c3c3c3', // Color del borde
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: 'background.default', // Color en hover
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        border: '1px solid',
                                                        borderColor: 'background.default', // Color en focus
                                                    }
                                                }
                                            }}
                                            size='small'
                                            onChange={(e) => setEmail(regexMailPre.test(e.target.value) ? e.target.value : email)}
                                            error={(email === '' && emailError) && true}
                                            helperText={(email === '' && emailError) && 'Este campo es necesario'}
                                        />
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button loading={loading} onClick={handleVerify} variant="contained" sx={{ color: 'primary.main', backgroundColor: 'background.default' }}>
                                            Enviar
                                        </Button>
                                    </Box>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
            }
        </>
    )
}

export default Verificacion;
