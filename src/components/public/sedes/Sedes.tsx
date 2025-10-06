import { sedes2023, sedes2024, sedes2025 } from "../../../helpers/sedes/data";
import { useContext } from "react";
import UIContext from "../../../context/UIContext";
import { RenderSedes } from "./RenderSedes";

export const Sedes = () => {
    const { programTab } = useContext(UIContext);

    return (
        <>
            {
                programTab.id === 2 && <RenderSedes sedes={sedes2025} />
            }
            {
                programTab.id === 1 && <RenderSedes sedes={sedes2024} />
            }
            {
                programTab.id === 0 && <RenderSedes sedes={sedes2023} />
            }
        </>
    )
}
