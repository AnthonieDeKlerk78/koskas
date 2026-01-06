import { X, Clock, Users, ExternalLink } from 'lucide-react'
import { ChalkButton } from '../ui/ChalkButton'

export const RecipeDetail = ({ recipe, onClose }) => {
  if (!recipe) return null

  return (
    <div className="fixed inset-0 z-50 bg-chalkboard-black">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-chalkboard-black/95 backdrop-blur-sm">
        <div className="flex items-center justify-between p-4 border-b border-dashed border-chalk-faded/30">
          <h2 className="font-chalk text-xl text-chalk-white chalk-text truncate pr-4">
            {recipe.title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-chalk-faded hover:text-chalk-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="overflow-y-auto h-[calc(100vh-64px)] pb-8">
        {/* Image */}
        {recipe.image && (
          <div className="relative h-48">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-4 space-y-6">
          {/* Quick info */}
          <div className="flex flex-wrap gap-4">
            {recipe.readyInMinutes && (
              <div className="flex items-center gap-2 text-chalk-faded">
                <Clock size={18} />
                <span className="font-hand">{recipe.readyInMinutes} min</span>
              </div>
            )}
            {recipe.servings && (
              <div className="flex items-center gap-2 text-chalk-faded">
                <Users size={18} />
                <span className="font-hand">{recipe.servings} servings</span>
              </div>
            )}
          </div>

          {/* Summary */}
          {recipe.summary && (
            <div>
              <h3 className="font-chalk text-lg text-chalk-white mb-2">About</h3>
              <p
                className="font-hand text-chalk-faded text-sm leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: recipe.summary.replace(/<a /g, '<a class="text-chalk-blue underline" ')
                }}
              />
            </div>
          )}

          {/* Ingredients */}
          {recipe.extendedIngredients && recipe.extendedIngredients.length > 0 && (
            <div>
              <h3 className="font-chalk text-lg text-chalk-white mb-2">Ingredients</h3>
              <ul className="space-y-2">
                {recipe.extendedIngredients.map((ing, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 font-hand text-chalk-faded text-sm"
                  >
                    <span className="text-chalk-green">•</span>
                    <span>{ing.original}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Instructions */}
          {recipe.instructions && (
            <div>
              <h3 className="font-chalk text-lg text-chalk-white mb-2">Instructions</h3>
              <div
                className="font-hand text-chalk-faded text-sm leading-relaxed space-y-2"
                dangerouslySetInnerHTML={{ __html: recipe.instructions }}
              />
            </div>
          )}

          {/* Analyzed instructions (step by step) */}
          {recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 && (
            <div>
              <h3 className="font-chalk text-lg text-chalk-white mb-2">Steps</h3>
              <ol className="space-y-4">
                {recipe.analyzedInstructions[0]?.steps?.map((step) => (
                  <li key={step.number} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-chalk-green/20
                                     text-chalk-green font-hand text-sm flex items-center justify-center">
                      {step.number}
                    </span>
                    <p className="font-hand text-chalk-faded text-sm leading-relaxed">
                      {step.step}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Source link */}
          {recipe.sourceUrl && (
            <a
              href={recipe.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-chalk-blue font-hand text-sm hover:underline"
            >
              <ExternalLink size={16} />
              View original recipe
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
