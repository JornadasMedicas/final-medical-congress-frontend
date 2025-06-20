import { sedes2023, sedes2024 } from "../../../helpers/sedes/data";
import { useContext } from "react";
import UIContext from "../../../context/UIContext";
import { RenderSedes } from "./RenderSedes";

export const Sedes = () => {
    const { programTab } = useContext(UIContext);

    return (
        <>
            {
                programTab === 1 && <RenderSedes sedes={sedes2024} />
            }
            {
                programTab === 0 && <RenderSedes sedes={sedes2023} />
            }
        </>
    )
}
