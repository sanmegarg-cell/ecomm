import { ShoppingCart, Heart, Star, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface Review {
  id: number;
  author: string;
  text: string;
  rating: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  images?: string[];
  material: string;
  threadCount: number;
  rating?: number;
  reviews?: Review[];
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
  onViewDetails?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart, onToggleWishlist, isInWishlist, onViewDetails }: ProductCardProps) {
  const navigate = useNavigate();
  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
      <div
        className="relative aspect-square overflow-hidden bg-gray-100 cursor-pointer"
        onClick={() => {
          navigate(`/product/${product.id}`);
          window.scrollTo(0, 0);
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 p-2 bg-white rounded-full shadow-md flex items-center gap-1">
          <Layers className="w-4 h-4 text-gray-700" />
          <span className="text-xs font-semibold text-gray-700">{product.threadCount} TC</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart 
            className={`w-5 h-5 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </button>
      </div>
      <div className="p-4 sm:p-6">
        <h3
          className="text-lg sm:text-xl mb-2 cursor-pointer hover:text-blue-600 transition-colors"
          onClick={() => {
            navigate(`/product/${product.id}`);
            window.scrollTo(0, 0);
          }}
        >
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating || 0)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">({product.reviews?.length || 0} reviews)</span>
        </div>
        <p className="text-sm text-gray-600 mb-1">{product.material}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl sm:text-2xl text-gray-900">${product.price}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}