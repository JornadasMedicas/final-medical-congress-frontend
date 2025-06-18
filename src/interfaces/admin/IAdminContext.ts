export interface TablePropsJornadasAdmin {
    assistantsTable: PropsAssistantsTable;
    setAssistantsTableAction: React.Dispatch<React.SetStateAction<PropsAssistantsTable>>;
}

export interface PropsTableAssistantsFilters {
    email: string;
    module: string;
    workshop: string;
    year: string;
}

export interface PropsAssistantsTable {
    tablePage: number;
    totalRows: number;
    loading: boolean;
    filters: PropsTableAssistantsFilters;
}