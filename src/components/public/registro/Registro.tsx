import { Autocomplete, Divider, FormControl, Grid, InputLabel, ListItemText, MenuItem, Select, Stack, TextField, useMediaQuery } from "@mui/material";
import { navBarHeigth, navBarHeigthResponsive } from "../../../pages/HomePage";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { getCategories, getModules, getWorkshops } from "../../../services/admin/adminService";
import { ReqGenCatalogs } from "../../../interfaces/admin/IAdmin";
import { regexCiudad, regexMailPre, regexReg, regexTel } from "../../../helpers/registro/regex";
import { initValuesFormJornadas, initValuesFormJornadasErrors } from "../../../helpers/registro/initValues";
import { JornadasValuesInterface, RegistFormInterface } from "../../../interfaces/registro/IRegistForm";
import { regexRFC } from "../../admin/Login";

const Registro = () => {
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");
    const [catalogs, setCatalogs] = useState<{ categories: ReqGenCatalogs[], modules: ReqGenCatalogs[], workshops: ReqGenCatalogs[] }>({ categories: [], modules: [], workshops: [] });
    const [payload, setPayload] = useState<RegistFormInterface>(initValuesFormJornadas);
    const [errors, setErrors] = useState<JornadasValuesInterface>(initValuesFormJornadasErrors);

    useEffect(() => {
        getCategories().then(((res: ReqGenCatalogs[]) => {
            setCatalogs(prev => ({ ...prev, categories: res }));
        }));

        getModules().then(((res: ReqGenCatalogs[]) => {
            setCatalogs(prev => ({ ...prev, modules: res }));
        }));

        getWorkshops().then(((res: ReqGenCatalogs[]) => {
            setCatalogs(prev => ({ ...prev, workshops: res }));
        }));
    }, []);

    return (
        <Stack sx={{ pt: responsive ? `${navBarHeigthResponsive}px` : `${navBarHeigth}px`, mt: 3, mb: 4 }}>
            <Divider
                component={motion.div}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, ease: 'easeInOut' }}
                viewport={{ once: true }}
                sx={{ fontFamily: 'sans-serif', fontWeight: 700, fontSize: responsive ? '25px' : '30px', color: 'secondary.main', width: responsive ? '80%' : '30%', m: 'auto' }}>
                REGISTRO
            </Divider>
            <Grid container sx={{ width: responsive ? '95%' : '47%', m: 'auto', borderRadius: 5, p: 3, boxShadow: '0 7px 10px 3px rgba(1,18,38, 0.1)', gap: 3 }}>
                <Grid size={12}>
                    <FormControl fullWidth>
                        <InputLabel
                            id='cat-select'
                            sx={{
                                '&.Mui-focused': {
                                    color: 'black',
                                }
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
                        >
                            {catalogs.categories.map((cat: ReqGenCatalogs) =>
                                <MenuItem key={cat.id} value={cat.id}>{cat.nombre}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid size={12}>
                    <TextField
                        fullWidth
                        label='Acrónimo * (C. / Dr. / L.E. / Q.C. /  Q.F.B. / Lic. / C.D. / etc - será utilizado para su constancia)'
                        autoComplete="off"
                        value={payload.acronimo}
                        onChange={(e) => setPayload({ ...payload, acronimo: e.target.value })}
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
                                label='Módulo al que asiste (opcional)'
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
                </Grid>
            </Grid>
        </Stack>
    )
}

export default Registro;
