import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const authFunctions = {
    login: (userData) => {
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
    },
    logout: () => {
      setUser(null)
      localStorage.removeItem('user')
    },
    user,
    loading
  }

  return (
    <AuthContext.Provider value={authFunctions}>
      {children}
    </AuthContext.Provider>
  )
}