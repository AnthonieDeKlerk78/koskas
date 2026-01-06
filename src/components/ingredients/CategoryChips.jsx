import { CATEGORIES } from '../../utils/constants'

export const CategoryChips = ({ selected, onSelect }) => {
  const allCategories = [{ name: 'All', color: '#F5F5F5' }, ...CATEGORIES]

  return (
    <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
      <div className="flex gap-2 pb-2">
        {allCategories.map((category) => {
          const isSelected = selected === category.name || (selected === null && category.name === 'All')
          return (
            <button
              key={category.name}
              onClick={() => onSelect(category.name === 'All' ? null : category.name)}
              className={`
                flex-shrink-0 px-4 py-2 rounded-full
                font-hand text-sm whitespace-nowrap
                transition-all touch-highlight
                ${isSelected
                  ? 'text-chalkboard-black'
                  : 'text-chalk-white border-2 border-dashed'
                }
              `}
              style={{
                backgroundColor: isSelected ? category.color : 'transparent',
                borderColor: isSelected ? 'transparent' : category.color,
              }}
            >
              {category.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
