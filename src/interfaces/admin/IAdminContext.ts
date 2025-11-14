export interface TablePropsJornadasAdmin {
    assistantsTable: PropsAssistantsTable;
    setAssistantsTableAction: React.Dispatch<React.SetStateAction<PropsAssistantsTable>>;
    printableIds: number[];
    setPrintableIds: React.Dispatch<React.SetStateAction<number[]>>
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