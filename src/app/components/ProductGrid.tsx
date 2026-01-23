import { ProductCard, Product } from './ProductCard';
import { Filter } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: Set<number>;
  searchQuery?: string;
  selectedCategory?: string;
  onMobileFilterClick?: () => void;
  onViewDetails: (product: Product) => void;
}

export function ProductGrid({ 
  products, 
  onAddToCart, 
  onToggleWishlist, 
  wishlistIds,
  searchQuery,
  selectedCategory,
  onMobileFilterClick,
  onViewDetails
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
        {products.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No products found matching your criteria.
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