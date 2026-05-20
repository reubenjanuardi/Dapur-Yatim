/**
 * Component: ProtectedRoute
 * HOC untuk melindungi route admin — redirect ke login jika tidak ada token
 */
import { Navigate } from 'react-router-dom'

/** @param {{ children: React.ReactNode }} props */
export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('access_token')

  if (!token) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}
