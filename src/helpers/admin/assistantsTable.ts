import { GridColDef } from '@mui/x-data-grid';
import dayjs from "dayjs";
import 'dayjs/locale/es';
import { PropsGetAssistantsInterface } from '../../interfaces/admin/IAdmin';

export const columns: GridColDef[] = [
    { field: 'acronimo', headerName: 'ACRONIMO', flex: 1, headerAlign: 'center', align: 'center', sortable: false },
    { field: 'nombre', headerName: 'NOMBRE', flex: 2, headerAlign: 'center', align: 'center', sortable: false },
    { field: 'categoria', headerName: 'CATEGORIA', flex: 2, headerAlign: 'center', align: 'center', sortable: false },
    {
        field: 'correo', headerName: 'CORREO', flex: 1.5, headerAlign: 'center', align: 'center', sortable: false
    },
    {
        field: 'tel', headerName: 'TELEFONO', flex: 1, headerAlign: 'center', align: 'center', sortable: false
    },
    { field: 'modulo', headerName: 'MODULO', flex: 1, headerAlign: 'center', align: 'center', sortable: false },
    { field: 'costo', headerName: 'COSTO', flex: 1, headerAlign: 'center', align: 'center', sortable: false },
    {
        field: 'created_at', headerName: 'FEC. REGISTRO', flex: 2, headerAlign: 'center', align: 'center', sortable: false
    }
];

export const assistantsRows = (assistants: PropsGetAssistantsInterface[]) => {

    const rows = assistants.map((data: PropsGetAssistantsInterface) => {
        const isFree = data.jrn_inscritos_modulos[0].jrn_edicion.gratuito;

        return {
            id: data.id,
            acronimo: data.acronimo,
            nombre: data.nombre,
            categoria: data.categoria,
            correo: data.correo,
            tel: data.tel,
            modulo: data.jrn_inscritos_modulos[0].jrn_modulo.nombre,
            costo: isFree ? 'N/A' : '$' + (data.categoria.includes('Estudiante') ? 200 : data.jrn_inscritos_modulos[0].jrn_modulo.costo),
            created_at: dayjs.utc(data.created_at).format('LLLL')
        }
    });

    return rows;
}