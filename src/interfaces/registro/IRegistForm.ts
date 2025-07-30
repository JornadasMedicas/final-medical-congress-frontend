export interface WorkshopsFormInterface {
    checked: boolean;
    name: string;
}

export interface PropsTalleresInterface {
    asistio: boolean;
    constancia_enviada: boolean;
    id_taller: number;
}

export interface RegistFormInterface {
    categoria: string;
    acronimo: string;
    nombre: string;
    apellidos: string;
    rfc?: string;
    correo: string;
    tel: string;
    ciudad: string;
    dependencia?: string;
    modulo?: number | null;
    edicion: number;
    talleres?: PropsTalleresInterface[]
}

export interface JornadasGeneralErrorsInterface {
    error: boolean;
    msg: string;
}

export interface JornadasValuesInterface {
    categoria: JornadasGeneralErrorsInterface;
    acronimo: JornadasGeneralErrorsInterface;
    nombre: JornadasGeneralErrorsInterface;
    apellidos: JornadasGeneralErrorsInterface;
    rfc: JornadasGeneralErrorsInterface;
    correo: JornadasGeneralErrorsInterface;
    tel: JornadasGeneralErrorsInterface;
    ciudad: JornadasGeneralErrorsInterface;
    dependencia: JornadasGeneralErrorsInterface;
    modulo: JornadasGeneralErrorsInterface;
}