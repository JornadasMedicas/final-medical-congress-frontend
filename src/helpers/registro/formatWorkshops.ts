import dayjs from "dayjs";
import { ReqGenCatalogs } from "../../interfaces/admin/IAdmin"

export const formatWorkshops = (data: ReqGenCatalogs[]) => {
    const actualYear = dayjs.utc().format('YYYY');

    const formatData: ReqGenCatalogs[] = data
        .filter((item) => item.jrn_edicion?.edicion === actualYear)
        .map((item) => {

            switch (item.jrn_modulo?.id) {
                case 1:
                    return {
                        ...item,
                        borderStyle: 'rgba(59, 167, 248, 0.7)'
                    }

                case 2:
                    return {
                        ...item,
                        borderStyle: 'rgba(166, 214, 206, 0.7)'
                    }

                case 3:
                    return {
                        ...item,
                        borderStyle: 'rgba(117, 186, 117, 0.9)',
                    }

                case 4:
                    return {
                        ...item,
                        borderStyle: 'rgba(214, 192, 155, 1)',
                    }

                default:
                    return {
                        ...item,
                        borderStyle: 'rgba(248, 191, 112, 0.7)',
                    }
            }
        });

    return formatData;
}