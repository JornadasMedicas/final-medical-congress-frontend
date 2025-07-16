import { AxiosResponse } from 'axios';
import jornadasApi from '../../api/jornadasApi';
import { PropsGetAssistantsFilters } from '../../interfaces/admin/IAdmin';
import { PropsTableAssistantsFilters } from '../../interfaces/admin/IAdminContext';

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

export const getTotalAssitants = async ({ ...params }: PropsTableAssistantsFilters) => {
    try {
        const res: AxiosResponse = await jornadasApi.get(`/api/assistants/total/count`, { params });
        return res.data;
    } catch (err: unknown) {
        return { ok: false };
    }
}

export const getEventEditions = async () => {
    try {
        const res: AxiosResponse = await jornadasApi.get(`/api/assistants/editions`);
        return res.data;
    } catch (err: unknown) {
        return [];
    }
}

export const getModules = async () => {
    try {
        const res: AxiosResponse = await jornadasApi.get(`/api/assistants/modules`);
        return res.data;
    } catch (err: unknown) {
        return [];
    }
}

export const getCountCatalogs = async () => {
    try {
        const res: AxiosResponse = await jornadasApi.get(`/api/admin/countCatalogs`);
        return res.data;
    } catch (err: unknown) {
        return [];
    }
}

export const getWorkshops = async () => {
    try {
        const res: AxiosResponse = await jornadasApi.get(`/api/assistants/workshops`);
        return res.data;
    } catch (err: unknown) {
        return [];
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

