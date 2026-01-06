import { forwardRef } from 'react'

export const ChalkInput = forwardRef(({
  label,
  error,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="font-hand text-chalk-faded text-sm">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`
          w-full bg-transparent border-b-2 border-dashed border-chalk-faded
          text-chalk-white font-hand text-lg py-2 px-1
          placeholder:text-chalk-faded/50
          focus:outline-none focus:border-solid focus:border-chalk-white
          transition-all
          ${error ? 'border-chalk-red' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <span className="font-hand text-chalk-red text-sm">{error}</span>
      )}
    </div>
  )
})

ChalkInput.displayName = 'ChalkInput'
