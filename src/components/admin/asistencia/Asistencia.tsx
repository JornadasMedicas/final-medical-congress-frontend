import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, Divider, Grid, InputAdornment, LinearProgress, TextField, Typography, useMediaQuery } from '@mui/material'
import { PropsAssitance, ReqAssistantInfo, ReqEventEditions } from '../../../interfaces/admin/IAdmin';
import Diversity3SharpIcon from '@mui/icons-material/Diversity3Sharp';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SendIcon from '@mui/icons-material/Send';
import HubSharpIcon from '@mui/icons-material/HubSharp';
import InfoOutlineRoundedIcon from '@mui/icons-material/InfoOutlineRounded';
import { useState } from 'react';
import { getAssitantInfo, putRegistAssistance } from '../../../services/admin/adminService';
import Swal from 'sweetalert2';

export const Asistencia = ({ editions }: { editions: ReqEventEditions[] }) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [moduleValues, setModuleValues] = useState({ qrdata: '', emaildata: '' });
    const [workshopValues, setWorkshopValues] = useState({ qrdata: '', emaildata: '' });
    const [info, setInfo] = useState<PropsAssitance>({ emaildata: '', assistantInfo: null });
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");

    const fetchInfo = () => {

        getAssitantInfo(info.emaildata).then((res: ReqAssistantInfo) =>
            setInfo({ ...info, assistantInfo: res.data })
        ).catch((err) => console.log(err));

        setOpenModal(true);
    }

    const manualAssistance = () => {
        putRegistAssistance(moduleValues.emaildata).then((res: any) => {
            if (res.error) {
                if (res.error.status === 400 || res.error.status === 404) {                    
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: res.error.response.data.msg,
                        confirmButtonColor: '#13322c'
                    });
                }
            } else {
                Swal.fire({
                    icon: "success",
                    title: "Éxito",
                    text: "Asistencia registrada correctamente.",
                    confirmButtonColor: '#13322c',
                    timer: 1000
                });
            }
        }).catch((err) => console.log(err));
    }

    return (
        <>
            {
                editions.length === 0 ?
                    <LinearProgress color='inherit' sx={{ width: '100%', color: 'text.secondary', position: 'absolute', top: 0 }} />
                    :
                    <Grid container size={12} spacing={4}>
                        <Grid size={12} sx={{ display: 'flex', m: 'auto', flexDirection: 'column' }}>
                            <Box sx={{ width: responsive ? '100%' : '70%', m: 'auto', borderRadius: 2, boxShadow: 1, }}>
                                <Grid gap={1} sx={{ backgroundColor: 'background.default', height: '10%', width: '100%', borderTopLeftRadius: 4, borderTopRightRadius: 4, p: 2, display: 'flex', justifyContent: 'center' }}>
                                    <Diversity3SharpIcon sx={{ color: 'white', width: 'auto', height: '27px' }} />
                                    <Typography sx={{ color: 'white', fontWeight: 'bold', marginTop: '3.5px' }}>
                                        CONGRESO
                                    </Typography>
                                </Grid>
                                <Grid sx={{ display: 'flex', justifyContent: 'center', width: responsive ? '100%' : '100%', p: 3 }}>
                                    <TextField
                                        label='Registro QR'
                                        autoComplete='off'
                                        name='qrdata'
                                        value={moduleValues.qrdata}
                                        onChange={(e) => setModuleValues({ ...moduleValues, qrdata: e.target.value })}
                                        slotProps={{
                                            input: {
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <QrCodeScannerIcon />
                                                    </InputAdornment>
                                                )
                                            }
                                        }}
                                        sx={{
                                            "& label.Mui-focused": {
                                                color: "#b7402a"
                                            },
                                            "& .MuiInput-underline:after": {
                                                borderBottomColor: "#b7402a"
                                            },
                                            width: '300px'
                                        }}
                                        variant="standard"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid sx={{ display: 'flex', justifyContent: 'center', width: '100%', p: 3 }}>
                                    <TextField
                                        label='Registro Manual (email)'
                                        autoComplete='off'
                                        placeholder='asistente@ejemplo.com'
                                        name='email'
                                        value={moduleValues.emaildata}
                                        onChange={(e) => setModuleValues({ ...moduleValues, emaildata: e.target.value })}
                                        slotProps={{
                                            input: {
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PersonAddAlt1Icon />
                                                    </InputAdornment>
                                                )
                                            }
                                        }}
                                        sx={{
                                            "& label.Mui-focused": {
                                                color: "#b7402a"
                                            },
                                            "& .MuiInput-underline:after": {
                                                borderBottomColor: "#b7402a"
                                            },
                                            width: '250px'
                                        }}
                                        variant="standard"
                                        fullWidth
                                    />
                                    <Button
                                        disabled={moduleValues.emaildata === '' ? true : false}
                                        endIcon={<SendIcon />}
                                        variant='contained'
                                        onClick={manualAssistance}
                                        sx={{ color: 'primary.main', backgroundColor: "background.default", ":hover": { backgroundColor: 'primary.main', color: "background.default" }, marginBottom: 0, marginTop: 2, marginLeft: 1, width: '95px', height: '30px' }}
                                    >
                                        Enviar
                                    </Button>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid size={12} sx={{ display: 'flex', m: 'auto', flexDirection: 'column' }}>
                            <Box sx={{ width: responsive ? '100%' : '70%', m: 'auto', borderRadius: 2, boxShadow: 1, }}>
                                <Grid gap={1} sx={{ backgroundColor: 'background.default', height: '10%', width: '100%', borderTopLeftRadius: 4, borderTopRightRadius: 4, p: 2, display: 'flex', justifyContent: 'center' }}>
                                    <HubSharpIcon sx={{ color: 'white', width: 'auto', height: '27px' }} />
                                    <Typography sx={{ color: 'white', fontWeight: 'bold', marginTop: '3.5px' }}>
                                        TALLERES
                                    </Typography>
                                </Grid>
                                <Grid sx={{ display: 'flex', justifyContent: 'center', width: responsive ? '100%' : '100%', p: 3 }}>
                                    <TextField
                                        label='Registro QR'
                                        autoComplete='off'
                                        name='qrdata'
                                        value={moduleValues.qrdata}
                                        onChange={(e) => setModuleValues({ ...moduleValues, qrdata: e.target.value })}
                                        slotProps={{
                                            input: {
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <QrCodeScannerIcon />
                                                    </InputAdornment>
                                                )
                                            }
                                        }}
                                        sx={{
                                            "& label.Mui-focused": {
                                                color: "#b7402a"
                                            },
                                            "& .MuiInput-underline:after": {
                                                borderBottomColor: "#b7402a"
                                            },
                                            width: '300px'
                                        }}
                                        variant="standard"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid size={4} sx={{ display: 'flex', justifyContent: 'center', width: '100%', p: 3 }}>
                                    <TextField
                                        label='Registro Manual (email)'
                                        autoComplete='off'
                                        placeholder='asistente@ejemplo.com'
                                        name='email'
                                        value={workshopValues.emaildata}
                                        onChange={(e) => setWorkshopValues({ ...moduleValues, emaildata: e.target.value })}
                                        slotProps={{
                                            input: {
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PersonAddAlt1Icon />
                                                    </InputAdornment>
                                                )
                                            }
                                        }}
                                        sx={{
                                            "& label.Mui-focused": {
                                                color: "#b7402a"
                                            },
                                            "& .MuiInput-underline:after": {
                                                borderBottomColor: "#b7402a"
                                            },
                                            width: '250px'
                                        }}
                                        variant="standard"
                                        fullWidth
                                    />
                                    <Button
                                        disabled={workshopValues.emaildata === '' ? true : false}
                                        endIcon={<SendIcon />}
                                        variant='contained'
                                        /* onClick={manualAssistance} */
                                        sx={{ color: 'primary.main', backgroundColor: "background.default", ":hover": { backgroundColor: 'primary.main', color: "background.default" }, marginBottom: 0, marginTop: 2, marginLeft: 1, width: '95px', height: '30px' }}
                                    >
                                        Enviar
                                    </Button>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid size={12} sx={{ display: 'flex', m: 'auto', flexDirection: 'column' }}>
                            <Box sx={{ width: responsive ? '100%' : '70%', m: 'auto', borderRadius: 2, boxShadow: 1, }}>
                                <Grid gap={1} sx={{ backgroundColor: 'background.default', height: '10%', width: '100%', borderTopLeftRadius: 4, borderTopRightRadius: 4, p: 2, display: 'flex', justifyContent: 'center' }}>
                                    <InfoOutlineRoundedIcon sx={{ color: 'white', width: 'auto', height: '27px' }} />
                                    <Typography sx={{ color: 'white', fontWeight: 'bold', marginTop: '3.5px' }}>
                                        CONSULTAR INFORMACIÓN
                                    </Typography>
                                </Grid>
                                <Grid size={4} sx={{ display: 'flex', justifyContent: 'center', width: '100%', p: 3 }}>
                                    <TextField
                                        label='Captura Manual (email)'
                                        autoComplete='off'
                                        placeholder='asistente@ejemplo.com'
                                        name='email'
                                        value={info.emaildata}
                                        onChange={(e) => setInfo({ ...info, emaildata: e.target.value })}
                                        slotProps={{
                                            input: {
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PersonAddAlt1Icon />
                                                    </InputAdornment>
                                                )
                                            }
                                        }}
                                        sx={{
                                            "& label.Mui-focused": {
                                                color: "#b7402a"
                                            },
                                            "& .MuiInput-underline:after": {
                                                borderBottomColor: "#b7402a"
                                            },
                                            width: '250px'
                                        }}
                                        variant="standard"
                                        fullWidth
                                    />
                                    <Button
                                        disabled={info.emaildata === '' ? true : false}
                                        endIcon={<SendIcon />}
                                        variant='contained'
                                        onClick={fetchInfo}
                                        sx={{ color: 'primary.main', backgroundColor: "background.default", ":hover": { backgroundColor: 'primary.main', color: "background.default" }, marginBottom: 0, marginTop: 2, marginLeft: 1, width: '95px', height: '30px' }}
                                    >
                                        Enviar
                                    </Button>
                                </Grid>
                            </Box>
                        </Grid>
                        <Dialog
                            open={openModal}
                            onClose={() => setOpenModal(false)}
                            fullWidth
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle sx={{ fontWeight: 'bold', fontFamily: 'typography.fontFamily', textAlign: 'left', pt: 2, pl: 2, pb: 1, backgroundColor: 'background.default', color: 'primary.main' }} id="alert-dialog-title">
                                {info.assistantInfo?.nombre}
                            </DialogTitle>
                            <Divider sx={{ width: '95%', m: 'auto' }} />
                            <DialogContent sx={{ pt: 2 }}>
                                <DialogContentText id="alert-dialog-description">
                                    <Typography sx={{ color: 'black', fontSize: '18px', fontWeight: 'bold', textAlign: 'center', width: '100%', mb: 0.5 }}>Datos Generales</Typography>
                                    <Typography sx={{ color: 'black', fontSize: '18px' }}>Correo: {info.assistantInfo?.correo}</Typography>
                                    <Typography sx={{ color: 'black', fontSize: '18px' }}>Teléfono: {info.assistantInfo?.tel}</Typography>
                                    <Typography sx={{ color: 'black', fontSize: '18px' }}>Categoría: {info.assistantInfo?.categoria}</Typography>
                                    <Typography sx={{ color: 'black', fontSize: '18px' }}>Ciudad: {info.assistantInfo?.ciudad}</Typography>
                                    {
                                        info.assistantInfo?.jrn_inscritos_modulos.length !== 0 ?
                                            <>
                                                <Divider sx={{ width: '95%', m: 'auto', mt: 2, mb: 2 }} />
                                                <Typography sx={{ color: 'black', fontSize: '18px', fontWeight: 'bold', textAlign: 'center', width: '100%', mb: 0.5 }}>Congreso</Typography>
                                                <Typography sx={{ color: 'black', fontSize: '18px' }}>Módulo: {info.assistantInfo?.jrn_inscritos_modulos[0].jrn_modulo.nombre}</Typography>
                                                <Typography sx={{ color: 'black', fontSize: '18px' }}>Día 1: {info.assistantInfo?.jrn_inscritos_modulos[0].asistioDia1 ? 'Asistió' : 'Sin Asistir'}</Typography>
                                                <Typography sx={{ color: 'black', fontSize: '18px' }}>Día 2: {info.assistantInfo?.jrn_inscritos_modulos[0].asistioDia2 ? 'Asistió' : 'Sin Asistir'}</Typography>
                                                <Typography sx={{ color: 'black', fontSize: '18px' }}>Día 3: {info.assistantInfo?.jrn_inscritos_modulos[0].asistioDia3 ? 'Asistió' : 'Sin Asistir'}</Typography>
                                                <Divider sx={{ width: '90%', m: 'auto', mt: 2, mb: 2 }} />
                                                <Typography sx={{ color: 'black', fontSize: '18px', fontWeight: 'bold', textAlign: 'center', width: '100%', mb: 0.5 }}>Talleres</Typography>
                                            </>
                                            :
                                            <>
                                                <Divider sx={{ width: '95%', m: 'auto', mt: 2, mb: 2 }} />
                                                <Typography sx={{ color: 'black', fontSize: '18px', fontWeight: 'bold', textAlign: 'center', width: '100%', mb: 0.5 }}>Congreso</Typography>
                                                <Typography sx={{ color: 'black', fontSize: '18px' }}>Módulo: Ninguno</Typography>
                                                <Divider sx={{ width: '90%', m: 'auto', mt: 2, mb: 2 }} />
                                                <Typography sx={{ color: 'black', fontSize: '18px', fontWeight: 'bold', textAlign: 'center', width: '100%', mb: 0.5 }}>Talleres</Typography>
                                            </>
                                    }
                                    {
                                        info.assistantInfo?.jrn_inscritos_talleres.length !== 0 ?

                                            info.assistantInfo?.jrn_inscritos_talleres.map((taller, index) => (
                                                <Box key={taller.jrn_taller.id} sx={{ mb: index !== info.assistantInfo!.jrn_inscritos_talleres.length - 1 ? 2 : 0 }}>
                                                    <Typography sx={{ color: 'black', fontSize: '18px' }}>Taller: {taller.jrn_taller.nombre}</Typography>
                                                    <Typography sx={{ color: 'black', fontSize: '18px' }}>Asistencia: {taller.asistio ? 'Asistió' : 'Sin Asistir'}</Typography>
                                                </Box>
                                            ))
                                            :
                                            <>
                                                <Divider sx={{ width: '95%', m: 'auto', mt: 2, mb: 2 }} />
                                                <Typography sx={{ color: 'black', fontSize: '18px' }}>Talleres: Ninguno</Typography>
                                            </>
                                    }
                                </DialogContentText>
                            </DialogContent>
                        </Dialog>
                    </Grid>
            }
        </>
    )
}