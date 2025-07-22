import { JornadasValuesInterface, RegistFormInterface } from "../../interfaces/registro/IRegistForm";

export const initValuesFormJornadasErrors: JornadasValuesInterface = {
    categoria: {
        error: false,
        msg: 'Este campo es necesario'
    },
    acronimo: {
        error: false,
        msg: 'Este campo es necesario'
    },
    nombre: {
        error: false,
        msg: 'Este campo es necesario'
    },
    apellidos: {
        error: false,
        msg: 'Este campo es necesario'
    },
    rfc: {
        error: false,
        msg: 'Este campo es necesario'
    },
    correo: {
        error: false,
        msg: 'Este campo es necesario'
    },
    tel: {
        error: false,
        msg: 'Este campo es necesario'
    },
    ciudad: {
        error: false,
        msg: 'Este campo es necesario'
    },
    dependencia: {
        error: false,
        msg: 'Este campo es necesario'
    },
    modulo: {
        error: false,
        msg: 'Este campo es necesario'
    }
}

export const initValuesFormJornadas: RegistFormInterface = { //!IMPORTANT CHANGE WORKSHOPS INFO EVERY EDITION
    categoria: 1,
    acronimo: '',
    nombre: '',
    apellidos: '',
    rfc: '',
    correo: '',
    tel: '',
    ciudad: '',
    dependencia: '',
    modulo: 0,
    t1: {
        checked: false,
        name: 'Estrategias Integradas'
    },
    t2: {
        checked: false,
        name: 'Uso de ROTEM'
    },
    t3: {
        checked: false,
        name: 'taller3'
    },
    t4: {
        checked: false,
        name: 'taller4'
    }
}