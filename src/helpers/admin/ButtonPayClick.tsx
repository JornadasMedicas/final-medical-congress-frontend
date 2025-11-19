import { Chip } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { putPaymentStatus } from "../../services/admin/adminService";
import Swal from "sweetalert2";
import AdminContext from "../../context/AdminContext";

export const ButtonPayClick = ({ params }: any) => {
    const [pagado, setPagado] = useState<number>(params.row.pagado);
    const { printableIds, setPrintableIds } = useContext(AdminContext);

    const handleClick = () => {
        if ((pagado + 1) % 3 === 0) {
            setPagado(0);
        } else {
            setPagado(pagado + 1);
        }
    }

    useEffect(() => {
        putPaymentStatus(pagado, params.row.id).then((res: any) => {
            if (res.error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: 'No se ha podido procesar su solicitud. Intente más tarde',
                    confirmButtonColor: '#d37c6b'
                });
            } else {
                setPagado(pagado);
            }

        }).catch((err) => {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: 'No se ha podido procesar su solicitud. Intente más tarde',
                confirmButtonColor: '#d37c6b'
            });
        });

        if (pagado === 1) {
            if (!printableIds.includes(params.row.id)) {
                setPrintableIds([...printableIds, params.row.id]);
            }
        } else {
            setPrintableIds(printableIds.filter((id) => id !== params.row.id));
        }

        params.row.pagado = pagado;
    }, [pagado]);


    return (
        <>
            {
                pagado === 0 &&
                <Chip label="No Pagado" color="error" sx={{ boxShadow: '0 2px 5px 2px rgba(0, 0, 0, 0.3)', transition: 'all 1s ease', ':hover': { cursor: 'pointer' }, width: '50%' }} onClick={handleClick} disabled={params.row.costo === 'N/A' ? true : false} />
            }
            {
                pagado === 1 &&
                <Chip label="Pagado" color="success" sx={{ boxShadow: '0 2px 5px 2px rgba(0, 0, 0, 0.3)', transition: 'all 1s ease', ':hover': { cursor: 'pointer' }, width: '50%' }} onClick={handleClick} />
            }
            {
                pagado === 2 &&
                <Chip label="Becado" color="info" sx={{ boxShadow: '0 2px 5px 2px rgba(0, 0, 0, 0.3)', transition: 'all 1s ease', ':hover': { cursor: 'pointer' }, width: '50%' }} onClick={handleClick} />
            }
        </>
    )
}
