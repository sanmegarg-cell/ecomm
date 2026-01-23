import { X, ShoppingCart, Heart, Check, ZoomIn, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from './ProductCard';
import { ProductCard } from './ProductCard';
import { Header } from './Header';
import { Cart, CartItem } from './Cart';
import { Wishlist } from './Wishlist';
import { SearchModal } from './SearchModal';

interface ProductDetailPageProps {
  products: Product[];
  onAddToCart: (product: Product, sheetType: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: Set<number>;
  cartItems: CartItem[];
  wishlistItems: Product[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onRemoveFromWishlist: (id: number) => void;
}

export function ProductDetailPage({
  products,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  cartItems,
  wishlistItems,
  onUpdateQuantity,
  onRemoveItem,
  onRemoveFromWishlist,
}: ProductDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [sheetType, setSheetType] = useState<'flat' | 'fitted'>('flat');
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const product = products.find(p => p.id === parseInt(id || '0'));

  useEffect(() => {
    if (product) {
      // Load initial recommended products
      loadRecommendedProducts(1);
    }
  }, [product]);

  const loadRecommendedProducts = async (pageNum: number) => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Get recommended products (exclude current product and already loaded ones)
    const excludedIds = new Set([product?.id, ...recommendedProducts.map(p => p.id)]);
    const availableProducts = products.filter(p => !excludedIds.has(p.id));

    const startIndex = (pageNum - 1) * 8;
    const endIndex = startIndex + 8;
    const newProducts = availableProducts.slice(startIndex, endIndex);

    if (newProducts.length < 8) {
      setHasMore(false);
    }

    setRecommendedProducts(prev => [...prev, ...newProducts]);
    setIsLoading(false);
  };

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Load more when user is near bottom (100px threshold)
    if (scrollTop + windowHeight >= documentHeight - 100 && !isLoading && hasMore) {
      setPage(prev => prev + 1);
      loadRecommendedProducts(page + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, hasMore, page]);

  const handleAddToCart = () => {
    if (product) {
      onAddToCart(product, sheetType);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      onAddToCart(product, sheetType);
      // In a real app, this would redirect to checkout
      alert('Proceeding to checkout...');
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const handleViewDetails = (recommendedProduct: Product) => {
    navigate(`/product/${recommendedProduct.id}`);
    // Scroll to top when navigating to new product
    window.scrollTo(0, 0);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const productImages = product.images ? [product.image, ...product.images] : [product.image];
  const currentImage = productImages[selectedImageIndex];

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <Header
        cartItemCount={totalItems}
        wishlistItemCount={wishlistItems.length}
        onCartClick={() => setCartOpen(true)}
        onWishlistClick={() => setWishlistOpen(true)}
        onSearchClick={() => setSearchOpen(true)}
      />

      {/* Product Detail Section */}
   ``   <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image Gallery */}
          <div className="flex flex-col gap-6">
            {/* Main Image with Zoom */}
            <div
              className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-zoom-in"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
            >
              <img
                src={currentImage}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-200 ${
                  isZoomed ? 'scale-150' : 'scale-100'
                }`}
                style={
                  isZoomed
                    ? {
                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      }
                    : {}
                }
              />
              <button
                onClick={() => onToggleWishlist(product)}
                className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                aria-label={wishlistIds.has(product.id) ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart
                  className={`w-5 h-5 ${
                    wishlistIds.has(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                  }`}
                />
              </button>
              {!isZoomed && (
                <div className="absolute bottom-3 right-3 p-2 bg-white rounded-lg shadow-md flex items-center gap-1">
                  <ZoomIn className="w-4 h-4 text-gray-700" />
                  <span className="text-xs font-semibold text-gray-700">Hover to Zoom</span>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {productImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {productImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === idx
                        ? 'border-blue-500'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <div className="flex-1">
              <h1 className="text-4xl lg:text-5xl mb-4">{product.name}</h1>
              <p className="text-4xl lg:text-5xl text-blue-600 mb-6">${product.price}</p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{product.material}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{product.threadCount} Thread Count</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Free Shipping</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">30-Day Money Back Guarantee</span>
                </div>
              </div>

              {/* Sheet Type Selection */}
              <div className="mb-8">
                <label className="block text-lg mb-4">Sheet Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setSheetType('flat')}
                    className={`px-6 py-4 rounded-lg border-2 transition-all text-lg ${
                      sheetType === 'flat'
                        ? 'border-blue-500 bg-blue-50 text-blue-500'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    Flat Sheet
                  </button>
                  <button
                    onClick={() => setSheetType('fitted')}
                    className={`px-6 py-4 rounded-lg border-2 transition-all text-lg ${
                      sheetType === 'fitted'
                        ? 'border-blue-500 bg-blue-50 text-blue-500'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    Fitted Sheet
                  </button>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <label className="block text-lg mb-4">Quantity</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 rounded-lg border-2 border-gray-200 hover:border-gray-300 flex items-center justify-center text-xl"
                  >
                    -
                  </button>
                  <span className="text-xl w-16 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 rounded-lg border-2 border-gray-200 hover:border-gray-300 flex items-center justify-center text-xl"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Product Description */}
              <div className="mb-8">
                <h3 className="text-2xl mb-4">Product Description</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Experience ultimate comfort with our premium {product.name.toLowerCase()}.
                  Crafted from {product.material.toLowerCase()}, these sheets offer exceptional
                  breathability and durability. Perfect for year-round comfort, they become softer
                  with each wash while maintaining their luxurious feel.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 pt-6 border-t">
              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-500 text-white px-8 py-5 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-3 text-xl"
              >
                <ShoppingCart className="w-6 h-6" />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full bg-gray-900 text-white px-8 py-5 rounded-lg hover:bg-gray-800 transition-colors text-xl"
              >
                Buy It Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Products Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">Recommended Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {recommendedProducts.map((recommendedProduct) => (
              <ProductCard
                key={recommendedProduct.id}
                product={recommendedProduct}
                onAddToCart={(p) => onAddToCart(p, 'flat')}
                onToggleWishlist={onToggleWishlist}
                isInWishlist={wishlistIds.has(recommendedProduct.id)}
                onViewDetails={() => handleViewDetails(recommendedProduct)}
              />
            ))}
          </div>
          {isLoading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <p className="mt-4 text-gray-600">Loading more products...</p>
            </div>
          )}
          {!hasMore && recommendedProducts.length > 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600">No more products to show</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Components */}
      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={onUpdateQuantity}
        onRemoveItem={onRemoveItem}
      />
      <Wishlist
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        items={wishlistItems}
        onRemoveItem={onRemoveFromWishlist}
        onAddToCart={onAddToCart}
      />
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        searchQuery={searchQuery}
        onSearchChange={(query) => {
          setSearchQuery(query);
          navigate(`/?search=${encodeURIComponent(query)}`);
        }}
      />
    </div>
  );
}