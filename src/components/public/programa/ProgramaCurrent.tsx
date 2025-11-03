import { Divider, Grid, useMediaQuery } from "@mui/material"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import { ModalImagen } from "./ModalImagen";
import { motion } from "motion/react";
import { SectionObserver } from "../../ui/SectionObserver";
import { RenderSingleProgram } from "./RenderSingleProgram";

export const ProgramaCurrent = () => {
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");
    const [programTab, setProgramTab] = useState<number>(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setProgramTab(newValue);
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
                    value={programTab}
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
                    <Tab
                        sx={{
                            width: '100%',
                            color: 'primary.main',
                            '&.Mui-selected': {
                                color: 'text.secondary', // color cuando está activo
                            },
                        }}
                        label={'Medicina'}
                    />
                    <Tab
                        sx={{
                            width: '100%',
                            color: 'primary.main',
                            '&.Mui-selected': {
                                color: 'text.secondary', // color cuando está activo
                            },
                        }}
                        label={'Enfermería'}
                    />
                    <Tab
                        sx={{
                            width: '100%',
                            color: 'primary.main',
                            '&.Mui-selected': {
                                color: 'text.secondary', // color cuando está activo
                            },
                        }}
                        label={'Químicos'}
                    />
                    <Tab
                        sx={{
                            width: '100%',
                            color: 'primary.main',
                            '&.Mui-selected': {
                                color: 'text.secondary', // color cuando está activo
                            },
                        }}
                        label={'Estomatología'}
                    />
                </Tabs>
            </Grid>
            <Grid size={12} sx={{ mt: 2, height: '100%' }}>
                {
                    programTab === 0 &&  <RenderSingleProgram image={`${import.meta.env.VITE_APP_BASE_ROUTE}/programas/2025/PROGRAMA_MEDICOS.webp`} url={'PROGRAMA_MEDICOS.pdf'} />
                }
                {
                    programTab === 1 && <RenderSingleProgram image={`${import.meta.env.VITE_APP_BASE_ROUTE}/programas/2025/TRIPTICO_ENF.webp`} url={'TRIPTICO_ENF.pdf'} />
                }
                {
                    programTab === 2 && <RenderSingleProgram image={`${import.meta.env.VITE_APP_BASE_ROUTE}/programas/2025/PROGRAMA-QUIMICOS.webp`} url={'PROGRAMA_QUIMICOS.pdf'} />
                }
                {
                    programTab === 3 && <RenderSingleProgram image={`${import.meta.env.VITE_APP_BASE_ROUTE}/programas/2025/TRIPTICO_EST.webp`} url={'TRIPTICO_EST.pdf'} />
                }
            </Grid>
            <ModalImagen />
        </Grid>
    )
}
