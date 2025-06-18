import { createContext, ReactNode, useState } from "react";
import { PropsAssistantsTable, TablePropsJornadasAdmin } from "../interfaces/admin/IAdminContext";
import dayjs from "dayjs";

const tableValues = {
    tablePage: 0,
    totalRows: 0,
    loading: false,
    filters: {
        email: '',
        module: '',
        workshop: '',
        year: dayjs().year().toString()
    }
}

const AdminContext = createContext<TablePropsJornadasAdmin>({
    assistantsTable: tableValues,
    setAssistantsTableAction: () => { },
});

export const AdminContextProvider = ({ children: Component }: { children: ReactNode }) => {
    const [assistantsTable, setAssistantsTableAction] = useState<PropsAssistantsTable>(tableValues);

    return (
        <AdminContext value={{
            assistantsTable,
            setAssistantsTableAction
        }}>
            {Component}
        </AdminContext>
    )
}

export default AdminContext;