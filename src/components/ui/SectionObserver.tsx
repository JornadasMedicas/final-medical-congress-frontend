import { useContext, useEffect, useRef } from "react";
import { PropsUIContext } from "../../interfaces/context/IUIContext";
import UIContext from "../../context/UIContext";
import { useInView } from "motion/react";
import { Box } from "@mui/material";

interface Props {
    sectionId: string;
}

export const SectionObserver = ({ sectionId }: Props) => {
    const { setActiveSection, setTriggerRelocation } = useContext<PropsUIContext>(UIContext);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false });

    useEffect(() => {
        if (isInView) {
            setActiveSection(sectionId);
            setTriggerRelocation(false);
        }
    }, [isInView, setActiveSection, setTriggerRelocation]);

    return <Box ref={ref} sx={{ position: 'absolute' }} />;
}
