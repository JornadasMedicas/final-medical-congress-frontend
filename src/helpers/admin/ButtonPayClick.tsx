import { Chip } from "@mui/material"
import { useEffect, useState } from "react"
import { putPaymentStatus } from "../../services/admin/adminService";
import Swal from "sweetalert2";

export const ButtonPayClick = ({ params }: any) => {
    const [pagado, setPagado] = useState<number>(params.row.pagado);

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
    }, [pagado])


    return (
        <>
            {
                pagado === 0 &&
                <Chip label="No Pagado" color="error" sx={{ boxShadow: '0 2px 5px 2px rgba(0, 0, 0, 0.3)', transition: 'all 1s ease', ':hover': { cursor: 'pointer' } }} onClick={handleClick} />
            }
            {
                pagado === 1 &&
                <Chip label="Pagado" color="success" sx={{ boxShadow: '0 2px 5px 2px rgba(0, 0, 0, 0.3)', transition: 'all 1s ease', ':hover': { cursor: 'pointer' } }} onClick={handleClick} />
            }
            {
                pagado === 2 &&
                <Chip label="Becado" color="info" sx={{ boxShadow: '0 2px 5px 2px rgba(0, 0, 0, 0.3)', transition: 'all 1s ease', ':hover': { cursor: 'pointer' } }} onClick={handleClick} />
            }
        </>
    )
}
