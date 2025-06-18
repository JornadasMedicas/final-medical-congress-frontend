import { AxiosResponse } from "axios";
import jornadasApi from "../../api/jornadasApi";
import { PropsFormData } from "../../interfaces/contacto/IContactForm";

export const postContactMail = async ({ ...params }: PropsFormData) => {
    try {
        const res: AxiosResponse = await jornadasApi.post(`/api/contact/mail`,
            {
                nombre: (params.nombre).toUpperCase(),
                telefono: params.telefono,
                correo: params.correo,
                asunto: (params.asunto).toUpperCase(),
                descripcion: params.descripcion
            }
        );
        
        return res.data;
    } catch (err: unknown) {
        return { error: err };
    }
}