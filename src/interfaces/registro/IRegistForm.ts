export interface WorkshopsFormInterface {
    checked: boolean;
    name: string;
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
    modulo?: string | null;
    t1: WorkshopsFormInterface;
    t2: WorkshopsFormInterface;
    t3: WorkshopsFormInterface;
    t4: WorkshopsFormInterface;
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