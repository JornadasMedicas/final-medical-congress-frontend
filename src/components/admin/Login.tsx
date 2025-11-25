import { useState } from 'react'
import { Button, TextField, Typography, useMediaQuery } from '@mui/material';
import { Box, Grid } from '@mui/system';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Swal from 'sweetalert2';
import { navBarHeigth, navBarHeigthResponsive } from '../../pages/HomePage';

export const regexRFC = /^[A-Za-z0-9]*$/;

export const Login = () => {
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    const handleSubmit = () => {
        const isValidUser =
            (credentials.username === import.meta.env.VITE_APP_ADMIN_USERNAME &&
                credentials.password === import.meta.env.VITE_APP_ADMIN_PASSWORD) ||

            (credentials.username === import.meta.env.VITE_APP_ADMIN_USERNAME2 &&
                credentials.password === import.meta.env.VITE_APP_ADMIN_PASSWORD2) ||

            (credentials.username === import.meta.env.VITE_APP_ADMIN_USERNAME3 &&
                credentials.password === import.meta.env.VITE_APP_ADMIN_PASSWORD3);


        console.log(isValidUser);

        console.log({
            username: credentials.username,
            expected1: import.meta.env.VITE_APP_ADMIN_USERNAME2,
            password: credentials.password,
            expectedPass1: import.meta.env.VITE_APP_ADMIN_PASSWORD2
        });



        if (isValidUser) {
            localStorage.setItem('user', JSON.stringify(credentials));
            window.location.reload();
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: 'Credenciales incorrectas',
                showConfirmButton: true,
                confirmButtonColor: '#d37c6b'
            });
        }
    }

    return (
        <Grid container sx={{ pt: responsive ? `${navBarHeigthResponsive}px` : `${navBarHeigth}px`, mt: 3, mb: 3 }}>
            <Grid size={12} sx={{ height: '80.9vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ width: responsive ? '95%' : '28%', boxShadow: '0 8px 10px 0 rgba(1,18,38, 0.15)', borderRadius: '20px' }}>
                    <Grid size={12} sx={{ height: '15%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(90deg, rgba(83,115,109,1) 0%, rgba(19,50,44,1) 48%, rgba(36,70,63,1) 100%);', borderTopLeftRadius: 18, borderTopRightRadius: 18, pt: 3, pb: 3 }}>
                        <VpnKeyIcon sx={{ width: 'auto', height: '60px', color: 'white', transform: 'rotate(90deg)' }} />
                    </Grid>
                    <Grid size={12} sx={{ p: 5, height: '85%', display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <Box>
                            <Typography fontWeight={'bold'} sx={{ textAlign: 'left' }}>Usuario: </Typography>
                            <TextField
                                value={credentials.username}
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
                                onChange={(e) => setCredentials({ ...credentials, username: regexRFC.test(e.target.value) ? e.target.value : credentials.username })}
                            />
                        </Box>
                        <Box>
                            <Typography fontWeight={'bold'} sx={{ textAlign: 'left' }}>Contraseña: </Typography>
                            <TextField
                                value={credentials.password}
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
                                type='password'
                                size='small'
                                onChange={(e) => setCredentials({ ...credentials, password: regexRFC.test(e.target.value) ? e.target.value : credentials.password })}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button onClick={handleSubmit} variant="contained" sx={{ color: 'primary.main', backgroundColor: 'background.default' }}>
                                Entrar
                            </Button>
                        </Box>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    )
}
