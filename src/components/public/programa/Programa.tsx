import { Divider, Grid, useMediaQuery } from "@mui/material"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useContext, useEffect, useRef, useState } from "react";
import { ModalImagen } from "./ModalImagen";
import { RenderProgramas } from './RenderProgramas';
import { programa2023, programa2024, programaTabs } from '../../../helpers/programas/data';
import { Proximamente } from "./Proximamente";
import { motion, useInView } from "motion/react";
import { PropsUIContext } from "../../../interfaces/context/IUIContext";
import UIContext from "../../../context/UIContext";

export const Programa = () => {
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");
    const [tab, setTab] = useState<number>(programaTabs[programaTabs.length - 1].id);
    const { setActiveSection, setTriggerRelocation } = useContext<PropsUIContext>(UIContext);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false });

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    useEffect(() => {
        if (isInView) {
            setActiveSection('Programa');
            setTriggerRelocation(false);
        }
    }, [isInView, setActiveSection, setTriggerRelocation]);

    return (
        <Grid container columns={12} sx={{ display: 'flex', minHeight: responsive ? 'auto' : 'auto', flexDirection: 'column', ml: responsive ? 3 : 20, mr: responsive ? 3 : 20, mt: 2 }}>
            <Grid size={12} sx={{ mb: 2, mt: 0 }}>
                <Divider
                    ref={ref}
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
                    tab === 0 && <RenderProgramas programas={programa2023} />
                }
                {
                    tab === 1 && <RenderProgramas programas={programa2024} />
                }
                {
                    tab === 2 && <Proximamente />
                }
            </Grid>
            <ModalImagen />
        </Grid>
    )
}
