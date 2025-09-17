import Swal from "sweetalert2";
import { putRegistAssistance, putRegistAssistanceWorkshops } from "../../services/admin/adminService";

export const globalAttendanceUpdate = async (emailData: string, type: string): Promise<boolean> => {
    if (type === 'congress') {
        const res = await putRegistAssistance(emailData).then((res: any) => {
            if (res.error) {
                if (res.error.status === 400 || res.error.status === 404) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: res.error.response.data.msg,
                        confirmButtonColor: '#13322c'
                    });
                }

                return false;
            } else {
                Swal.fire({
                    icon: "success",
                    title: "Éxito",
                    text: "Asistencia registrada correctamente.",
                    confirmButtonColor: '#13322c',
                    timer: 1000
                });

                return true;
            }
        }).catch((err) => {
            console.log(err)
            return false;
        });

        return res;
    } else {
        const res = await putRegistAssistanceWorkshops(emailData).then((res: any) => {
            if (res.error) {
                if (res.error.status === 400 || res.error.status === 404) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: res.error.response.data.msg,
                        confirmButtonColor: '#13322c'
                    });
                }
                return false;
            } else {
                Swal.fire({
                    icon: "success",
                    title: "Éxito",
                    text: "Asistencia registrada correctamente.",
                    confirmButtonColor: '#13322c',
                    timer: 1000
                });

                return true;
            }

        }).catch((err) => {
            console.log(err);
            return false;
        });

        return res;
    }
}