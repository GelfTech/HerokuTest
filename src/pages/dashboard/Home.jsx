import { Typography, Box } from '@mui/material'
import { useAuth } from '@hooks/useAuth'

export default function Home() {
  const { user } = useAuth()

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Bienvenido, {user?.username}
      </Typography>
      <Typography variant="body1">
        Este es tu panel de control. Aquí puedes ver tus estadísticas y acceder a las diferentes
        secciones de la aplicación.
      </Typography>
    </Box>
  )
}