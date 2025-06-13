import Swal from "sweetalert2";
import { putRegistAssistance, putRegistAssistanceWorkshops } from "../../services/admin/adminService";

export const globalUpdateAssistance = async (data: string, type: string) => {
    if (type === 'congreso') {
        const res = await putRegistAssistance(data);
        if (res.data) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Asistencia confirmada',
                showConfirmButton: false,
                timer: 1000
            })
        } else if (res.error) {
            if (res.error.status === 404 || res.error.status === 400) {
                Swal.fire({
                    icon: "warning",
                    title: "Error",
                    text: res.error.response.data.msg,
                    showConfirmButton: true,
                    confirmButtonColor: '#d37c6b'
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: 'No se ha podido procesar la solicitud.',
                    showConfirmButton: true,
                    confirmButtonColor: '#d37c6b'
                });
            }
        }
    } else {
        const res = await putRegistAssistanceWorkshops(data);
        if (res.data) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Asistencia confirmada',
                showConfirmButton: false,
                timer: 1000
            })
        } else if (res.error) {
            if (res.error.status === 404 || res.error.status === 400) {
                Swal.fire({
                    icon: "warning",
                    title: "Error",
                    text: res.error.response.data.msg,
                    showConfirmButton: true,
                    confirmButtonColor: '#d37c6b'
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: 'No se ha podido procesar la solicitud.',
                    showConfirmButton: true,
                    confirmButtonColor: '#d37c6b'
                });
            }
        }
    }
}