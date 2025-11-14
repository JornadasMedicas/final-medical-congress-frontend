import { IconButton, Tooltip } from "@mui/material"
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import { useContext } from "react";
import AdminContext from "../../context/AdminContext";

export const ButtonVoucherPrinting = ({ params }: any) => {
    const { printableIds } = useContext(AdminContext);

    return (
        <>
            <Tooltip title={'IMPRIMIR RECIBO'} placement="right">
                <IconButton disabled={printableIds.includes(params.row.id) || params.row.pagado === 1 ? false : true} aria-label="Imprimir Recibo" sx={{ color: 'primary.main', backgroundColor: 'background.default', ':hover': { backgroundColor: 'rgb(152, 58, 89)' }, transition: 'background 0.5s ease' }}>
                    <LocalPrintshopIcon />
                </IconButton>
            </Tooltip>
        </>
    )
}
