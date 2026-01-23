import { Filter, X } from 'lucide-react';

export interface Category {
  id: string;
  name: string;
  count: number;
}

interface MobileCategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function MobileCategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategorySelect,
  isOpen,
  onClose
}: MobileCategoryFilterProps) {
  const handleSelect = (categoryId: string) => {
    onCategorySelect(categoryId);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Mobile Filter Panel */}
      <div className="fixed left-0 top-0 h-full w-80 bg-white z-50 shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            <h3 className="text-lg">Categories</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Close filter"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 space-y-2">
          <button
            onClick={() => handleSelect('all')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
              selectedCategory === 'all'
                ? 'bg-blue-500 text-white'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span>All Products</span>
              <span className="text-sm">
                {categories.reduce((sum, cat) => sum + cat.count, 0)}
              </span>
            </div>
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleSelect(category.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                selectedCategory === category.id
                ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{category.name}</span>
                <span className="text-sm">{category.count}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
