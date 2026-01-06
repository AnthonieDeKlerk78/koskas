export const ChalkboardFrame = ({ children }) => {
  return (
    <div className="min-h-screen chalkboard-bg relative">
      {/* Outer decorative border with dots */}
      <div className="min-h-screen relative m-2">
        {/* Main border frame */}
        <div className="min-h-screen border-4 border-chalk-white/60 rounded-sm relative overflow-hidden">
          {/* Inner dashed border */}
          <div className="absolute inset-2 border-2 border-dashed border-chalk-white/30 rounded-sm pointer-events-none"></div>

          {/* Corner decorations */}
          <div className="absolute top-1 left-1 w-3 h-3 border-l-2 border-t-2 border-chalk-white/40"></div>
          <div className="absolute top-1 right-1 w-3 h-3 border-r-2 border-t-2 border-chalk-white/40"></div>
          <div className="absolute bottom-1 left-1 w-3 h-3 border-l-2 border-b-2 border-chalk-white/40"></div>
          <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-chalk-white/40"></div>

          {children}
        </div>
      </div>
    </div>
  )
}
