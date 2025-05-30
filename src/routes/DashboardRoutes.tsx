import { Outlet } from 'react-router-dom'
import { Box, Stack } from '@mui/material'
import { Footer } from '../components/ui/Footer'
import { Navbar } from '../components/ui/Navbar'

export const DashboardRoutes = () => {
    return (
        <Stack>
            <Navbar />
            <Box component='main'>
                <Outlet />
            </Box>
            <Footer />
        </Stack>
    )
}