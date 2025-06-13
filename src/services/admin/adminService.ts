import { AxiosResponse } from 'axios';
import jornadasApi from '../../api/jornadasApi';
import { PropsGetAssistantsFilters, PropsGetCountAssistantsFilters } from '../../interfaces/admin/IAdmin';

export const getAssitantInfo = async (email: string) => {
    try {
        const res: AxiosResponse = await jornadasApi.get(`/api/assistants/assistantInfo`, { params: { email: email } });
        return res.data;
    } catch (err: unknown) {
        return { error: err };
    }
}

export const getAssitants = async ({ ...params }: PropsGetAssistantsFilters) => {
    try {
        const res: AxiosResponse = await jornadasApi.get(`/api/assistants/total`, { params });
        return res.data;
    } catch (err: unknown) {
        return { error: err };
    }
}

export const getAssitantsAutocomplete = async (filter: string) => {
    try {
        const res: AxiosResponse = await jornadasApi.get(`/api/assistants/filter`, { params: { filter: filter } });
        return res.data;
    } catch (err: unknown) {
        return { error: err };
    }
}

export const getTotalAssitants = async ({ ...params }: PropsGetCountAssistantsFilters) => {
    try {
        const res: AxiosResponse = await jornadasApi.get(`/api/assistants/total/count`, { params });
        return res.data;
    } catch (err: unknown) {
        return { error: err };
    }
}

export const getEventEditions = async (): Promise<any> => {
    try {
        const res: AxiosResponse = await jornadasApi.get(`/api/assistants/editions`);
        return res.data;
    } catch (err: unknown) {
        return { error: err };
    }
}

export const putRegistAssistance = async (data: string) => {
    try {
        const res: AxiosResponse = await jornadasApi.put(`/api/assistants/attendance`, { assistant: data });
        return res.data;
    } catch (err: unknown) {
        return { error: err };
    }
}

export const putRegistAssistanceWorkshops = async (data: string) => {
    try {
        const res: AxiosResponse = await jornadasApi.put(`/api/assistants/attendanceWorkshops`, { assistant: data });
        return res.data;
    } catch (err: unknown) {
        return { error: err };
    }
}

