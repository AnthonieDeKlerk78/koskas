import { Plus } from 'lucide-react'

export const FloatingActionButton = ({ onClick, pulse = false }) => {
  return (
    <button
      onClick={onClick}
      className={`
        fixed bottom-20 right-4 z-30
        w-14 h-14 rounded-full
        bg-chalk-green text-chalkboard-black
        flex items-center justify-center
        shadow-lg shadow-chalk-green/30
        active:scale-95 transition-transform
        touch-highlight
        ${pulse ? 'pulse' : ''}
      `}
    >
      <Plus size={28} strokeWidth={2.5} />
    </button>
  )
}
