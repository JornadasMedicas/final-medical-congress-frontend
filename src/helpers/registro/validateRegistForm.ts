
import { JornadasValuesInterface, RegistFormInterface } from "../../interfaces/registro/IRegistForm";
import { initValuesFormJornadasErrors } from "./initValues";

function validateEmail(email: string) {

    // Get our input reference.
    let emailField = email

    // Define our regular expression.
    var validEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/;

    // Using test we can check if the text match the pattern
    if (validEmail.test(emailField)) {
        return true;
    } else {
        return false;
    }
}

export const validateJornadasFields = ({ ...data }: RegistFormInterface) => {
    let errors: JornadasValuesInterface = initValuesFormJornadasErrors;
    let isOk: boolean = true;

    if (data.categoria === "") {
        errors = { ...errors, categoria: { ...errors.nombre, error: true } }
    }

    if (data.acronimo === "") {
        errors = { ...errors, acronimo: { ...errors.acronimo, error: true } }
    } else if (!data.acronimo.trim().endsWith('.')) {
        errors = { ...errors, acronimo: { error: true, msg: 'El acrónimo debe terminar en punto (.)' } }
    }

    if (data.nombre === "") {
        errors = { ...errors, nombre: { ...errors.nombre, error: true } }
    }

    if (data.apellidos === "") {
        errors = { ...errors, apellidos: { ...errors.apellidos, error: true } }
    }

    if (!validateEmail(data.correo)) {
        errors = { ...errors, correo: { ...errors.correo, error: true, msg: "El correo electrónico no es válido" } }
    }

    if (data.tel === '') {
        errors = { ...errors, tel: { ...errors.tel, error: true } }
    } else if (data.tel.length !== 10) {
        errors = { ...errors, tel: { ...errors.tel, error: true, msg: "El numero telefónico es incorrecto (ej. 228XXXXXXX)" } }
    } else if (isNaN(parseInt(data.tel))) {
        errors = { ...errors, tel: { ...errors.tel, error: true, msg: "El numero telefónico debe ser numérico" } }
    }

    if (data.ciudad === '') {
        errors = { ...errors, ciudad: { ...errors.ciudad, error: true } }
    }

    if ((data.modulo === 0 || data.modulo === null) && data.talleres?.length === 0) { //adjust depends on needs
        errors = { ...errors, modulo: { error: true, msg: "Debe elegir un módulo" } }
        /* errors = { ...errors, modulo: { error: true, msg: "Debe elegir al menos un módulo o taller" } } */
    }

    Object.entries(errors).forEach(([_, value]) => {
        if (value.error) {
            isOk = false;
        }
    });

    return {
        isOk,
        errors
    }
}