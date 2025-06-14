import { createContext, ReactNode, useState } from "react";
import { PropsModal, PropsUIContext } from "../interfaces/context/IUIContext";

export const UIContext = createContext<PropsUIContext>({
    activeSection: 'Inicio',
    setActiveSection: () => { },
    modalData: { isOpen: false, img: '' },
    setModalData: () => { },
    dynamic: 0,
    setDynamic: () => { }
});

export const UIContextProvider = ({ children: Component }: { children: ReactNode }) => {
    const [activeSection, setActiveSection] = useState<string>('Inicio');
    const [modalData, setModalData] = useState<PropsModal>({ isOpen: false, img: '' });
    const [dynamic, setDynamic] = useState<number>(0);

    return (
        <UIContext value={{
            activeSection,
            setActiveSection,
            modalData,
            setModalData,
            dynamic,
            setDynamic
        }}>
            {Component}
        </UIContext>
    )
}