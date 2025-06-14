import { GridColDef } from '@mui/x-data-grid';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import localizedFormat from "dayjs/plugin/localizedFormat";
import timezone from "dayjs/plugin/timezone";
import 'dayjs/locale/es';

export const columns: GridColDef[] = [
    { field: 'acronimo', headerName: 'ACRONIMO', flex: 1, headerAlign: 'center', align: 'center', sortable: false },
    { field: 'nombre', headerName: 'NOMBRE', flex: 2, headerAlign: 'center', align: 'center', sortable: false },
    {
        field: 'correo', headerName: 'CORREO', flex: 1.5, headerAlign: 'center', align: 'center', sortable: false
    },
    {
        field: 'tel', headerName: 'TELEFONO', flex: 1, headerAlign: 'center', align: 'center', sortable: false
    },
    {
        field: 'created_at', headerName: 'FEC. REGISTRO', flex: 1.5, headerAlign: 'center', align: 'center', sortable: false
    }
];

export const assistantsRows = (assistants: any) => {
    dayjs.extend(utc);
    dayjs.extend(localizedFormat);
    dayjs.extend(timezone);
    dayjs.locale('es');

    const rows = assistants.map((data: any) => {

        return {
            id: data.id,
            acronimo: data.acronimo,
            nombre: data.nombre,
            correo: data.correo,
            tel: data.tel,
            created_at: dayjs.utc(data.created_at).format('LLLL')
        }
    });

    return rows;
}