import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Clock, ChefHat, Heart } from 'lucide-react'

export const BottomNav = ({ activeTab }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const tabs = [
    { id: 'home', icon: Home, label: 'pantry', path: '/dashboard' },
    { id: 'expiring', icon: Clock, label: 'expiring', path: '/dashboard?tab=expiring' },
    { id: 'recipes', icon: ChefHat, label: 'recipes', path: '/recipes' },
    { id: 'saved', icon: Heart, label: 'saved', path: '/saved' },
  ]

  const getCurrentTab = () => {
    if (activeTab) return activeTab
    if (location.pathname === '/recipes') return 'recipes'
    if (location.pathname === '/saved') return 'saved'
    if (location.pathname === '/settings') return 'more'
    if (location.search.includes('tab=expiring')) return 'expiring'
    return 'home'
  }

  const currentTab = getCurrentTab()

  const handleTabClick = (tab) => {
    if (tab.id === 'expiring') {
      navigate('/dashboard')
      // Pass the tab change to parent if we're already on dashboard
      if (location.pathname === '/dashboard') {
        window.dispatchEvent(new CustomEvent('tabChange', { detail: 'expiring' }))
      }
    } else if (tab.id === 'home') {
      navigate('/dashboard')
      if (location.pathname === '/dashboard') {
        window.dispatchEvent(new CustomEvent('tabChange', { detail: 'home' }))
      }
    } else {
      navigate(tab.path)
    }
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-chalkboard-dark/95 backdrop-blur-sm border-t border-dashed border-chalk-faded/30 safe-bottom">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = currentTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className={`
                flex flex-col items-center gap-1 px-4 py-2
                transition-colors touch-highlight
                ${isActive ? 'text-chalk-white' : 'text-chalk-faded'}
              `}
            >
              <Icon size={24} />
              <span className="font-hand text-xs">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
