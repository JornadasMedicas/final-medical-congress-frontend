export interface PropsFormData {
    nombre: string;
    telefono: string;
    correo: string;
    asunto: string;
    descripcion: string;
}

export interface PropsErrorsData {
    nombre: boolean;
    telefono: boolean;
    correo: boolean;
    asunto: boolean;
    descripcion: boolean;
}