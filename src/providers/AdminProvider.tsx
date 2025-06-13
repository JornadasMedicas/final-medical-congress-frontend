import { ReactNode, useState } from "react";
import { PropsAssistantsTable } from "../interfaces/admin/AdminContext";
import { AdminContext, tableValues } from "../context/AdminContext";

export const AdminProvider = ({ children: Component }: { children: ReactNode }) => {
    const [assistantsTable, setAssistantsTableAction] = useState<PropsAssistantsTable>(tableValues);

    return (
        <AdminContext.Provider value={{
            assistantsTable,
            setAssistantsTableAction
        }}>
            {Component}
        </AdminContext.Provider>
    )
}