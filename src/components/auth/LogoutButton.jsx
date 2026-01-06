import { useState } from 'react'
import { LogOut } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export const LogoutButton = () => {
  const { signOut } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    try {
      setLoading(true)
      await signOut()
    } catch (err) {
      console.error('Error signing out:', err)
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="p-2 text-chalk-faded hover:text-chalk-white transition-colors
                 disabled:opacity-50"
      title="Sign out"
    >
      <LogOut size={20} />
    </button>
  )
}
