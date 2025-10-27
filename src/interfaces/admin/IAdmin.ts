import { PropsTableAssistantsFilters } from "./IAdminContext";

export interface ReqAssistants {
    msg: string;
    ok: boolean;
    data: PropsGetAssistantsInterface[];
}

export interface PropsJrnModulo {
    costo: number;
    nombre: string;
}

export interface PropsJrnEdicion {
    gratuito: boolean;
}

export interface PropsJrnInscritosModulos {
    jrn_modulo: PropsJrnModulo;
    jrn_edicion: PropsJrnEdicion;
    pagado: boolean;
}

export interface PropsGetAssistantsInterface {
    id: number;
    acronimo: string;
    nombre: string;
    categoria: string;
    correo: string;
    tel: string;
    jrn_inscritos_modulos: PropsJrnInscritosModulos[];
    created_at: string;
}

export interface PropsGetAssistantsFilters extends PropsTableAssistantsFilters {
    limit: string;
    page: number;
}

export interface Jrn_modulo {
    id: number;
    nombre: string;
}

export interface Jrn_edicion {
    id: number;
    edicion: string;
}

export interface ReqGenCatalogs {
    id: number;
    nombre: string;
    fecha: string;
    cupos: number;
    costo: number;
    hora_inicio: string;
    hora_fin: string;
    created_at?: string;
    updated_at?: string;
    borderStyle?: string;
    jrn_modulo?: Jrn_modulo;
    jrn_edicion?: Jrn_edicion;
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
    jrn_inscritos_modulos: PropsInscritosModulos[];
    jrn_inscritos_talleres: PropsInscritosTalleres[];
}

export interface PropsInscritosModulos {
    asistioDia1: boolean;
    asistioDia2: boolean;
    asistioDia3: boolean;
    jrn_modulo: Jrn_modulo;
}

export interface PropsInscritosTalleres {
    asistio: boolean;
    jrn_taller: Jrn_taller;
}

export interface Jrn_taller {
    id: number;
    nombre: string;
}

export interface PropsAssitance {
    emaildata: string;
    assistantInfo: PropsGetAssistantInfo | null;
}

export interface ReqAssistantInfo {
    msg: string;
    ok: boolean;
    data: PropsGetAssistantInfo | null;
}

export interface ReqEventEditions {
    id: number;
    edicion: string;
    gratuito: boolean;
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
    width: string;
}

export interface PropsCreateEdition {
    edicion: string;
    fec_inicial: string;
    fec_final: string;
    isFree: boolean;
}

export interface PayloadWorkshops {
    nombre: string;
    fecha: string;
    cupos: number | string;
    hora_inicio: string;
    hora_fin: string;
    modulo: number;
    edicion: number;
}

export interface ModuleErrors {
    [key: string]: boolean;
}

export interface EditWorkshops {
    id: number;
    nombre: string;
    cupos: number | string;
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
}