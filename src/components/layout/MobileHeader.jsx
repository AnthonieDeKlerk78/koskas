import { useAuth } from '../../contexts/AuthContext'
import { LogoutButton } from '../auth/LogoutButton'

export const MobileHeader = ({ title }) => {
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-40 bg-chalkboard-black/95 backdrop-blur-sm safe-top">
      <div className="flex items-center justify-between px-4 py-3 border-b border-dashed border-chalk-faded/30">
        <h1 className="font-chalk text-2xl text-chalk-white chalk-text">
          {title}
        </h1>
        {user && (
          <div className="flex items-center gap-2">
            {user.user_metadata?.avatar_url && (
              <img
                src={user.user_metadata.avatar_url}
                alt="Profile"
                className="w-8 h-8 rounded-full border-2 border-chalk-faded"
              />
            )}
            <LogoutButton />
          </div>
        )}
      </div>
    </header>
  )
}
