import { AppRouter } from "./routes/AppRouter";
import './App.css';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import localizedFormat from "dayjs/plugin/localizedFormat";
import timezone from "dayjs/plugin/timezone";
import 'dayjs/locale/es';

dayjs.extend(utc);
dayjs.extend(localizedFormat);
dayjs.extend(timezone);
dayjs.locale('es');

export const App = () => {

    return (
        <AppRouter />
    )
}
