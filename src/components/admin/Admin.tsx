import { useContext, useEffect, useState } from 'react'
import { Box, Grid, Tab, useMediaQuery } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Groups2Icon from '@mui/icons-material/Groups2';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useLocation } from 'react-router-dom';
import { Login } from './Login';
import { navBarHeigth, navBarHeigthResponsive } from '../../pages/HomePage';
import UIContext from '../../context/UIContext';
/* import { Asistencia } from './Asistencia'; */
import { Asistentes } from './Asistentes';
import { getEventEditions } from '../../services/admin/adminService';
import { ReqEventEditions } from '../../interfaces/admin/IAdmin';

const Admin = () => {
    const { setActiveSection } = useContext(UIContext);
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");
    const { pathname } = useLocation();
    const [editions, setEditions] = useState<ReqEventEditions[]>([]);
    const [localStorageUser] = useState<{ username: string, password: string } | null>(() => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    });

    const [tab, setTab] = useState<string>(() => {
        const tab = localStorage.getItem('adminTab');
        return tab ? JSON.parse(tab) : '2';
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        setActiveSection('Admin');
    }, [pathname, setActiveSection]);

    const handleTab = (value: string) => {
        setTab(value);
        localStorage.setItem('adminTab', JSON.stringify(value));
    }

    useEffect(() => {
        getEventEditions().then(((res: ReqEventEditions[]) => {
            if (res.length > 0) {
                setEditions(res);
            }
        }));
    }, []);

    return (
        <>
            {
                localStorageUser === null ?
                    <Login />
                    :
                    <Grid container sx={{ pt: responsive ? `${navBarHeigthResponsive}px` : `${navBarHeigth}px`, mt: 3, mb: 3 }}>
                        <Grid size={12}>
                            <TabContext value={tab}>
                                <TabList
                                    slotProps={{ indicator: { style: { backgroundColor: "#bd4f2b" } } }}
                                    onChange={(_e, value) => handleTab(value)}
                                    variant='fullWidth'
                                    sx={{ maxHeight: 55, borderRadius: 3, boxShadow: 4, ml: 'auto', mr: 'auto', maxWidth: responsive ? '95%' : '40%' }}
                                >
                                    <Tab icon={<PersonAddIcon color="action" />} iconPosition='start' sx={{ fontWeight: 'bold', paddingTop: 0 }} label={<span style={{ color: tab === '1' ? 'black' : 'gray' }}>Registro Asistencia</span>} value="1" />
                                    <Tab icon={<Groups2Icon color="action" />} iconPosition='start' sx={{ fontWeight: 'bold', paddingTop: 0 }} label={<span style={{ color: tab === '2' ? 'black' : 'gray' }}>Asistentes</span>} value="2" />
                                </TabList>
                                <Box sx={{ borderRadius: 3, boxShadow: 4, marginTop: 2, width: responsive ? '95%' : '90%', height: 'auto', ml: 'auto', mr: 'auto', position: 'relative' }}>
                                    <TabPanel value="1" sx={{ m: 0, p: responsive ? 0 : 2, display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
                                        {/* <Asistencia editions={editions} /> */}
                                    </TabPanel>
                                    <TabPanel value="2" sx={{ m: 0, p: 0, display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
                                        <Asistentes editions={editions} />
                                    </TabPanel>
                                </Box>
                            </TabContext>
                        </Grid>
                    </Grid>
            }
        </>
    )
}

export default Admin;
