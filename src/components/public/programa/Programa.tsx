import { Divider, Grid, useMediaQuery } from "@mui/material"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useContext } from 'react';
import { ModalImagen } from "./ModalImagen";
import { RenderProgramas } from './RenderProgramas';
import { programa2023, programa2024, programaTabs } from '../../../helpers/programas/data';
import { Proximamente } from "./Proximamente";
import { motion } from "motion/react";
import { SectionObserver } from "../../ui/SectionObserver";
import UIContext from "../../../context/UIContext";

export const Programa = () => {
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");
    const { programTab, setProgramTab } = useContext(UIContext);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        const selectedTab = programaTabs.find(tab => tab.id === newValue);
        
        if (selectedTab) {
            setProgramTab(selectedTab);
        }
    };

    return (
        <Grid container columns={12} sx={{ display: 'flex', minHeight: responsive ? 'auto' : 'auto', flexDirection: 'column', ml: responsive ? 3 : 20, mr: responsive ? 3 : 20, mt: 2 }}>
            <Grid size={12} sx={{ mb: 2, mt: 0, position: 'relative' }}>
                <SectionObserver sectionId="Programa" />
                <Divider
                    component={motion.div}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.85, ease: 'easeInOut' }}
                    viewport={{ once: true }}
                    sx={{ fontFamily: 'sans-serif', fontWeight: 700, fontSize: responsive ? '25px' : '33px', color: 'text.primary', width: responsive ? '80%' : '50%', m: 'auto' }}>
                    PROGRAMA
                </Divider>
            </Grid>
            <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                <Tabs
                    value={programTab.id}
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
                    {programaTabs.slice().reverse().map((edicion) => (
                        <Tab
                            key={edicion.id}
                            value={edicion.id}
                            sx={{
                                width: '100%',
                                color: 'primary.main',
                                '&.Mui-selected': {
                                    color: 'text.secondary', // color cuando está activo
                                },
                            }}
                            label={edicion.label}
                        />
                    ))}
                </Tabs>
            </Grid>
            <Grid size={12} sx={{ mt: 2, height: '100%' }}>
                {
                    programTab.id === 0 && <RenderProgramas programas={programa2023} />
                }
                {
                    programTab.id === 1 && <RenderProgramas programas={programa2024} />
                }
                {
                    programTab.id === 2 && <Proximamente />
                }
            </Grid>
            <ModalImagen />
        </Grid>
    )
}
