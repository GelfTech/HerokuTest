import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import Sidebar from './Sidebar'
import { Box, CssBaseline, Toolbar } from '@mui/material'
import AppBar from '@mui/material/AppBar'

export default function DashboardLayout() {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}