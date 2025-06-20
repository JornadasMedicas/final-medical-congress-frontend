import { createContext, ReactNode, useState } from "react";
import { PropsModal, PropsUIContext } from "../interfaces/context/IUIContext";
import { programaTabs } from "../helpers/programas/data";

const UIContext = createContext<PropsUIContext>({
    activeSection: 'Inicio',
    setActiveSection: () => { },
    programTab: programaTabs[programaTabs.length - 1].id,
    setProgramTab: () => { },
    modalData: { isOpen: false, img: '' },
    setModalData: () => { },
    triggerRelocation: false,
    setTriggerRelocation: () => { }
});

export const UIContextProvider = ({ children: Component }: { children: ReactNode }) => {
    const [activeSection, setActiveSection] = useState<string>('Inicio');
    const [programTab, setProgramTab] = useState<number>(programaTabs[programaTabs.length - 1].id);
    const [modalData, setModalData] = useState<PropsModal>({ isOpen: false, img: '' });
    const [triggerRelocation, setTriggerRelocation] = useState<boolean>(false);

    return (
        <UIContext value={{
            activeSection,
            setActiveSection,
            programTab,
            setProgramTab,
            modalData,
            setModalData,
            triggerRelocation,
            setTriggerRelocation
        }}>
            {Component}
        </UIContext>
    )
}

export default UIContext;