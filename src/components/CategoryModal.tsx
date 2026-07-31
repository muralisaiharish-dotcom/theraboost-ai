import { Category } from '../types'

interface CategoryModalProps {
  categories: Category[]
  activeCategory: string
  onSelectCategory: (categoryName: string) => void
  onClose: () => void
}

export function CategoryModal({
  categories,
  activeCategory,
  onSelectCategory,
  onClose,
}: CategoryModalProps) {
  return (
    <div className="fixed inset-0 bg-purple-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 w-full max-w-2xl border-4 border-purple-300 shadow-2xl relative animate-in fade-in zoom-in-95">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 text-gray-500 hover:bg-purple-100 hover:text-purple-700 font-black text-lg flex items-center justify-center transition-colors cursor-pointer"
        >
          ✕
        </button>

        <div className="mb-6">
          <div className="inline-block bg-purple-100 text-purple-800 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-2">
            Flashcard Library
          </div>
          <h2 className="text-3xl font-black text-gray-900">Explore All Categories</h2>
          <p className="text-gray-500 text-sm font-medium">
            Select a topic to start practicing colorful flash cards and earning stars!
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          {categories.map((cat) => {
            const isSelected = cat.name === activeCategory
            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.name)
                  onClose()
                }}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center text-center cursor-pointer ${
                  isSelected
                    ? 'bg-purple-600 text-white border-purple-700 shadow-lg scale-105'
                    : 'bg-white hover:bg-purple-50 border-purple-100 hover:border-purple-300 text-gray-800'
                }`}
              >
                <div className="text-4xl mb-2">{cat.icon}</div>
                <div className="font-black text-base leading-tight mb-1">{cat.name}</div>
                <div
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-purple-100 text-purple-800'
                  }`}
                >
                  {cat.count} Cards
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden mt-3">
                  <div
                    className={`h-full rounded-full ${isSelected ? 'bg-white' : 'bg-purple-600'}`}
                    style={{ width: `${cat.progress}%` }}
                  />
                </div>
              </button>
            )
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-sm py-3 rounded-2xl transition-all cursor-pointer shadow-md"
        >
          Close
        </button>
      </div>
    </div>
  )
}
