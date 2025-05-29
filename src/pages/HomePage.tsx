import { Box, Stack, useMediaQuery } from "@mui/material"
import { useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import { PropsUIContext } from "../interfaces/context/IUIContext";
import { UIContext } from "../context/UIContext";
import { Inicio } from "../components/public/inicio/Inicio";
import { Programa } from "../components/public/programa/Programa";
import { Sedes } from "../components/public/sedes/Sedes";
import { Contacto } from "../components/public/contacto/Contacto";

export const navBarHeigth: number = 64;
export const navBarHeigthResponsive: number = 54;

export const HomePage = () => {
    const location = useLocation();
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");
    const { dynamic } = useContext<PropsUIContext>(UIContext);

    useEffect(() => {
        const section: string | null = new URLSearchParams(location.search).get('section');
        if (section) {
            const sectionElement: HTMLElement | null = document.getElementById(section);

            if (sectionElement && dynamic === 1) {
                window.scrollTo({
                    top: sectionElement.offsetTop - (responsive ? navBarHeigthResponsive : navBarHeigth),
                    behavior: 'smooth'
                });
            }
        }
    }, [location.search, responsive, dynamic]);

    return (
        <Stack>
            <Box component="section" id="Inicio">
                <Inicio />
            </Box>
            <Box component="section" id="Programa">
                <Programa />
            </Box>
            <Box component="section" id="Sedes">
                <Sedes />
            </Box>
            <Box component="section" id="Contacto">
                <Contacto />
            </Box>
        </Stack>
    )
}