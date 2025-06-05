import axios, { AxiosInstance } from 'axios';

const jornadasApi: AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_APP_URL_API_JORNADAS}`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default jornadasApi;