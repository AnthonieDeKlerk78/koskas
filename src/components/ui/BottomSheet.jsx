import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

export const BottomSheet = ({ isOpen, onClose, title, children }) => {
  const sheetRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-chalkboard-black/70"
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className="absolute bottom-0 left-0 right-0 bg-chalkboard-dark rounded-t-2xl
                   max-h-[90vh] overflow-hidden slide-up"
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-chalk-faded rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-4 border-b border-dashed border-chalk-faded/30">
          <h2 className="font-chalk text-2xl text-chalk-white chalk-text">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-chalk-faded hover:text-chalk-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-100px)] p-4 safe-bottom">
          {children}
        </div>
      </div>
    </div>
  )
}
