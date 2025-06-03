import { createContext } from "react";
import { PropsUIContext } from "../interfaces/context/IUIContext";

export const UIContext = createContext<PropsUIContext>({
    activeSection: 'Inicio',
    setActiveSection: () => { },
    modalData: { isOpen: false, img: '' },
    setModalData: () => { },
    dynamic: 0,
    setDynamic: () => { }
});