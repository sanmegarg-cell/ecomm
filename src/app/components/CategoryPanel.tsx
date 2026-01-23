import { Filter, ChevronLeft, ChevronRight, Search, DollarSign, Layers } from 'lucide-react';
import { Slider } from './ui/slider';

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
  priceRange: { min: number; max: number };
  priceRangeFilter: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  selectedSheetType: 'all' | 'flat' | 'fitted';
  onSheetTypeChange: (type: 'all' | 'flat' | 'fitted') => void;
}

export function CategoryPanel({ categories, selectedCategory, onCategorySelect, isExpanded, onToggleExpand, searchQuery, onSearchChange, priceRange, priceRangeFilter, onPriceRangeChange, selectedSheetType, onSheetTypeChange }: CategoryPanelProps) {
  return (
    <>
      <aside className={`hidden lg:flex fixed left-0 top-0 h-screen bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 shadow-sm overflow-y-auto flex-col transition-all duration-300 z-40 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-slate-400 ${isExpanded ? 'w-64' : 'w-[70px]'}`} style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 #f3f4f6' }}>
        <div className="flex items-center gap-3 py-5 px-6 border-b border-gray-200 sticky top-0 bg-white/95 backdrop-blur-sm z-20">
          <div className="p-2 rounded-lg bg-slate-100">
            <Filter className="w-5 h-5 text-slate-700" />
          </div>
          {isExpanded && <h3 className="text-xl font-bold text-gray-900 tracking-tight">Filters</h3>}
        </div>
        {isExpanded && (
          <div className="px-4 pt-5 pb-4 border-b border-gray-200 sticky top-[81px] bg-white/95 backdrop-blur-sm z-10">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 focus:bg-white text-sm transition-all duration-200 placeholder:text-gray-400"
              />
            </div>
          </div>
        )}
        <div className="flex-1 overflow-y-auto px-4 pt-6 pb-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-slate-400" style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 #f3f4f6' }}>
          {isExpanded && (
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-1">Categories</h4>
            </div>
          )}
          <div className="space-y-1.5">
            <button
              onClick={() => onCategorySelect('all')}
              className={`w-full text-left flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${isExpanded ? '' : 'justify-center'}
                ${
                selectedCategory === 'all'
                    ? 'bg-slate-700 text-white font-semibold shadow-md shadow-slate-700/20'
                    : 'text-gray-700 hover:bg-gray-100 hover:shadow-sm'
              }`}
            >
              {isExpanded ? (
                <span className="font-medium">All Products</span>
              ) : (
                <Filter className={`w-5 h-5 ${selectedCategory === 'all' ? 'text-slate-700' : 'text-gray-500'}`} />
              )}
              {isExpanded && (
                <span className={`text-sm font-semibold px-2 py-0.5 rounded-full ${
                  selectedCategory === 'all' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  {categories.reduce((sum, cat) => sum + cat.count, 0)}
                </span>
              )}
            </button>

            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategorySelect(category.id)}
                className={`w-full text-left flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${isExpanded ? '' : 'justify-center'}
                  ${
                  selectedCategory === category.id
                      ? 'bg-slate-700 text-white font-semibold shadow-md shadow-slate-700/20'
                      : 'text-gray-700 hover:bg-gray-100 hover:shadow-sm'
                }`}
              >
                {isExpanded ? (
                  <span className="font-medium">{category.name}</span>
                ) : (
                  <span className={`capitalize w-5 h-5 flex items-center justify-center text-sm font-semibold ${
                    selectedCategory === category.id ? 'text-slate-700' : 'text-gray-500'
                  }`}>{category.name.charAt(0)}</span>
                )}
                {isExpanded && (
                  <span className={`text-sm font-semibold px-2 py-0.5 rounded-full ${
                    selectedCategory === category.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {category.count}
                  </span>
                )}
              </button>
            ))}
          </div>
          {isExpanded && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-lg bg-slate-100">
                  <DollarSign className="w-4 h-4 text-slate-700" />
                </div>
                <h4 className="text-sm font-semibold text-gray-800">Price Range</h4>
              </div>
              <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                <Slider
                  value={priceRangeFilter}
                  onValueChange={(value) => onPriceRangeChange(value as [number, number])}
                  min={priceRange.min}
                  max={priceRange.max}
                  step={1}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-sm pt-2">
                  <span className="text-gray-700 font-semibold bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                    ${priceRangeFilter[0].toFixed(2)}
                  </span>
                  <span className="text-gray-400 font-medium">-</span>
                  <span className="text-gray-700 font-semibold bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                    ${priceRangeFilter[1].toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}
          {isExpanded && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-lg bg-slate-100">
                  <Layers className="w-4 h-4 text-slate-700" />
                </div>
                <h4 className="text-sm font-semibold text-gray-800">Sheet Type</h4>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onSheetTypeChange('all')}
                  className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    selectedSheetType === 'all'
                      ? 'bg-slate-700 text-white shadow-md shadow-slate-700/20'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => onSheetTypeChange('flat')}
                  className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    selectedSheetType === 'flat'
                      ? 'bg-slate-700 text-white shadow-md shadow-slate-700/20'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
                  }`}
                >
                  Flat
                </button>
                <button
                  onClick={() => onSheetTypeChange('fitted')}
                  className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    selectedSheetType === 'fitted'
                      ? 'bg-slate-700 text-white shadow-md shadow-slate-700/20'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
                  }`}
                >
                  Fitted
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>
      <button
        onClick={onToggleExpand}
        className={`hidden lg:flex fixed top-1/2 -translate-y-1/2 z-40 p-2.5 bg-white border border-gray-200 rounded-r-xl shadow-lg hover:shadow-xl hover:bg-slate-50 transition-all duration-300 group ${
          isExpanded ? 'left-64' : 'left-[70px]'
        }`}
        aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isExpanded ? (
          <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-slate-700 transition-colors" />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-slate-700 transition-colors" />
        )}
      </button>
    </>
  );
}
