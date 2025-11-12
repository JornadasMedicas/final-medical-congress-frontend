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
import { SocketProvider } from "../context/SocketContext";

const LazyAdmin = lazy(() => import('../components/admin/Admin'));
const LazyHome = lazy(() => import('../pages/HomePage'));
const LazyRegistro = lazy(() => import('../components/public/registro/Registro'));

export const AppRouter = () => {

    const registerDay = new Date("2025-11-03T09:00:00");
    const currentDate = new Date();

    return (
        <Router>
            <Routes>
                <Route path='/' element={<DashboardRoutes />}>
                    <Route index element={
                        <Suspense fallback={<Loader />}>
                            <LazyHome />
                        </Suspense>
                    } />

                    {
                        currentDate >= registerDay &&
                        <Route path='registro' element={
                            <Suspense fallback={<Loader />}>
                                <SocketProvider>
                                    <LazyRegistro />
                                </SocketProvider>
                            </Suspense>
                        } />
                    }

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