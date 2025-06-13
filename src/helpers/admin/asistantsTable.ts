import { GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import _utc from 'dayjs/plugin/utc';

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

export const AssistantsRows = (assistants: any) => {
    dayjs.locale('es-mx')

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