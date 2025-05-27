import { createContext } from "react";
import { PropsUIContext } from "../interfaces/context/IUIContext";

export const UIContext = createContext<PropsUIContext>({
    activeSection: 'Inicio',
    setActiveSection: () => { },
    dynamic: 0,
    setDynamic: () => { }
});