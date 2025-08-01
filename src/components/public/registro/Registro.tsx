import { Autocomplete, Box, Button, Card, Checkbox, Divider, FormControl, FormHelperText, Grid, InputLabel, ListItemText, MenuItem, Select, Stack, TextField, Tooltip, Typography, useMediaQuery } from "@mui/material";
import { navBarHeigth, navBarHeigthResponsive } from "../../../pages/HomePage";
import { useEffect, useState } from "react";
import { getCategories, getEventEditions, getModules, getWorkshops } from "../../../services/admin/adminService";
import { ReqGenCatalogs, ReqEventEditions } from '../../../interfaces/admin/IAdmin';
import { regexCiudad, regexMailPre, regexReg, regexTel } from "../../../helpers/registro/regex";
import { initValuesFormJornadas, initValuesFormJornadasErrors } from "../../../helpers/registro/initValues";
import { JornadasValuesInterface, PropsTalleresInterface, RegistFormInterface } from "../../../interfaces/registro/IRegistForm";
import { regexRFC } from "../../admin/Login";
import dayjs from "dayjs";
import { formatWorkshops } from "../../../helpers/registro/formatWorkshops";
import { validateJornadasFields } from "../../../helpers/registro/validateRegistForm";
import Swal from 'sweetalert2';
import { postRegistMail } from "../../../services/registro/registroService";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { motion } from "motion/react";
import MedicalServicesTwoToneIcon from '@mui/icons-material/MedicalServicesTwoTone';
import ContactEmergencyTwoToneIcon from '@mui/icons-material/ContactEmergencyTwoTone';
import _ from 'lodash';

