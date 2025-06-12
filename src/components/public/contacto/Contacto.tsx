import { Box, Button, CircularProgress, Divider, Grid, TextField, Typography, useMediaQuery } from "@mui/material"
import EmailIcon from '@mui/icons-material/Email';
import { useState } from "react";
import { PropsErrorsData, PropsFormData } from "../../../interfaces/contacto/IContactForm";
import { errors, validateContactFields } from "../../../helpers/contacto/validateContactForm";
import { postContactMail } from "../../../services/contacto/contactService";
import SendIcon from '@mui/icons-material/Send';
import Swal from 'sweetalert2';
import { motion } from "motion/react";

const initialState = { nombre: '', telefono: '', correo: '', asunto: '', descripcion: '' };
const regex = /^[A-Za-z\s]*$/;
const regexTel = /^\d*$/;
const regexMailPre = /^[A-Za-z0-9._@-]*$/;

export const Contacto = () => {
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");
    const [data, setData] = useState<PropsFormData>(initialState);
    const [err, setErrors] = useState<PropsErrorsData>(errors);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async () => {
        const isOk: boolean = validateContactFields(data, err, setErrors);

        if (isOk) {
            setLoading(true);
            const res: any = await postContactMail(data);

            if (res.data) {
                setLoading(false);

                Swal.fire({
                    icon: "success",
                    title: "Éxito",
                    text: "Tu solicitud ha sido enviada",
                    showConfirmButton: true,
                    confirmButtonColor: '#d37c6b'
                });

                setData(initialState);
                setErrors(errors);
            } else if (res.error) {
                setLoading(false);

                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No se ha podido procesar su solicitud. Intente más tarde",
                    showConfirmButton: true,
                    confirmButtonColor: '#d37c6b'
                });
            }
        }
    }

    return (
        <Grid container sx={{ pb: responsive ? '2vh' : '7.5vh', position: 'relative', mt: responsive ? 2 : 0 }}>
            <Grid size={responsive ? 12 : 6} sx={{ height: 'auto', pb: responsive ? '2vh' : 0, display: responsive ? 'none' : 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ width: '80%', pl: 10 }}>
                    <Typography fontSize={'20px'} fontFamily={'sans-serif'} textAlign={'justify'} fontWeight={500} letterSpacing={1}>
                        Para cualquier consulta relacionada al evento, por favor completa el formulario de contacto o comunícate con la subdirección de Enseñanza del Centro de Alta Especialidad Dr. Rafael Lucio al teléfono 228-814-4500 Ext. 1116.
                    </Typography>
                    <Typography fontSize={'20px'} fontFamily={'sans-serif'} textAlign={'justify'} fontWeight={500} letterSpacing={1}>
                        Nos comprometemos a atender tu solicitud a la mayor brevedad posible. Gracias por tu interés.
                    </Typography>
                </Box>
            </Grid>
            <Grid size={responsive ? 12 : 6} sx={{ textAlign: 'center', height: 'auto' }}>
                <Box sx={{ mt: '4vh', visibility: 'visible' }}>
                    <Divider
                        component={motion.div}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.85, ease: 'easeInOut' }}
                        viewport={{ once: true }}
                        sx={{ fontFamily: 'sans-serif', fontWeight: 700, fontSize: responsive ? '25px' : '33px', color: 'secondary.main', width: responsive ? '80%' : '50%', m: 'auto' }}>
                        CONTACTO
                    </Divider>
                </Box>
                <Box sx={{ width: responsive ? '90%' : '75%', m: 'auto', pl: { md: 10 }, pr: { md: 10 }, pb: responsive ? 5 : 0 }}>
                    <Box sx={{ width: responsive ? '100%' : 'auto', m: 'auto', mt: 2, display: responsive ? 'block' : 'none' }}>
                        <Typography fontSize={responsive ? '18px' : '20px'} fontFamily={'sans-serif'} textAlign={'justify'}>
                            Para cualquier consulta relacionada al evento, por favor completa el formulario de contacto o comunícate con la subdirección de Enseñanza del Centro de Alta Especialidad Dr. Rafael Lucio al teléfono 228-814-4500 Ext. 1116.
                        </Typography>
                        <Typography fontSize={responsive ? '18px' : '20px'} fontFamily={'sans-serif'} textAlign={'justify'}>
                            Nos comprometemos a atender tu solicitud a la mayor brevedad posible. Gracias por tu interés.
                        </Typography>
                    </Box>
                    <Box sx={{
                        width: responsive ? '100%' : 'auto', height: 'auto', borderRadius: 5, mt: 3, boxShadow: '0 8px 10px 0 rgba(1,18,38, 0.15)'
                    }}
                    >
                        <Grid container sx={{ height: '100%', overflow: 'hidden', flexDirection: responsive ? 'column' : 'row' }}>
                            <Grid size={12} sx={{ height: '15%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(90deg, rgba(83,115,109,1) 0%, rgba(19,50,44,1) 48%, rgba(36,70,63,1) 100%);', borderTopLeftRadius: 18, borderTopRightRadius: 15, pt: 3, pb: 3 }}>
                                <EmailIcon sx={{ width: 'auto', height: '60px', color: 'white' }} />
                            </Grid>
                            <Grid size={12} sx={{ p: 5, height: '85%', display: 'flex', flexDirection: 'column', gap: 4 }}>
                                <Box>
                                    <Typography fontWeight={'bold'} sx={{ textAlign: 'left' }}>Nombre <b style={{ color: 'red' }}>*</b> </Typography>
                                    <TextField
                                        value={data.nombre}
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
                                        onChange={(e) => setData({ ...data, nombre: regex.test(e.target.value) ? e.target.value : data.nombre })}
                                        error={(data.nombre === '' && err.nombre) && true}
                                        helperText={(data.nombre === '' && err.nombre) && "Este campo es necesario"}
                                    />
                                </Box>
                                <Box>
                                    <Typography fontWeight={'bold'} sx={{ textAlign: 'left' }}>Teléfono <b style={{ color: 'red' }}>*</b> </Typography>
                                    <TextField
                                        value={data.telefono}
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
                                        onChange={(e) => setData({ ...data, telefono: regexTel.test(e.target.value) ? e.target.value : data.telefono })}
                                        error={(err.telefono && data.telefono.length < 10) && true}
                                        helperText={(err.telefono && data.telefono.length < 10) && "Este campo es necesario"}
                                        slotProps={{
                                            htmlInput: { maxLength: 10 }
                                        }}
                                    />
                                </Box>
                                <Box>
                                    <Typography fontWeight={'bold'} sx={{ textAlign: 'left' }}>Correo <b style={{ color: 'red' }}>*</b> </Typography>
                                    <TextField
                                        value={data.correo}
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
                                        onChange={(e) => setData({ ...data, correo: regexMailPre.test(e.target.value) ? e.target.value : data.correo })}
                                        error={(data.correo === '' && err.correo) && true}
                                        helperText={(data.correo === '' && err.correo) && "Este campo es necesario"}
                                    />
                                </Box>
                                <Box>
                                    <Typography fontWeight={'bold'} sx={{ textAlign: 'left' }}>Asunto <b style={{ color: 'red' }}>*</b></Typography>
                                    <TextField
                                        value={data.asunto}
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
                                        onChange={(e) => setData({ ...data, asunto: regex.test(e.target.value) ? e.target.value : data.asunto })}
                                        error={(data.asunto === '' && err.asunto) && true}
                                        helperText={(data.asunto === '' && err.asunto) && "Este campo es necesario"}
                                    />
                                </Box>
                                <Box>
                                    <Typography fontWeight={'bold'} sx={{ textAlign: 'left' }}>Descripción <b style={{ color: 'red' }}>*</b> </Typography>
                                    <TextField
                                        value={data.descripcion}
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
                                        size='medium'
                                        multiline
                                        onChange={(e) => setData({ ...data, descripcion: regex.test(e.target.value) ? e.target.value : data.descripcion })}
                                        error={(data.descripcion === '' && err.descripcion) && true}
                                        helperText={(data.descripcion === '' && err.descripcion) && "Este campo es necesario"}
                                    />
                                </Box>
                                <Box sx={{ position: 'relative' }}>
                                    <Button disabled={loading} onClick={handleSubmit} variant="outlined" startIcon={<SendIcon />} sx={{ color: 'black', borderColor: '#db897b' }}>
                                        Enviar
                                    </Button>
                                    {loading && (
                                        <CircularProgress
                                            size={24}
                                            sx={{
                                                color: '#da8777',
                                                position: 'absolute',
                                                top: '54%',
                                                left: '51%',
                                                marginTop: '-12px',
                                                marginLeft: '-12px',
                                            }}
                                        />
                                    )}
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
            <img alt='medic2' style={{ position: 'absolute', display: responsive ? 'none' : 'block', filter: 'drop-shadow(0px 0px 9px grey)', bottom: 0, right: '34.5%', maxWidth: '45%', height: 'auto', zIndex: 0 }} src={`${import.meta.env.VITE_APP_BASE_ROUTE}/contactMedic.webp`}></img>
        </Grid>
    )
}
