import { AxiosResponse } from 'axios';
import jornadasApi from '../../api/jornadasApi';
import { CompletePreRegistration, RegistFormInterface } from '../../interfaces/registro/IRegistForm';

export const postRegistMail = async ({ ...params }: RegistFormInterface, recaptchaToken: string, isPreRegist: boolean) => {
    try {
        const res: AxiosResponse = await jornadasApi.post(`/api/register/mail`, { ...params, recaptchaToken, isPreRegist });
        return res.data;
    } catch (err: unknown) {
        return { error: err };
    }
}

export const postPreRegistMail = async (email: string, recaptchaToken: string) => {
    try {
        const res: AxiosResponse = await jornadasApi.post(`/api/register/pre`, { correo: email, recaptchaToken });
        return res.data;
    } catch (err: unknown) {
        return { error: err };
    }
}

export const completePreRegistration = async ({ ...params }: CompletePreRegistration, recaptchaToken: string) => {
    try {
        const res: AxiosResponse = await jornadasApi.post(`/api/register/pre/complete`, { ...params, recaptchaToken });
        return res.data;
    } catch (err) {
        return { error: err };
    }
} 