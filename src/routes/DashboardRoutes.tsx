import { Outlet } from 'react-router-dom'
import { Stack } from '@mui/material'
import { Footer } from '../components/ui/Footer'
import { Navbar } from '../components/ui/Navbar'

export const DashboardRoutes = () => {
    return (
        <Stack>
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </Stack>
    )
}