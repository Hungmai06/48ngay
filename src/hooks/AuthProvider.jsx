import { useMemo, useState } from 'react'
import {
  getCurrentUser,
  isAuthenticated,
  login as loginService,
  logout as logoutService,
} from '../services/authService'
import { AuthContext } from './authContext'

function AuthProvider({ children }) {
  const [user, setUser] = useState(getCurrentUser())

  const value = useMemo(
    () => ({
      user,
      isLoggedIn: isAuthenticated(),
      login: (email) => {
        const result = loginService(email)
        if (result.success) {
          setUser(result.user)
        }
        return result
      },
      logout: () => {
        logoutService()
        setUser(null)
      },
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
