import { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'

export const Select = forwardRef(({
  label,
  options = [],
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
      <div className="relative">
        <select
          ref={ref}
          className={`
            w-full bg-transparent border-b-2 border-dashed border-chalk-faded
            text-chalk-white font-hand text-lg py-2 px-1 pr-8
            focus:outline-none focus:border-solid focus:border-chalk-white
            transition-all appearance-none cursor-pointer
            ${error ? 'border-chalk-red' : ''}
            ${className}
          `}
          {...props}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-chalkboard-dark text-chalk-white"
            >
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={20}
          className="absolute right-1 top-1/2 -translate-y-1/2 text-chalk-faded pointer-events-none"
        />
      </div>
      {error && (
        <span className="font-hand text-chalk-red text-sm">{error}</span>
      )}
    </div>
  )
})

Select.displayName = 'Select'
