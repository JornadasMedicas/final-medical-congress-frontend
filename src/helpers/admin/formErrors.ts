import { ModuleErrors, PayloadWorkshops } from "../../interfaces/admin/IAdmin";

export const moduleErrors: ModuleErrors = {
    nombre: false,
    fecha: false,
    hora_inicio: false,
    hora_fin: false,
    modulo: false,
    edicion: false
}

export const validateForm = (data: PayloadWorkshops, errors: ModuleErrors, setErrors: React.Dispatch<React.SetStateAction<ModuleErrors>>) => {

    let isOk: boolean = true;

    if (data.nombre === '') {
        isOk = false;
        setErrors({ ...errors, nombre: true });
    }

    if (data.fecha === '') {
        isOk = false;
        setErrors({ ...errors, fecha: true });
    }

    if (data.hora_inicio === '') {
        isOk = false;
        setErrors({ ...errors, hora_inicio: true });
    }

    if (data.hora_fin === '') {
        isOk = false;
        setErrors({ ...errors, hora_fin: true });
    }

    if (data.modulo === 0) {
        isOk = false;
        setErrors({ ...errors, modulo: true });
    }

    if (data.edicion === 0) {
        isOk = false;
        setErrors({ ...errors, edicion: true });
    }

    return isOk;
}