import { AppBar, Box, Button, Container, Divider, IconButton, Menu, MenuItem, Toolbar, Typography, useMediaQuery } from '@mui/material'
import React, { useContext, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import { PropsUIContext } from '../../interfaces/context/IUIContext';
import { UIContext } from '../../context/UIContext';

const navItem = [
    { name: 'Inicio' },
    { name: 'Programa' },
    { name: 'Sedes' },
    { name: 'Contacto' },
    /* { name: 'Registro', pathTo: 'register' } */
];

export const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const { activeSection, setActiveSection, setDynamic } = useContext<PropsUIContext>(UIContext);
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const goToSection = (pathTo: string) => {
        setAnchorElNav(null);
        setActiveSection(pathTo);
        setDynamic(1);
    };

    return (
        <AppBar position="fixed" sx={{ display: 'flex', backgroundColor: 'background.default' }}>
            <Container maxWidth={'xl'}>
                <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: responsive ? 'none' : 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <NavLink to={'/home'} style={{ marginBottom: -7 }}>
                            <img loading='lazy' src={`${import.meta.env.VITE_APP_BASE_ROUTE}/logo_ver.png`} alt="Logo_ver" width={'auto'} height={'55px'} />
                        </NavLink>
                        <Divider orientation="vertical" variant='middle' flexItem sx={{ ml: 1.5, backgroundColor: 'primary.main' }} />
                        <NavLink to={'/home'} style={{ textDecoration: 'none' }}>
                            <Typography
                                variant="h5"
                                noWrap
                                sx={{
                                    mr: 1,
                                    ml: 1.5,
                                    fontFamily: 'sans-serif',
                                    fontWeight: 700,
                                    letterSpacing: '.1rem',
                                    color: 'primary.main',
                                    textDecoration: 'none',
                                }}
                            >
                                JORNADAS MÉDICAS
                            </Typography>
                        </NavLink>
                    </Box>
                    <Box sx={{ display: responsive ? 'none' : 'flex' }}>
                        {navItem.map((item) => (
                            <Button onClick={() => goToSection(item.name)} key={item.name} sx={{ color: activeSection === item.name ? 'text.secondary' : '#ffffff', fontWeight: 600, textTransform: 'capitalize', fontSize: '16px', transition: 'all 0.5s ease' }}>
                                {item.name}
                            </Button>
                        ))}
                    </Box>

                    {/* responsive */}
                    <Box sx={{ flexGrow: 1, display: responsive ? 'flex' : 'none' }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color='primary'
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: responsive ? 'block' : 'none' }}
                        >
                            {navItem.map((page) => (
                                <MenuItem key={page.name} onClick={() => goToSection(page.name)}>
                                    <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ display: responsive ? 'flex' : 'none', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <NavLink to={'/home'} style={{ display: responsive ? 'flex' : 'none' }}>
                                <img loading='lazy' src={`${import.meta.env.VITE_APP_BASE_ROUTE}/logo_ver.png`} alt="Logo_ver" width={'auto'} height={'55px'} />
                            </NavLink>
                            <Divider orientation="vertical" variant='middle' flexItem sx={{ ml: 1.5, display: responsive ? 'flex' : 'none', backgroundColor: 'primary.main' }} />
                            <NavLink to={'/home'} style={{ textDecoration: 'none' }}>
                                <Typography
                                    variant="h5"
                                    noWrap
                                    sx={{
                                        mr: 2,
                                        ml: 1,
                                        display: responsive ? 'flex' : 'none',
                                        flexGrow: 1,
                                        fontFamily: 'sans-serif',
                                        fontWeight: 700,
                                        color: 'primary.main',
                                        fontSize: '20px',
                                        textDecoration: 'none',
                                    }}
                                >
                                    JORNADAS MÉDICAS
                                </Typography>
                            </NavLink>
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

