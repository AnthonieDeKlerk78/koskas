export const ChalkboardFrame = ({ children }) => {
  return (
    <div className="min-h-screen chalkboard-bg">
      <div className="min-h-screen border-4 border-dashed border-chalk-faded/20 m-2 rounded-lg">
        {children}
      </div>
    </div>
  )
}
