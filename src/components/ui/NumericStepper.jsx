import { Minus, Plus } from 'lucide-react'

export const NumericStepper = ({
  label,
  value,
  onChange,
  step = 1,
}) => {
  const handleDecrement = () => {
    const newValue = Math.max(0, parseFloat(value) - step)
    onChange(newValue)
  }

  const handleIncrement = () => {
    const newValue = parseFloat(value) + step
    onChange(newValue)
  }

  const handleInputChange = (e) => {
    const inputValue = e.target.value
    // Allow empty string for typing, otherwise parse as number
    if (inputValue === '') {
      onChange(0)
    } else {
      const newValue = parseFloat(inputValue)
      if (!isNaN(newValue)) {
        onChange(newValue)
      }
    }
  }

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="font-hand text-chalk-faded text-sm">
          {label}
        </label>
      )}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={parseFloat(value) <= 0}
          className="w-10 h-10 flex items-center justify-center
                     chalk-border rounded-lg text-chalk-white
                     hover:bg-chalk-white/10 active:scale-95
                     disabled:opacity-30 disabled:cursor-not-allowed
                     transition-all touch-highlight"
        >
          <Minus size={20} />
        </button>
        <input
          type="number"
          value={value}
          onChange={handleInputChange}
          step="any"
          className="w-16 bg-transparent text-center text-chalk-white font-hand text-xl
                     border-b-2 border-dashed border-chalk-faded py-1
                     focus:outline-none focus:border-solid focus:border-chalk-white
                     [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button
          type="button"
          onClick={handleIncrement}
          className="w-10 h-10 flex items-center justify-center
                     chalk-border rounded-lg text-chalk-white
                     hover:bg-chalk-white/10 active:scale-95
                     transition-all touch-highlight"
        >
          <Plus size={20} />
        </button>
      </div>
    </div>
  )
}
