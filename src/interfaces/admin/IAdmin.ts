import { PropsTableAssistantsFilters } from "./IAdminContext";

export interface ReqAssistants {
    msg: string;
    ok: boolean;
    data: PropsGetAssistantsInterface[];
}

export interface PropsGetAssistantsInterface {
    id: number;
    acronimo: string;
    nombre: string;
    correo: string;
    tel: string;
    created_at: string;
}

export interface PropsGetAssistantsFilters extends PropsTableAssistantsFilters {
    limit: string;
    page: number;
}

export interface ReqGenCatalogs {
    id: number;
    nombre: string;
}

export interface ReqAssistantsTableData {
    rows: PropsGetAssistantsInterface[];
    totalRows: number;
    editions: ReqEventEditions[];
    modulos: ReqGenCatalogs[];
    talleres: ReqGenCatalogs[];
}

export interface ReqAssistantsAutocompleteInterface {
    id: number | null;
    nombre: string;
    correo: string;
}

export interface ReqAssistantsAutocomplete {
    ok: boolean;
    msg: string;
    data: ReqAssistantsAutocompleteInterface[]
}

export interface ReqAssistantsTotalCount {
    ok: boolean;
    msg: string;
    data: number
}


export interface PropsGetAssistants {
    limit: string;
    page: string;
    email: string;
    module: string;
    workshop: string;
}

export interface PropsGetAssistantInfo {
    id: number;
    acronimo: string;
    categoria: string;
    ciudad: string;
    correo: string;
    nombre: string;
    tel: string;
    jrn_evento: PropsJrnEventoTable[]
}

export interface PropsJrnEventoTable {
    modulo: string;
    isRegisteredT1: boolean;
    isRegisteredT2: boolean;
    isRegisteredT3: boolean;
    isRegisteredT4: boolean;
    isAssistDay1: boolean;
    isAssistDay2: boolean;
    isAssistDay3: boolean;
    isAssistT1: boolean;
    isAssistT2: boolean;
    isAssistT3: boolean;
    isAssistT4: boolean;
}

export interface ReqAssistantInfo {
    msg: string;
    ok: boolean;
    data: PropsGetAssistantInfo;
}

export interface ReqEventEditions {
    id: number;
    edicion: string;
}

export interface ReqCountCatalogs {
    ediciones: number;
    modulos: number;
    talleres: number;
    categorias: number;
    constancias: number;
}

export interface PropsAdminToolCards {
    id: number;
    Icon: any;
    title: string;
    description: string;
    label: string;
    registries: number;
    Cmp: React.ComponentType<any> | null;
}

export interface PropsCreateEdition {
    edicion: string;
    fec_inicial: string;
    fec_final: string;
}