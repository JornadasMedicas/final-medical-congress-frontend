import {
    Navigate,
    Route,
    /* HashRouter as Router, Routes, */
    BrowserRouter as Router, Routes,
} from "react-router-dom"
import { DashboardRoutes } from "./DashboardRoutes";
import { lazy, Suspense } from "react";
import { Loader } from "../components/ui/Loader";
import { AdminContextProvider } from "../context/AdminContext";
/* import { Registro } from '../components/public/Registro' */
const LazyAdmin = lazy(() => import('../components/admin/Admin'));
const LazyHome = lazy(() => import('../pages/HomePage'));

export const AppRouter = () => {

    return (
        <Router>
            <Routes>
                <Route path='/' element={<DashboardRoutes />}>
                    <Route index element={
                        <Suspense fallback={<Loader />}>
                            <LazyHome />
                        </Suspense>
                    } />
                    {/* <Route path='register' element={<Registro />} /> */}
                    <Route path='admin' element={
                        <Suspense fallback={<Loader />}>
                            <AdminContextProvider>
                                <LazyAdmin />
                            </AdminContextProvider>
                        </Suspense>
                    } />

                    <Route path="*" element={<Navigate to="/" />} />
                </Route>
            </Routes>
        </Router>
    )
}