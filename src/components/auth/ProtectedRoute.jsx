import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen chalkboard-bg flex items-center justify-center">
        <div className="text-chalk-white font-chalk text-2xl chalk-text">
          Loading...
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}
