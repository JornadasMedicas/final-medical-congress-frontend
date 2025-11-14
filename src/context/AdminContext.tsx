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
    printableIds: [] as number[],
    setPrintableIds: () => { }
});

export const AdminContextProvider = ({ children: Component }: { children: ReactNode }) => {
    const [assistantsTable, setAssistantsTableAction] = useState<PropsAssistantsTable>(tableValues);
    const [printableIds, setPrintableIds] = useState<number[]>([]);

    return (
        <AdminContext value={{
            assistantsTable,
            setAssistantsTableAction,
            printableIds,
            setPrintableIds
        }}>
            {Component}
        </AdminContext>
    )
}

export default AdminContext;