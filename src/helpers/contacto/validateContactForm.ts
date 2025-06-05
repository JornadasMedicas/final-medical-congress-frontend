import { PropsErrorsData, PropsFormData } from "../../interfaces/contacto/IContactForm";


export const errors: PropsErrorsData = {
    nombre: false,
    telefono: false,
    correo: false,
    asunto: false,
    descripcion: false
}

export const validateContactFields = ({ ...data }: PropsFormData, err: PropsErrorsData, setErrors: React.Dispatch<React.SetStateAction<PropsErrorsData>>) => {
    let isOk = true;

    if (data.descripcion === "") {
        setErrors({ ...err, descripcion: true })
        isOk = false;
    }

    if (data.asunto === "") {
        setErrors({ ...err, asunto: true })
        isOk = false;
    }

    if (data.correo === "") {
        setErrors({ ...err, correo: true })
        isOk = false;
    }

    if (data.telefono === "" || data.telefono.length < 10) {
        setErrors({ ...err, telefono: true })
        isOk = false;
    }

    if (data.nombre === "") {
        setErrors({ ...err, nombre: true })
        isOk = false;
    }


    return isOk;
}