import { ReactNode, useState } from "react"
import { UIContext } from "../context/UIContext"
import { PropsModal } from "../interfaces/context/IUIContext";

export const UIProvider = ({ children: Component }: { children: ReactNode }) => {
    const [activeSection, setActiveSection] = useState<string>('Inicio');
    const [modalData, setModalData] = useState<PropsModal>({ isOpen: false, img: '' });
    const [dynamic, setDynamic] = useState<number>(0);

    return (
        <UIContext.Provider value={{
            activeSection,
            setActiveSection,
            modalData,
            setModalData,
            dynamic,
            setDynamic
        }}>
            {Component}
        </UIContext.Provider>
    )
}