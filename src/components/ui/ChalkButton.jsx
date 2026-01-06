export const ChalkButton = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const variants = {
    default: 'bg-transparent chalk-border text-chalk-white hover:bg-chalk-white/10',
    primary: 'bg-chalk-green/20 border-2 border-chalk-green text-chalk-green hover:bg-chalk-green/30',
    danger: 'bg-chalk-red/20 border-2 border-chalk-red text-chalk-red hover:bg-chalk-red/30',
    ghost: 'bg-transparent border-transparent text-chalk-faded hover:text-chalk-white',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      className={`
        font-chalk chalk-text rounded-lg transition-all
        active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
        touch-highlight no-select
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
