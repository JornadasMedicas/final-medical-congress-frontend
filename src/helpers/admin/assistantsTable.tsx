import { GridColDef } from '@mui/x-data-grid';
import dayjs from "dayjs";
import 'dayjs/locale/es';
import { PropsGetAssistantsInterface } from '../../interfaces/admin/IAdmin';
import { ButtonPayClick } from './ButtonPayClick';
import { ButtonVoucherPrinting } from './ButtonVoucherPrinting';

export const columns: GridColDef[] = [
    { field: 'acronimo', headerName: 'ACRONIMO', flex: 0.8, headerAlign: 'center', align: 'center', sortable: false },
    { field: 'nombre', headerName: 'NOMBRE', flex: 1.2, headerAlign: 'center', align: 'center', sortable: false },
    { field: 'categoria', headerName: 'CATEGORIA', flex: 1, headerAlign: 'center', align: 'center', sortable: false },
    {
        field: 'correo', headerName: 'CORREO', flex: 1, headerAlign: 'center', align: 'center', sortable: false
    },
    { field: 'modulo', headerName: 'MODULO', flex: 0.8, headerAlign: 'center', align: 'center', sortable: false },
    { field: 'costo', headerName: 'COSTO', flex: 0.7, headerAlign: 'center', align: 'center', sortable: false },
    {
        field: 'pagado',
        headerName: 'PAGADO',
        flex: 1.5,
        sortable: false,
        headerAlign: 'center',
        align: 'center',
        renderCell(params) {
            return (
                <ButtonPayClick params={params} />
            );
        },
    },
    {
        field: 'created_at', headerName: 'FEC. REGISTRO', flex: 1, headerAlign: 'center', align: 'center', sortable: false
    },
    {
        field: 'acciones',
        headerName: 'ACCIONES',
        flex: 0.7,
        sortable: false,
        headerAlign: 'center',
        align: 'center',
        renderCell(params) {
            return (
                <ButtonVoucherPrinting
                    params={params}
                />
            );
        },
    },
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
            modulo: data.jrn_inscritos_modulos[0].jrn_modulo.nombre,
            costo: isFree ? 'N/A' : '$' + (data.categoria.includes('Estudiante') ? 200 : data.jrn_inscritos_modulos[0].jrn_modulo.costo),
            pagado: data.jrn_inscritos_modulos[0].pagado,
            created_at: dayjs.utc(data.created_at).format('LLLL')
        }
    });

    return rows;
}