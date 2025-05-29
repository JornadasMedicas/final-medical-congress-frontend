import { Divider, Grid, useMediaQuery } from "@mui/material"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from "react";

export const Programa = () => {
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");
    const [value, setValue] = useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Grid container columns={12} sx={{ display: 'flex', minHeight: responsive ? 'auto' : '100vh', flexDirection: 'column', ml: responsive ? 3.5 : 13, mr: responsive ? 3.5 : 13 }}>
            <Grid size={12} sx={{ mb: 5, mt: 3 }}>
                <Divider sx={{ fontFamily: 'sans-serif', fontWeight: 700, fontSize: responsive ? '25px' : '33px', color: 'secondary', width: responsive ? '80%' : '50%', m: 'auto' }}>
                    PROGRAMAS
                </Divider>
            </Grid>
            <Grid size={12} sx={{ textAlign: 'center' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab label="Item One" />
                    <Tab label="Item Two" />
                    <Tab label="Item Three" />
                    <Tab label="Item Four" />
                    <Tab label="Item Five" />
                    <Tab label="Item Six" />
                    <Tab label="Item Seven" />
                </Tabs>
            </Grid>
        </Grid>
    )
}
