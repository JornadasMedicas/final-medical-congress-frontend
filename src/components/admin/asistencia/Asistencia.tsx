/* import { useEffect, useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, InputAdornment, LinearProgress, TextField, Typography, useMediaQuery } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { globalUpdateAssistance } from '../../helpers/admin/assistanceAlerts';
import { getAssitantInfo } from '../../services/admin/adminService';
import { PropsGetAssistantInfo, ReqAssistantInfo, ReqEventEditions } from '../../interfaces/admin/IAdmin';
import { talleresFiltros } from '../../helpers/admin/data';

export const Asistencia = ({ editions }: { editions: ReqEventEditions[] }) => {
    const [moduleValues, setModuleValues] = useState({ qrdata: '', emaildata: '' });
    const [workshopValues, setWorkshopValues] = useState({ qrdata: '', emaildata: '' });
    const [assistances, setAssistances] = useState({ emaildata: '' });
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [assistantInfo, setAssistantInfo] = useState<PropsGetAssistantInfo>();
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");

    //congress assistance
    const manualAssistance = () => {
        const data = `${moduleValues.emaildata}|`;
        setModuleValues({ qrdata: '', emaildata: '' });
        globalUpdateAssistance(data, 'congreso');
    }

    useEffect(() => {
        const updateAssistance = async () => {
            try {
                const separated = moduleValues.qrdata.split("|").length - 1;

                if (separated === 1) {
                    setModuleValues({ qrdata: '', emaildata: '' });
                    globalUpdateAssistance(moduleValues.qrdata, 'congreso');
                }
            } catch (error) {
                console.log(error);
            }
        }

        updateAssistance();
    }, [moduleValues.qrdata]);

    //workshops assistance
    const manualWorkshopsAssistance = () => {
        const data = `${workshopValues.emaildata}|`;
        setWorkshopValues({ qrdata: '', emaildata: '' });
        globalUpdateAssistance(data, 'talleres');
    }

    useEffect(() => {

        const updateAssistance = async () => {
            try {
                const separated = workshopValues.qrdata.split("|").length - 1;

                if (separated === 1) {
                    setWorkshopValues({ qrdata: '', emaildata: '' });
                    globalUpdateAssistance(workshopValues.qrdata, 'talleres');
                }
            } catch (error) {
                console.log(error);
            }
        }

        updateAssistance();
    }, [workshopValues.qrdata]);

    //modal
    const getAssistant = async () => {
        const assistant: ReqAssistantInfo = await getAssitantInfo(assistances.emaildata);
        setAssistantInfo(assistant.data);
        setOpenModal(true);
    }

    return (
        <>
            {
                editions.length === 0 ?
                    <LinearProgress color='inherit' sx={{ width: '100%', color: 'text.secondary', position: 'absolute', top: 0 }} /> :
                    <Grid container className='animate__animated animate__fadeIn' rowGap={responsive ? 0 : 8.5} columns={12} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <Grid size={'auto'} sx={{ width: '100%' }}>
                            <fieldset style={{ border: '2px inset #00665d', borderRadius: '20px', width: '100%' }}>
                                <legend style={{ margin: 'auto', fontSize: 24, paddingLeft: '1rem', paddingRight: '1rem' }}>
                                    <h1 className='animate__animated animate__fadeIn' style={{ fontSize: 30 }}>
                                        <strong style={{ color: '#b7402a' }}>C</strong>ongreso
                                    </h1>
                                </legend>
                                <Grid size={12} sx={{ mt: 0, mb: 5, pb: 0 }}>
                                    <Box sx={{ flexGrow: 1, marginTop: 0, marginBottom: 3 }}>
                                        <Grid container rowSpacing={5} columns={12} sx={{ flexDirection: { xs: "column", md: "row" } }}>
                                            <Grid size={6} sx={{ display: 'flex', justifyContent: 'center', width: responsive ? '100%' : '50%' }}>
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
                                            <Grid size={6} sx={{ display: 'flex', justifyContent: 'center', width: responsive ? '100%' : '50%' }}>
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
                                        </Grid>
                                    </Box>
                                </Grid>
                            </fieldset>
                        </Grid>
                        <Grid size={'auto'} sx={{ width: '100%' }}>
                            <fieldset style={{ border: '2px inset #00665d', borderRadius: '20px', width: '100%' }}>
                                <legend style={{ margin: 'auto', fontSize: 24, paddingLeft: '1rem', paddingRight: '1rem' }}>
                                    <h1 className='animate__animated animate__fadeIn' style={{ fontSize: 30 }}>
                                        <strong style={{ color: '#b7402a' }}>T</strong>alleres
                                    </h1>
                                </legend>
                                <Grid size={12} sx={{ mt: 0, mb: 5, pb: 0 }}>
                                    <Box sx={{ flexGrow: 1, marginTop: 0, marginBottom: 3 }}>
                                        <Grid container rowSpacing={5} columns={12} sx={{ flexDirection: { xs: "column", md: "row" } }}>
                                            <Grid size={6} sx={{ display: 'flex', justifyContent: 'center', width: responsive ? '100%' : '50%' }}>
                                                <TextField
                                                    label='Registro QR'
                                                    autoComplete='off'
                                                    name='qrdata2'
                                                    value={workshopValues.qrdata}
                                                    onChange={(e) => setWorkshopValues({ ...workshopValues, qrdata: e.target.value })}
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
                                            <Grid size={6} sx={{ display: 'flex', justifyContent: 'center', width: responsive ? '100%' : '50%' }}>
                                                <TextField
                                                    label='Registro Manual (email)'
                                                    autoComplete='off'
                                                    placeholder='asistente@ejemplo.com'
                                                    name='email2'
                                                    value={workshopValues.emaildata}
                                                    onChange={(e) => setWorkshopValues({ ...workshopValues, emaildata: e.target.value })}
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
                                                    onClick={manualWorkshopsAssistance}
                                                    sx={{ color: 'primary.main', backgroundColor: "background.default", ":hover": { backgroundColor: 'primary.main', color: "background.default" }, marginBottom: 0, marginTop: 2, marginLeft: 1, width: '95px', height: '30px' }}
                                                >
                                                    Enviar
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                            </fieldset>
                        </Grid>
                        <Grid size={'auto'} sx={{ width: '100%' }}>
                            <fieldset style={{ border: '2px inset #00665d', borderRadius: '20px', width: '100%' }}>
                                <legend style={{ margin: 'auto', fontSize: 24, paddingLeft: '1rem', paddingRight: '1rem' }}>
                                    <h1 className='animate__animated animate__fadeIn' style={{ fontSize: 30 }}>
                                        <strong style={{ color: '#b7402a' }}>C</strong>onsultar
                                        <strong style={{ color: '#b7402a', marginLeft: 10 }}>A</strong>sistencias
                                    </h1>
                                </legend>
                                <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', width: '100%', mb: 5 }}>
                                    <TextField
                                        label='Captura Manual (email)'
                                        autoComplete='off'
                                        placeholder='asistente@ejemplo.com'
                                        name='email3'
                                        value={assistances.emaildata}
                                        onChange={(e) => setAssistances({ emaildata: e.target.value })}
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
                                        disabled={assistances.emaildata === '' ? true : false}
                                        endIcon={<SendIcon />}
                                        variant='contained'
                                        onClick={getAssistant}
                                        sx={{ color: 'primary.main', backgroundColor: "background.default", ":hover": { backgroundColor: 'primary.main', color: "background.default" }, marginBottom: 0, marginTop: 2, marginLeft: 1, width: '95px', height: '30px' }}
                                    >
                                        Enviar
                                    </Button>
                                </Grid>
                            </fieldset>
                        </Grid>
                        <Dialog
                            open={openModal}
                            onClose={() => setOpenModal(false)}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle sx={{ fontWeight: 'bold', fontFamily: 'typography.fontFamily' }} id="alert-dialog-title">
                                {assistantInfo?.acronimo + ' ' + assistantInfo?.nombre}
                            </DialogTitle>
                            <Divider sx={{ width: '90%', m: 'auto' }} />
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    <Typography sx={{ color: 'black', fontSize: '18px' }}>Correo: {assistantInfo?.correo}</Typography>
                                    <Typography sx={{ color: 'black', fontSize: '18px' }}>Teléfono: {assistantInfo?.tel}</Typography>
                                    <Typography sx={{ color: 'black', fontSize: '18px' }}>Categoría: {assistantInfo?.categoria}</Typography>
                                    <Typography sx={{ color: 'black', fontSize: '18px' }}>Ciudad: {assistantInfo?.ciudad}</Typography>
                                    {
                                        assistantInfo?.jrn_evento[0].modulo !== null ?
                                            <>
                                                <Divider sx={{ width: '90%', m: 'auto', mt: 2, mb: 2 }} />
                                                <Typography sx={{ color: 'black', fontSize: '18px' }}>Módulo: {assistantInfo?.jrn_evento[0].modulo}</Typography>
                                                <Typography sx={{ color: 'black', fontSize: '18px' }}>Día 1: {assistantInfo?.jrn_evento[0].isAssistDay1 ? 'Asistió' : 'Sin Asistir'}</Typography>
                                                <Typography sx={{ color: 'black', fontSize: '18px' }}>Día 2: {assistantInfo?.jrn_evento[0].isAssistDay2 ? 'Asistió' : 'Sin Asistir'}</Typography>
                                                <Typography sx={{ color: 'black', fontSize: '18px' }}>Día 3: {assistantInfo?.jrn_evento[0].isAssistDay3 ? 'Asistió' : 'Sin Asistir'}</Typography>
                                            </>
                                            :
                                            <Typography sx={{ color: 'black', fontSize: '18px' }}>Módulo: NINGUNO</Typography>
                                    }
                                    {
                                        assistantInfo?.jrn_evento[0].isRegisteredT1 &&
                                        <>
                                            <Divider sx={{ width: '90%', m: 'auto', mt: 2, mb: 2 }} />
                                            <Typography sx={{ color: 'black', fontSize: '18px' }}>Taller: {talleresFiltros.filter((item) => item.id === 1)[0].nombre}</Typography>
                                            <Typography sx={{ color: 'black', fontSize: '18px' }}>Asistencia: {assistantInfo?.jrn_evento[0].isAssistT1 ? 'Asistió' : 'Sin Asistir'}</Typography>
                                        </>
                                    }
                                    {
                                        assistantInfo?.jrn_evento[0].isRegisteredT2 &&
                                        <>
                                            <Divider sx={{ width: '90%', m: 'auto', mt: 2, mb: 2 }} />
                                            <Typography sx={{ color: 'black', fontSize: '18px' }}>Taller: {talleresFiltros.filter((item) => item.id === 2)[0].nombre}</Typography>
                                            <Typography sx={{ color: 'black', fontSize: '18px' }}>Asistencia: {assistantInfo?.jrn_evento[0].isAssistT2 ? 'Asistió' : 'Sin Asistir'}</Typography>
                                        </>
                                    }
                                    {
                                        assistantInfo?.jrn_evento[0].isRegisteredT3 &&
                                        <>
                                            <Divider sx={{ width: '90%', m: 'auto', mt: 2, mb: 2 }} />
                                            <Typography sx={{ color: 'black', fontSize: '18px' }}>Taller: {talleresFiltros.filter((item) => item.id === 3)[0].nombre}</Typography>
                                            <Typography sx={{ color: 'black', fontSize: '18px' }}>Asistencia: {assistantInfo?.jrn_evento[0].isAssistT3 ? 'Asistió' : 'Sin Asistir'}</Typography>
                                        </>
                                    }
                                    {
                                        assistantInfo?.jrn_evento[0].isRegisteredT4 &&
                                        <>
                                            <Divider sx={{ width: '90%', m: 'auto', mt: 2, mb: 2 }} />
                                            <Typography sx={{ color: 'black', fontSize: '18px' }}>Taller: {talleresFiltros.filter((item) => item.id === 4)[0].nombre}</Typography>
                                            <Typography sx={{ color: 'black', fontSize: '18px' }}>Asistencia: {assistantInfo?.jrn_evento[0].isAssistT4 ? 'Asistió' : 'Sin Asistir'}</Typography>
                                        </>
                                    }
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={() => setOpenModal(false)} sx={{
                                    color: 'primary.main', backgroundColor: "background.default", ":hover": { backgroundColor: 'primary.main', color: "background.default", boxShadow: 3 }
                                }}>Cerrar</Button>
                            </DialogActions>
                        </Dialog>
                    </Grid>
            }
        </>
    )
}
 */