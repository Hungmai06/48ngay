import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../48ngay/hooks/useAuth'

export default function DLAdminProtectedRoute() {
  const { isDlLoggedIn, dlUser } = useAuth()
  const location = useLocation()

  if (!isDlLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (dlUser?.role !== 'ADMIN') {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
