import { ReactNode, useState } from "react"
import { UIContext } from "../context/UIContext"

export const UIProvider = ({ children: Component }: { children: ReactNode }) => {
    const [activeSection, setActiveSection] = useState<string>('Inicio');
    const [dynamic, setDynamic] = useState<number>(0);

    return (
        <UIContext.Provider value={{
            activeSection,
            setActiveSection,
            dynamic,
            setDynamic
        }}>
            {Component}
        </UIContext.Provider>
    )
}