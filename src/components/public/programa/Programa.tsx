import { Divider, Grid, useMediaQuery } from "@mui/material"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from "react";
import { ModalImagen } from "./ModalImagen";
import { RenderProgramas } from './RenderProgramas';
import { programa2023, programa2024 } from '../../../helpers/programas/data';
import { Proximamente } from "./Proximamente";

export const Programa = () => {
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");
    const [tab, setTab] = useState<number>(1);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    return (
        <Grid container columns={12} sx={{ display: 'flex', minHeight: responsive ? 'auto' : '100vh', flexDirection: 'column', ml: responsive ? 3 : 13, mr: responsive ? 3 : 13, mt: 2 }}>
            <Grid size={12} sx={{ mb: 2, mt: 3 }}>
                <Divider sx={{ fontFamily: 'sans-serif', fontWeight: 700, fontSize: responsive ? '25px' : '33px', color: 'text.primary', width: responsive ? '80%' : '50%', m: 'auto' }}>
                    PROGRAMA
                </Divider>
            </Grid>
            <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                <Tabs
                    value={tab}
                    onChange={handleChange}
                    variant="fullWidth"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                    sx={{
                        backgroundColor: 'background.default',
                        borderRadius: 2,
                        width: responsive ? '100%' : '50%',
                        '& .MuiTabs-indicator': {
                            backgroundColor: 'text.secondary'
                        },
                    }}
                >
                    <Tab sx={{
                        width: '100%',
                        color: 'primary.main',
                        '&.Mui-selected': {
                            color: 'text.secondary', // color cuando está activo
                        },
                    }} label="2025" />
                    <Tab sx={{
                        width: '100%',
                        color: 'primary.main',
                        '&.Mui-selected': {
                            color: 'text.secondary', // color cuando está activo
                        },
                    }} label="2024" />
                    <Tab sx={{
                        width: '100%',
                        color: 'primary.main',
                        '&.Mui-selected': {
                            color: 'text.secondary', // color cuando está activo
                        },
                    }} label="2023" />
                </Tabs>
            </Grid>
            <Grid size={12} sx={{ mt: 2, mb: responsive ? 0 : 2, height: '100%' }}>
                {
                    tab === 0 && <Proximamente />
                }
                {
                    tab === 1 && <RenderProgramas programas={programa2024} />
                }
                {
                    tab === 2 && <RenderProgramas programas={programa2023} />
                }
            </Grid>
            <ModalImagen />
        </Grid>
    )
}
