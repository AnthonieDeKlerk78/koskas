import { useAuth } from '../../contexts/AuthContext'
import { LogoutButton } from '../auth/LogoutButton'

export const MobileHeader = () => {
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-40 bg-chalkboard-black/95 backdrop-blur-sm safe-top">
      {/* Decorative top border with dots */}
      <div className="border-t-4 border-b-2 border-chalk-white/80 relative">
        <div className="absolute inset-0 flex justify-around items-center">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-chalk-white/60 rounded-full" />
          ))}
        </div>
      </div>

      {/* Main header with decorative banner style */}
      <div className="px-4 py-6 border-b-2 border-chalk-white/80 relative">
        {/* Inner decorative frame */}
        <div className="border-2 border-chalk-white/70 rounded-sm p-4 relative">
          {/* Logo banner */}
          <div className="text-center mb-2">
            <div className="relative inline-block">
              {/* Logo image */}
              <img
                src="/logo.png"
                alt="Kos-Kas Logo"
                className="h-48 w-auto mx-auto object-contain"
              />
            </div>
          </div>

          {/* Underline decoration with enhanced details */}
          <div className="flex justify-center items-center gap-2 mt-3">
            <div className="h-0.5 w-20 bg-chalk-white/40"></div>
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 bg-chalk-white/50 rotate-45"></div>
              <div className="w-2 h-2 bg-chalk-white/60 rotate-45"></div>
              <div className="w-1.5 h-1.5 bg-chalk-white/50 rotate-45"></div>
            </div>
            <div className="h-0.5 w-20 bg-chalk-white/40"></div>
          </div>
        </div>

        {/* User profile in corner */}
        {user && (
          <div className="absolute top-2 right-2 flex items-center gap-2">
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

      {/* Bottom decorative border */}
      <div className="border-b-4 border-chalk-white/80"></div>
    </header>
  )
}
