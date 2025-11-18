import { IconButton, Tooltip } from "@mui/material"
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import { useContext, useState } from "react";
import AdminContext from "../../context/AdminContext";
import { downLoadVoucherPago } from "../../services/admin/adminService";
import { enqueueSnackbar } from "notistack";

export const ButtonVoucherPrinting = ({ params }: any) => {
    const { printableIds } = useContext(AdminContext);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handlePrinting = async () => {
        console.log(params);
        
        setIsLoading(true);
        let costoTexto = '';

        switch (params.row.costo) {
            case '$800':
                costoTexto = 'OCHOCIENTOS PESOS'
                break;
            case '$300':
                costoTexto = 'TRESCIENTOS PESOS'
                break;
            case '$200':
                costoTexto = 'DOSCIENTOS PESOS'
                break;

            default:
                break;
        }

        downLoadVoucherPago({
            id: params.row.id,
            asistente: params.row.nombre,
            costo: params.row.costo,
            modulo: params.row.modulo.toUpperCase(),
            costoTexto
        }).then(() => {
            setIsLoading(false);
            enqueueSnackbar('Voucher generado exitosamente.', { variant: 'success' });
        }).catch(() => {
            setIsLoading(false);
            enqueueSnackbar('Ocurrio un error, contacte al administrador.', { variant: 'error' });
        });
    }

    return (
        <>
            <Tooltip title={'IMPRIMIR RECIBO'} placement="right">
                <IconButton onClick={handlePrinting} loading={isLoading} disabled={printableIds.includes(params.row.id) || params.row.pagado === 1 ? false : true} aria-label="Imprimir Recibo" sx={{ color: 'primary.main', backgroundColor: 'background.default', ':hover': { backgroundColor: 'rgb(152, 58, 89)' }, transition: 'background 0.5s ease' }}>
                    <LocalPrintshopIcon />
                </IconButton>
            </Tooltip>
        </>
    )
}
