import { Outlet } from 'react-router-dom'
import { Box, Stack } from '@mui/material'
import { Footer } from '../components/ui/Footer'
import { Navbar } from '../components/ui/Navbar'

export const DashboardRoutes = () => {
    return (
        <Stack sx={{ height: '100%', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <Box component='main' flexGrow={1}>
                <Outlet />
            </Box>
            <Footer />
        </Stack>
    )
}