const Registro = () => {
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");
    const [catalogs, setCatalogs] = useState<{ categories: ReqGenCatalogs[], modules: ReqGenCatalogs[], workshops: ReqGenCatalogs[], editions: ReqEventEditions[] }>({ categories: [], modules: [], workshops: [], editions: [] });
    const [payload, setPayload] = useState<RegistFormInterface>(initValuesFormJornadas);
    const [errors, setErrors] = useState<JornadasValuesInterface>(initValuesFormJornadasErrors);
    const [loading, setLoading] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<number[]>([]);
    const groupedWorkshops = _.groupBy(catalogs.workshops, 'jrn_modulo.nombre');

    const handleSubmit = async () => {
        const { isOk, errors } = validateJornadasFields(payload);

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

            const res = await postRegistMail(payload, recaptchaToken);

            if (res.data) {
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    html: 'Su pase de entrada (código QR) se enviará a su correo electrónico en breve. <hr><b>No olvide llevarlo consigo pues será su registro de asistencia.<b>',
                    confirmButtonColor: '#d3c19b'
                });

                setPayload(initValuesFormJornadas);
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

    const handleCheckboxes = (isChecked: boolean, workshop: ReqGenCatalogs) => {
        let formatWorkshop: PropsTalleresInterface = {
            asistio: false,
            constancia_enviada: false,
            id_taller: workshop.id
        }

        if (isChecked) {
            setPayload({ ...payload, talleres: [...(payload.talleres || []), formatWorkshop] });
            setSelectedItem([...selectedItem, workshop.id]);
        } else {
            setPayload({
                ...payload,
                talleres: (payload.talleres || []).filter(
                    (taller) => taller.id_taller !== workshop.id
                )
            });
            setSelectedItem(selectedItem.filter((id: number) => id != workshop.id));
        }
    }

    useEffect(() => {
        getCategories().then(((res: ReqGenCatalogs[]) => {
            setCatalogs(prev => ({ ...prev, categories: res }));
        }));

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
        const currentYear: string = dayjs.utc().format('YYYY');
        const currentEdition: ReqEventEditions[] = catalogs.editions.filter((edition: ReqEventEditions) => edition.edicion === currentYear);

        setPayload({ ...payload, edicion: currentEdition[0]?.id });
    }, [catalogs.editions]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Stack sx={{ pt: responsive ? `${navBarHeigthResponsive}px` : `${navBarHeigth}px`, mt: 5, mb: 6 }}>
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
                <Grid size={12} sx={{ height: '15%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(90deg, rgba(83,115,109,1) 0%, rgba(19,50,44,1) 48%, rgba(36,70,63,0.8) 100%);', borderTopLeftRadius: 18, borderTopRightRadius: 15, pt: 4, pb: 4, flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                        <PersonAddIcon sx={{ width: 'auto', height: '30px', color: 'white' }} />
                        <Typography sx={{ color: 'primary.main', fontWeight: 'bold', fontSize: responsive ? '23px' : '23px' }}>REGISTRO</Typography>
                    </Box>
                </Grid>
                <Grid container sx={{ width: '100%', p: responsive ? 3 : 4 }} spacing={3}>
                    <Grid size={12}>
                        <Box sx={{ display: 'flex', mb: 1, gap: 0.7 }}>
                            <ContactEmergencyTwoToneIcon sx={{ width: 'auto', height: '23px', color: 'background.default' }} />
                            <Typography sx={{ fontSize: '18px', fontWeight: 'bold', color: 'text.primary' }}>Información Personal</Typography>
                        </Box>
                        <FormControl fullWidth>
                            <InputLabel
                                id='cat-select'
                                sx={{
                                    '&.Mui-focused': {
                                        color: 'black',
                                    },
                                    color: '#2b3b37'
                                }}>
                                Categoría *
                            </InputLabel>
                            <Select
                                labelId='cat-select'
                                label='Categoría --'
                                fullWidth
                                value={payload.categoria}
                                sx={{
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'text.secondary'
                                    }
                                }}
                                onChange={(e) => setPayload({ ...payload, categoria: e.target.value })}
                                error={errors.categoria.error}
                            >
                                {catalogs.categories.map((cat: ReqGenCatalogs) =>
                                    <MenuItem key={cat.id} value={cat.nombre}>{cat.nombre}</MenuItem>
                                )}
                            </Select>
                            {
                                errors.categoria.error &&
                                <FormHelperText sx={{ color: '#d04847' }}>{errors.categoria.msg}</FormHelperText>
                            }
                        </FormControl>
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            fullWidth
                            label='Acrónimo * (C. / Dr. / L.E. / Q.C. /  Q.F.B. / Lic. / C.D. / etc - será utilizado para su constancia)'
                            autoComplete="off"
                            value={payload.acronimo}
                            onChange={(e) => setPayload({ ...payload, acronimo: e.target.value.toUpperCase() })}
                            sx={{
                                '& .MuiOutlinedInput-root.Mui-focused': {
                                    '& fieldset': {
                                        borderColor: 'text.secondary', // Cambia el color del borde
                                    }
                                },
                                "& label": {
                                    color: 'background.default'
                                },
                                "& label.Mui-focused": {
                                    color: 'black'
                                }
                            }}
                            error={errors.acronimo.error}
                            helperText={errors.acronimo.error ? errors.acronimo.msg : ''}
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            label='Nombre (s) *'
                            fullWidth
                            autoComplete='off'
                            value={payload.nombre}
                            sx={{
                                '& .MuiOutlinedInput-root.Mui-focused': {
                                    '& fieldset': {
                                        borderColor: 'text.secondary', // Cambia el color del borde
                                    }
                                },
                                "& label": {
                                    color: 'background.default'
                                },
                                "& label.Mui-focused": {
                                    color: 'black'
                                }
                            }}
                            onChange={(e) => setPayload({ ...payload, nombre: regexReg.test(e.target.value) ? e.target.value.toUpperCase() : payload.nombre })}
                            error={errors.nombre.error}
                            helperText={errors.nombre.error ? errors.nombre.msg : ''}
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            label='Apellidos *'
                            fullWidth
                            autoComplete='off'
                            value={payload.apellidos}
                            sx={{
                                '& .MuiOutlinedInput-root.Mui-focused': {
                                    '& fieldset': {
                                        borderColor: 'text.secondary', // Cambia el color del borde
                                    }
                                },
                                "& label": {
                                    color: 'background.default'
                                },
                                "& label.Mui-focused": {
                                    color: 'black'
                                }
                            }}
                            onChange={(e) => setPayload({ ...payload, apellidos: regexReg.test(e.target.value) ? e.target.value.toUpperCase() : payload.apellidos })}
                            error={errors.apellidos.error}
                            helperText={errors.apellidos.error ? errors.apellidos.msg : ''}
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            label='RFC (opcional)'
                            fullWidth
                            autoComplete='off'
                            value={payload.rfc}
                            sx={{
                                '& .MuiOutlinedInput-root.Mui-focused': {
                                    '& fieldset': {
                                        borderColor: 'text.secondary', // Cambia el color del borde
                                    }
                                },
                                "& label": {
                                    color: 'background.default'
                                },
                                "& label.Mui-focused": {
                                    color: 'black'
                                }
                            }}
                            slotProps={{
                                htmlInput: { maxLength: 13 }
                            }}
                            onChange={(e) => setPayload({ ...payload, rfc: regexRFC.test(e.target.value) ? e.target.value.toUpperCase() : payload.rfc })}
                            error={errors.rfc.error}
                            helperText={errors.rfc.error ? errors.rfc.msg : ''}
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            label='Correo Electrónico *'
                            fullWidth
                            autoComplete='off'
                            value={payload.correo}
                            sx={{
                                '& .MuiOutlinedInput-root.Mui-focused': {
                                    '& fieldset': {
                                        borderColor: 'text.secondary', // Cambia el color del borde
                                    }
                                },
                                "& label": {
                                    color: 'background.default'
                                },
                                "& label.Mui-focused": {
                                    color: 'black'
                                }
                            }}
                            onChange={(e) => setPayload({ ...payload, correo: regexMailPre.test(e.target.value) ? e.target.value : payload.correo })}
                            error={errors.correo.error}
                            helperText={errors.correo.error ? errors.correo.msg : ''}
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            label='No. Teléfono *'
                            fullWidth
                            autoComplete='off'
                            value={payload.tel}
                            sx={{
                                '& .MuiOutlinedInput-root.Mui-focused': {
                                    '& fieldset': {
                                        borderColor: 'text.secondary', // Cambia el color del borde
                                    }
                                },
                                "& label": {
                                    color: 'background.default'
                                },
                                "& label.Mui-focused": {
                                    color: 'black'
                                }
                            }}
                            onChange={(e) => setPayload({ ...payload, tel: regexTel.test(e.target.value) ? e.target.value : payload.tel })}
                            error={errors.tel.error}
                            helperText={errors.tel.error ? errors.tel.msg : ''}
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            label='Ciudad de Procedencia *'
                            fullWidth
                            autoComplete='off'
                            value={payload.ciudad}
                            sx={{
                                '& .MuiOutlinedInput-root.Mui-focused': {
                                    '& fieldset': {
                                        borderColor: 'text.secondary', // Cambia el color del borde
                                    }
                                },
                                "& label": {
                                    color: 'background.default'
                                },
                                "& label.Mui-focused": {
                                    color: 'black'
                                }
                            }}
                            onChange={(e) => setPayload({ ...payload, ciudad: regexCiudad.test(e.target.value) ? e.target.value.toUpperCase() : payload.ciudad })}
                            error={errors.ciudad.error}
                            helperText={errors.ciudad.error ? errors.ciudad.msg : ''}
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            label='Escuela, Institución o Dependencia (opcional)'
                            fullWidth
                            autoComplete='off'
                            value={payload.dependencia}
                            sx={{
                                '& .MuiOutlinedInput-root.Mui-focused': {
                                    '& fieldset': {
                                        borderColor: 'text.secondary', // Cambia el color del borde
                                    }
                                },
                                "& label": {
                                    color: 'background.default'
                                },
                                "& label.Mui-focused": {
                                    color: 'black'
                                }
                            }}
                            onChange={(e) => setPayload({ ...payload, dependencia: regexCiudad.test(e.target.value) ? e.target.value.toUpperCase() : payload.dependencia })}
                            error={errors.dependencia.error}
                            helperText={errors.dependencia.error ? errors.dependencia.msg : ''}
                        />
                    </Grid>
                    <Grid size={12}>
                        <Divider sx={{ mt: 2, ml: 2, mr: 2 }} />
                    </Grid>
                    <Grid size={12}>
                        <Box sx={{ display: 'flex', mb: 0, gap: 0.7 }}>
                            <MedicalServicesTwoToneIcon sx={{ width: 'auto', height: '23px', color: 'background.default' }} />
                            <Typography sx={{ fontSize: '18px', fontWeight: 'bold', color: 'text.primary' }}>Módulos y Talleres</Typography>
                        </Box>
                        <Box sx={{ mb: 1 }}>
                            <Typography sx={{ fontSize: '17px', textAlign: 'justify' }}>Seleccione los eventos a los que desea asistir. Debe elegir al menos un módulo o taller.</Typography>
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <Autocomplete
                                id='select-modulo'
                                options={catalogs.modules}
                                getOptionLabel={option => option.nombre}
                                value={catalogs.modules.find(modulo => modulo.id === payload.modulo) || null}
                                onChange={(_e, value) => setPayload({ ...payload, modulo: value ? value.id : null })}
                                renderOption={(props, options) => (
                                    <MenuItem {...props}>
                                        <ListItemText key={options.id} primary={options.nombre} />
                                    </MenuItem>
                                )}
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
                                                color: 'background.default'
                                            },
                                            "& label.Mui-focused": {
                                                color: 'black'
                                            }
                                        }}
                                        error={errors.modulo.error}
                                        helperText={errors.modulo.error ? errors.modulo.msg : ''}
                                    />
                                )}
                            />
                        </Box>
                        {Object.entries(groupedWorkshops).map(([categoria, workshops], index: number) => (
                            <Card
                                key={categoria}
                                sx={{
                                    borderTop: `4px solid ${workshops[0].borderStyle}`,
                                    borderRadius: 3,
                                    mb: index === Object.entries(groupedWorkshops).length - 1 ? 0 : 3,
                                    paddingBottom: 2
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
                                                checked={selectedItem.includes(workshop.id)}
                                                onChange={(e) => handleCheckboxes(e.target.checked, workshop)}
                                            />
                                            <Typography sx={{ mt: 1.2 }}>
                                                <b>{dayjs(workshop.fecha).format('DD')} de {dayjs(workshop.fecha).format('MMMM')}</b> - {workshop.nombre}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Card>
                        ))}
                    </Grid>
                    {/* <fieldset key={workshop.id} style={{ border: workshop.borderStyle, borderRadius: '20px', marginBottom: '15px' }}>
                                    
                                </fieldset> */}
                    <Grid size={12} textAlign={'center'}>
                        <Button loading={loading} variant='contained' onClick={handleSubmit} sx={{ backgroundColor: "text.secondary", ":hover": { backgroundColor: '#b09a6b' }, color: 'primary.main' }}>
                            Enviar
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Stack>
    )
}

export default Registro;
