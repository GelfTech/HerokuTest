import { createBrowserRouter, Navigate } from 'react-router-dom'
import DashboardLayout from '@components/layout/DashboardLayout'
import Login from '@pages/auth/Login'
import Home from '@pages/dashboard/Home'
import NotFound from '@pages/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

export default router