import { createContext, ReactNode, useState } from "react";
import { PropsModal, PropsUIContext } from "../interfaces/context/IUIContext";

const UIContext = createContext<PropsUIContext>({
    activeSection: 'Inicio',
    setActiveSection: () => { },
    modalData: { isOpen: false, img: '' },
    setModalData: () => { },
    triggerRelocation: false,
    setTriggerRelocation: () => { }
});

export const UIContextProvider = ({ children: Component }: { children: ReactNode }) => {
    const [activeSection, setActiveSection] = useState<string>('Inicio');
    const [modalData, setModalData] = useState<PropsModal>({ isOpen: false, img: '' });
    const [triggerRelocation, setTriggerRelocation] = useState<boolean>(false);

    return (
        <UIContext value={{
            activeSection,
            setActiveSection,
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