import { Button, Grid, InputAdornment, LinearProgress, TextField, Typography, useMediaQuery } from '@mui/material'
import { ReqEventEditions } from '../../../interfaces/admin/IAdmin';
import Diversity3SharpIcon from '@mui/icons-material/Diversity3Sharp';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SendIcon from '@mui/icons-material/Send';
import HubSharpIcon from '@mui/icons-material/HubSharp';
import InfoOutlineRoundedIcon from '@mui/icons-material/InfoOutlineRounded';
import { useState } from 'react';

export const Asistencia = ({ editions }: { editions: ReqEventEditions[] }) => {
    const [moduleValues, setModuleValues] = useState({ qrdata: '', emaildata: '' });
    const [assistances, setAssistances] = useState({ emaildata: '' });
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");

    return (
        <>
            {
                editions.length === 0 ?
                    <LinearProgress color='inherit' sx={{ width: '100%', color: 'text.secondary', position: 'absolute', top: 0 }} />
                    :
                    <Grid container size={12} spacing={4}>
                        <Grid size={responsive ? 12 : 6} sx={{ display: 'flex', m: 'auto', borderRadius: 2, boxShadow: 1, flexDirection: 'column' }}>
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
                                    /* onClick={manualAssistance} */
                                    sx={{ color: 'primary.main', backgroundColor: "background.default", ":hover": { backgroundColor: 'primary.main', color: "background.default" }, marginBottom: 0, marginTop: 2, marginLeft: 1, width: '95px', height: '30px' }}
                                >
                                    Enviar
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid size={responsive ? 12 : 6} sx={{ display: 'flex', m: 'auto', borderRadius: 2, boxShadow: 1, flexDirection: 'column' }}>
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
                                    /* onClick={manualAssistance} */
                                    sx={{ color: 'primary.main', backgroundColor: "background.default", ":hover": { backgroundColor: 'primary.main', color: "background.default" }, marginBottom: 0, marginTop: 2, marginLeft: 1, width: '95px', height: '30px' }}
                                >
                                    Enviar
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid size={responsive ? 12 : 6} sx={{ display: 'flex', m: 'auto', borderRadius: 2, boxShadow: 1, flexDirection: 'column' }}>
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
                                    /* onClick={manualAssistance} */
                                    sx={{ color: 'primary.main', backgroundColor: "background.default", ":hover": { backgroundColor: 'primary.main', color: "background.default" }, marginBottom: 0, marginTop: 2, marginLeft: 1, width: '95px', height: '30px' }}
                                >
                                    Enviar
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
            }
        </>
    )
}