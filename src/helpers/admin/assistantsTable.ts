import { GridColDef } from '@mui/x-data-grid';
import dayjs from "dayjs";
import 'dayjs/locale/es';
import { PropsGetAssistantsInterface } from '../../interfaces/admin/IAdmin';

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

export const assistantsRows = (assistants: PropsGetAssistantsInterface[]) => {

    const rows = assistants.map((data: PropsGetAssistantsInterface) => {

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