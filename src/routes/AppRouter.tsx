import {
    Navigate,
    Route,
    HashRouter as Router, Routes,
    /* BrowserRouter as Router, Routes, */
} from "react-router-dom"
import { Admin } from "../components/admin/Admin"
import { DashboardRoutes } from "./DashboardRoutes"
import { HomePage } from "../pages/HomePage"
/* import { Registro } from '../components/public/Registro' */

export const AppRouter = () => {

    return (
        <Router>
            <Routes>
                <Route path='/' element={<DashboardRoutes />}>
                    <Route index element={<HomePage />} />
                    {/* <Route path='register' element={<Registro />} /> */}
                    <Route path='admin' element={<Admin />} />

                    <Route path="*" element={<Navigate to="/" />} />
                </Route>
            </Routes>
        </Router>
    )
}