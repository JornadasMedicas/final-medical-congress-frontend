import { createContext } from "react";
import { TablePropsJornadasAdmin } from "../interfaces/admin/AdminContext";

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