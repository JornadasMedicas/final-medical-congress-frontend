import { createContext, ReactNode, useState } from "react";
import { PropsModalAdmin, PropsModalImg, PropsUIContext } from "../interfaces/context/IUIContext";
import { programaTabs } from "../helpers/programas/data";

const UIContext = createContext<PropsUIContext>({
    activeSection: 'Inicio',
    setActiveSection: () => { },
    programTab: programaTabs[programaTabs.length - 1].id,
    setProgramTab: () => { },
    modalAdminData: { isOpen: false },
    setModalAdminData: () => { },
    modalProgramData: { isOpen: false, img: '' },
    setModalProgramData: () => { },
    triggerRelocation: false,
    setTriggerRelocation: () => { }
});

export const UIContextProvider = ({ children: Component }: { children: ReactNode }) => {
    const [activeSection, setActiveSection] = useState<string>('Inicio');
    const [programTab, setProgramTab] = useState<number>(programaTabs[programaTabs.length - 1].id);
    const [modalProgramData, setModalProgramData] = useState<PropsModalImg>({ isOpen: false, img: '' });
    const [modalAdminData, setModalAdminData] = useState<PropsModalAdmin>({ isOpen: false, img: '' });
    const [triggerRelocation, setTriggerRelocation] = useState<boolean>(false);

    return (
        <UIContext value={{
            activeSection,
            setActiveSection,
            programTab,
            setProgramTab,
            modalProgramData,
            setModalProgramData,
            modalAdminData,
            setModalAdminData,
            triggerRelocation,
            setTriggerRelocation
        }}>
            {Component}
        </UIContext>
    )
}

export default UIContext;