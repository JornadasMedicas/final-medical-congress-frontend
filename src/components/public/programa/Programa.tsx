import { Box, Divider, Grid, useMediaQuery } from "@mui/material"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from "react";
import { Jornadas2025 } from "./Jornadas2025";
import { Jornadas2024 } from "./Jornadas2024";

export const Programa = () => {
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");
    const [tab, setTab] = useState<number>(1);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    const TabPanel = ({ children, value, index }: { children?: React.ReactNode; value: number; index: number }) => {
        return (
            <>
                {value === index && (
                    <Box role="tabpanel" sx={{ display: 'flex', justifyContent: 'center'}}>
                        {children}
                    </Box>
                )}
            </>
        );
    }

    return (
        <Grid container columns={12} sx={{ display: 'flex', minHeight: responsive ? 'auto' : '100vh', flexDirection: 'column', ml: responsive ? 3.5 : 13, mr: responsive ? 3.5 : 13 }}>
            <Grid size={12} sx={{ mb: 2, mt: 3 }}>
                <Divider sx={{ fontFamily: 'sans-serif', fontWeight: 700, fontSize: responsive ? '25px' : '33px', color: 'secondary', width: responsive ? '80%' : '50%', m: 'auto' }}>
                    PROGRAMAS
                </Divider>
            </Grid>
            <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', mb: responsive ? 1 : 1 }}>
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
                            backgroundColor: 'primary.main'
                        }
                    }}
                >
                    <Tab sx={{ width: '100%' }} label="2025" />
                    <Tab sx={{ width: '100%' }} label="2024" />
                </Tabs>
            </Grid>
            <Grid size={12} sx={{ mt: 2, mb: 2 }}>
                <TabPanel value={tab} index={0}>
                    <Jornadas2025 />
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <Jornadas2024 />
                </TabPanel>
            </Grid>
        </Grid>
    )
}
