import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { LoginButton } from '../components/auth/LoginButton'
import { ChalkboardFrame } from '../components/layout/ChalkboardFrame'

export const Login = () => {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user && !loading) {
      navigate('/dashboard', { replace: true })
    }
  }, [user, loading, navigate])

  if (loading) {
    return (
      <ChalkboardFrame>
        <div className="flex items-center justify-center min-h-screen">
          <p className="font-chalk text-2xl text-chalk-white chalk-text">
            Loading...
          </p>
        </div>
      </ChalkboardFrame>
    )
  }

  return (
    <ChalkboardFrame>
      <div className="flex flex-col items-center justify-center min-h-screen px-6">
        {/* Food doodle */}
        <div className="text-6xl mb-8">🍳</div>

        {/* Logo/Title */}
        <div className="text-center mb-8">
          <div className="inline-block border-4 border-double border-chalk-white px-6 py-2 mb-4">
            <h1 className="font-chalk text-4xl text-chalk-white chalk-text">
              KOSKAS
            </h1>
          </div>
          <p className="font-hand text-chalk-faded text-lg">
            Your Kitchen Pantry
          </p>
          <p className="font-hand text-chalk-faded">
            ~ organised ~
          </p>
        </div>

        {/* Login button */}
        <div className="w-full max-w-xs">
          <LoginButton />
        </div>

        {/* Footer text */}
        <p className="mt-12 font-hand text-chalk-faded text-sm flex items-center gap-2">
          <span>✎</span>
          tap to get started
          <span>✎</span>
        </p>
      </div>
    </ChalkboardFrame>
  )
}
