import { Filter, ChevronLeft, ChevronRight, Search } from 'lucide-react';

export interface Category {
  id: string;
  name: string;
  count: number;
}

interface CategoryPanelProps {
  categories: Category[];
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function CategoryPanel({ categories, selectedCategory, onCategorySelect, isExpanded, onToggleExpand, searchQuery, onSearchChange }: CategoryPanelProps) {
  return (
    <>
      <aside className={`hidden lg:flex fixed left-0 top-0 h-screen bg-white border-r overflow-y-auto flex-col transition-all duration-300 z-40 ${isExpanded ? 'w-64' : 'w-[70px]'}`}>
        <div className="flex items-center gap-4 py-4 px-6 border-b border-gray-200 sticky top-0 bg-white">
          <Filter className="w-5 h-5 text-gray-500" />
          {isExpanded && <h3 className="text-xl font-bold text-gray-800">Categories</h3>}
        </div>
        {isExpanded && (
          <div className="px-4 pt-4 pb-2 border-b border-gray-200 sticky top-[73px] bg-white z-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
        )}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            <button
              onClick={() => onCategorySelect('all')}
              className={`w-full text-left flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-200 ${isExpanded ? '' : 'justify-center'}
                ${
                selectedCategory === 'all'
                    ? 'bg-blue-100 text-blue-800 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {isExpanded ? (
                <span className="font-medium">All Products</span>
              ) : (
                <Filter className={`w-5 h-5 ${selectedCategory === 'all' ? 'text-blue-600' : 'text-gray-500'}`} />
              )}
              {isExpanded && (
                <span className={`text-sm font-semibold ${
                  selectedCategory === 'all' ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {categories.reduce((sum, cat) => sum + cat.count, 0)}
                </span>
              )}
            </button>

            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategorySelect(category.id)}
                className={`w-full text-left flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-200 ${isExpanded ? '' : 'justify-center'}
                  ${
                  selectedCategory === category.id
                      ? 'bg-blue-100 text-blue-800 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {isExpanded ? (
                  <span className="font-medium">{category.name}</span>
                ) : (
                  <span className={`capitalize w-5 h-5 flex items-center justify-center text-sm font-semibold ${
                    selectedCategory === category.id ? 'text-blue-600' : 'text-gray-500'
                  }`}>{category.name.charAt(0)}</span>
                )}
                {isExpanded && (
                  <span className={`text-sm font-semibold ${
                    selectedCategory === category.id ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {category.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </aside>
      <button
        onClick={onToggleExpand}
        className={`hidden lg:flex fixed top-1/2 -translate-y-1/2 z-40 p-2 bg-white border border-gray-200 rounded-r-lg shadow-md hover:bg-gray-50 transition-all duration-300 ${
          isExpanded ? 'left-64' : 'left-[70px]'
        }`}
        aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isExpanded ? <ChevronLeft className="w-5 h-5 text-gray-600" /> : <ChevronRight className="w-5 h-5 text-gray-600" />}
      </button>
    </>
  );
}
