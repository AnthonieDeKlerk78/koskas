import { useAuth } from '../../contexts/AuthContext'
import { LogoutButton } from '../auth/LogoutButton'

export const MobileHeader = ({ title }) => {
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
          {/* Title banner with decorative flourishes */}
          <div className="text-center mb-2">
            <div className="relative inline-block">
              {/* Decorative left flourish */}
              <svg className="absolute -left-12 top-1/2 -translate-y-1/2 w-10 h-10 text-chalk-white/60" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5,20 Q10,10 15,20 T25,20" strokeLinecap="round"/>
                <path d="M8,25 Q12,20 16,25" strokeLinecap="round"/>
              </svg>

              <h1 className="font-chalk text-5xl text-chalk-white chalk-text inline-block transform -rotate-1">
                {title}
              </h1>

              {/* Decorative right flourish */}
              <svg className="absolute -right-12 top-1/2 -translate-y-1/2 w-10 h-10 text-chalk-white/60" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15,20 Q20,10 25,20 T35,20" strokeLinecap="round"/>
                <path d="M24,25 Q28,20 32,25" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {/* Underline decoration */}
          <div className="flex justify-center items-center gap-2 mt-2">
            <div className="h-0.5 w-16 bg-chalk-white/40"></div>
            <div className="w-2 h-2 bg-chalk-white/40 rotate-45"></div>
            <div className="h-0.5 w-16 bg-chalk-white/40"></div>
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
