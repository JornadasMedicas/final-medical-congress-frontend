import { AxiosResponse } from 'axios';
import jornadasApi from '../../api/jornadasApi';
import { PayloadWorkshops, PropsCreateEdition, PropsGetAssistantsFilters } from '../../interfaces/admin/IAdmin';
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

export const createEdition = async (payload: PropsCreateEdition) => {
    try {
        const res: AxiosResponse = await jornadasApi.post(`/api/admin/createEdition`, { ...payload });
        return res.data;
    } catch (err: unknown) {
        return { error: err };
    }
}

export const createModule = async (nombre: string) => {
    try {
        const res: AxiosResponse = await jornadasApi.post(`/api/admin/createModule`, { nombre });
        return res.data;
    } catch (err: unknown) {
        return { error: err };
    }
}

export const editModule = async (payload: { id: number, nombre: string }) => {
    try {
        const res: AxiosResponse = await jornadasApi.put(`/api/admin/editModule`, { ...payload });
        return res.data;
    } catch (err: unknown) {
        return { error: err };
    }
}

export const deleteModule = async (id: number) => {
    try {
        const res: AxiosResponse = await jornadasApi.put(`/api/admin/deleteModule/${id}`);
        return res.data;
    } catch (err: unknown) {
        return { error: err };
    }
}

export const createWorkshop = async (payload: PayloadWorkshops) => {
    try {
        const res: AxiosResponse = await jornadasApi.post(`/api/admin/createWorkshop`, { ...payload });
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

