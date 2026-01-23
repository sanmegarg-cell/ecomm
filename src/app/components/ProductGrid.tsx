import { ProductCard, Product } from './ProductCard';
import { ProductCardSkeleton } from './ProductCardSkeleton';
import { Filter, Search } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: Set<number>;
  searchQuery?: string;
  selectedCategory?: string;
  onMobileFilterClick?: () => void;
  onViewDetails: (product: Product) => void;
  isLoading?: boolean;
}

export function ProductGrid({ 
  products, 
  onAddToCart, 
  onToggleWishlist, 
  wishlistIds,
  searchQuery,
  selectedCategory,
  onMobileFilterClick,
  onViewDetails,
  isLoading = false
}: ProductGridProps) {
  return (
    <section className="flex-1 py-12 sm:py-16">
      <div className="mb-8 sm:mb-12 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h2 className="text-3xl sm:text-4xl">Our Collection</h2>
          <button
            onClick={onMobileFilterClick}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm">Filter</span>
          </button>
        </div>
        {searchQuery && (
          <p className="text-gray-600 text-base mb-2">
            Search results for "{searchQuery}"
          </p>
        )}
        <p className="text-gray-600 text-base sm:text-lg max-w-2xl">
          {products.length} {products.length === 1 ? 'product' : 'products'} found
        </p>
      </div>

      <div className="px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[...Array(6)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="max-w-md mx-auto">
              <div className="mb-6 flex justify-center">
                <div className="p-4 bg-gray-100 rounded-full">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 mb-6">
                {searchQuery 
                  ? `We couldn't find any products matching "${searchQuery}". Try adjusting your search or filters.`
                  : selectedCategory && selectedCategory !== 'all'
                  ? `No products found in this category. Try selecting a different category.`
                  : 'No products match your current filters. Try adjusting your search criteria.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {searchQuery && (
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    Clear Search
                  </button>
                )}
                <button
                  onClick={() => {
                    if (onMobileFilterClick) onMobileFilterClick();
                  }}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Adjust Filters
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isInWishlist={wishlistIds.has(product.id)}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}