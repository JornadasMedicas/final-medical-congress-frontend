import { Chip } from "@mui/material"
import { useState } from "react"
import { putPaymentStatus } from "../../services/admin/adminService";
import Swal from "sweetalert2";

export const ButtonPayClick = ({ params }: any) => {
    const [pagado, setPagado] = useState<boolean>(params.row.pagado);

    const handleClick = () => {
        putPaymentStatus(!pagado, params.row.id).then((res: any) => {
            if (res.error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: 'No se ha podido procesar su solicitud. Intente más tarde',
                    confirmButtonColor: '#d37c6b'
                });
            } else {
                setPagado(!pagado);
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
    }

    return (
        <>
            {
                pagado ?
                    <Chip label="Pagado" color="success" sx={{ boxShadow: '0 2px 5px 2px rgba(0, 0, 0, 0.3)', ':hover': { cursor: 'pointer' } }} onClick={handleClick} />
                    :
                    <Chip label="No Pagado" color="error" sx={{ boxShadow: '0 2px 5px 2px rgba(0, 0, 0, 0.3)', ':hover': { cursor: 'pointer' } }} onClick={handleClick} />
            }
        </>
    )
}
