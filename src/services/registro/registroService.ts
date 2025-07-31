import { AxiosResponse } from 'axios';
import jornadasApi from '../../api/jornadasApi';
import { RegistFormInterface } from '../../interfaces/registro/IRegistForm';

export const postRegistMail = async ({ ...params }: RegistFormInterface, recaptchaToken: string) => {
    try {
        const res: AxiosResponse = await jornadasApi.post(`/api/register/mail`, { ...params, recaptchaToken });
        return res.data;
    } catch (err: unknown) {
        return { error: err };
    }
}