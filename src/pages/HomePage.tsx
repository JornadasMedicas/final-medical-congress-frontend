import { Box, Stack, useMediaQuery } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { PropsUIContext } from "../interfaces/context/IUIContext";
import { UIContext } from "../context/UIContext";
import { Inicio } from "../components/public/inicio/Inicio";
import { Sedes } from "../components/public/sedes/Sedes";
import { Contacto } from "../components/public/contacto/Contacto";
import { Programa } from "../components/public/programa/Programa";

export const navBarHeigth: number = 64;
export const navBarHeigthResponsive: number = 54;

//Memo components to prevent unnecessary re-renders when changing activeSection fron Navbar
const MemoizedInicio = React.memo(Inicio);
const MemoizedPrograma = React.memo(Programa);
const MemoizedSedes = React.memo(Sedes);
const MemoizedContacto = React.memo(Contacto);

const HomePage = () => {
    const responsive: boolean = useMediaQuery("(max-width : 1050px)");
    const { dynamic, activeSection } = useContext<PropsUIContext>(UIContext);

    useEffect(() => {
        if (activeSection) {
            const sectionElement: HTMLElement | null = document.getElementById(activeSection);

            if (sectionElement && dynamic === 1) {
                window.scrollTo({
                    top: sectionElement.offsetTop - (responsive ? navBarHeigthResponsive : navBarHeigth),
                    behavior: 'smooth'
                });
            }
        }
    }, [activeSection]);
    
    return (
        <Stack>
            <Box component="section" id="Inicio">
                <MemoizedInicio />
            </Box>
            <Box component="section" id="Programa">
                <MemoizedPrograma />
            </Box>
            <Box component="section" id="Sedes">
                <MemoizedSedes />
            </Box>
            <Box component="section" id="Contacto">
                <MemoizedContacto />
            </Box>
        </Stack>
    )
}

export default HomePage;