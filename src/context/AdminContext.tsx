import { createContext, ReactNode, useState } from "react";
import { PropsAssistantsTable, TablePropsJornadasAdmin } from "../interfaces/admin/AdminContext";

export const tableValues = {
    tablePage: 0,
    totalRows: 0,
    loading: false,
    filters: {
        email: '',
        module: '',
        workshop: '',
        year: ''
    }
}

export const AdminContext = createContext<TablePropsJornadasAdmin>({
    assistantsTable: tableValues,
    setAssistantsTableAction: () => { },
});

export const AdminContextProvider = ({ children: Component }: { children: ReactNode }) => {
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