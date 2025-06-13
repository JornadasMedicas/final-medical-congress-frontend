import { AxiosResponse } from 'axios';
import jornadasApi from '../../api/jornadasApi';
import { RegistFormInterface } from '../../interfaces/registro/IRegistForm';

export const postRegistMail = async ({ ...params }: RegistFormInterface) => {
    try {
        const res: AxiosResponse = await jornadasApi.post(`/api/register/mail`, { ...params });
        return res.data;
    } catch (err: unknown) {
        return { error: err };
    }
}