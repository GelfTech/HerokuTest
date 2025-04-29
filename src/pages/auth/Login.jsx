import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import { Box, Typography, Button, TextField, Paper, Grid, Link } from '@mui/material'
import { Lock as LockIcon, Person as PersonIcon } from '@mui/icons-material'
import { login } from '@api/auth'
import * as Yup from 'yup'

// Esquema de validación
const validationSchema = Yup.object().shape({
  IdUsuario: Yup.string().required('Usuario es requerido'),
  Passwd: Yup.string().required('Contraseña es requerida'),
})

export default function Login() {
  const [credentials, setCredentials] = useState({
    IdEmpresa: 1,
    IdUsuario: '',
    Passwd: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login: authLogin } = useAuth() // Renombrado para evitar conflicto con el import
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Validación con Yup
      await validationSchema.validate(credentials, { abortEarly: false })
      
      // Si la validación pasa, procedemos con el login
      const response = await login(credentials)
      
      if (response.token) {
        authLogin({
          username: credentials.IdUsuario,
          token: response.token,
          // otros datos del usuario que devuelva la API
        })
        navigate('/dashboard')
      } else {
        setError(response.message || 'Error en la autenticación')
      }
    } catch (err) {
      // Manejo de errores de validación
      if (err.name === 'ValidationError') {
        setError(err.errors.join(', '))
      } else {
        // Manejo de errores de la API
        setError(err.message || 'Error en el servidor')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?office)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <LockIcon sx={{ fontSize: 50, mb: 1, color: 'primary.main' }} />
          <Typography component="h1" variant="h5">
            Iniciar sesión
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="IdUsuario"
              label="Usuario"
              name="IdUsuario"
              autoComplete="username"
              autoFocus
              value={credentials.IdUsuario}
              onChange={handleChange}
              error={error.includes('Usuario es requerido')}
              InputProps={{
                startAdornment: <PersonIcon sx={{ mr: 1, color: 'action.active' }} />,
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Passwd"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              value={credentials.Passwd}
              onChange={handleChange}
              error={error.includes('Contraseña es requerida')}
              InputProps={{
                startAdornment: <LockIcon sx={{ mr: 1, color: 'action.active' }} />,
              }}
            />
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? 'Cargando...' : 'Iniciar sesión'}
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}