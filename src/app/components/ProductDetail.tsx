import { X, ShoppingCart, Heart, Check, ZoomIn } from 'lucide-react';
import { useState } from 'react';
import { Product } from './ProductCard';

interface ProductDetailProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, sheetType: string) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
}

export function ProductDetail({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
}: ProductDetailProps) {
  const [sheetType, setSheetType] = useState<'flat' | 'fitted'>('flat');
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  if (!isOpen || !product) return null;

  const productImages = product.images ? [product.image, ...product.images] : [product.image];
  const currentImage = productImages[selectedImageIndex];

  const handleAddToCart = () => {
    onAddToCart(product, sheetType);
  };

  const handleBuyNow = () => {
    onAddToCart(product, sheetType);
    // In a real app, this would redirect to checkout
    alert('Proceeding to checkout...');
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 overflow-y-auto"
        onClick={onClose}
      >
        {/* Modal Container */}
        <div className="min-h-screen px-4 flex items-center justify-center py-8">
          <div
            className="relative bg-white rounded-lg shadow-2xl max-w-7xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 p-6 sm:p-8">
              {/* Product Image Gallery */}
              <div className="flex flex-col gap-4">
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
                      isZoomed ? 'scale-190' : 'scale-100'
                    }`}
                    style={
                      isZoomed
                        ? {
                            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                          }
                        : {}
                    }
                  />
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
                
                <button
                  onClick={() => onToggleWishlist(product)}
                  className="w-full py-3 rounded-lg border-2 border-gray-200 hover:border-red-500 transition-colors flex items-center justify-center gap-2"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'
                    }`}
                  />
                  <span className={isInWishlist ? 'text-red-500' : 'text-gray-700'}>
                    {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </span>
                </button>
              </div>

              {/* Product Details */}
              <div className="flex flex-col">
                <div className="flex-1">
                  <h2 className="text-3xl sm:text-4xl mb-3">{product.name}</h2>
                  <p className="text-3xl sm:text-4xl text-blue-600 mb-4">${product.price}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">{product.material}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">{product.threadCount} Thread Count</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">Free Shipping</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">30-Day Money Back Guarantee</span>
                    </div>
                  </div>

                  {/* Sheet Type Selection */}
                  <div className="mb-6">
                    <label className="block text-base mb-3">Sheet Type</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setSheetType('flat')}
                        className={`px-4 py-3 rounded-lg border-2 transition-all ${
                          sheetType === 'flat'
                            ? 'border-blue-500 bg-blue-50 text-blue-500'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        Flat Sheet
                      </button>
                      <button
                        onClick={() => setSheetType('fitted')}
                        className={`px-4 py-3 rounded-lg border-2 transition-all ${
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
                  <div className="mb-6">
                    <label className="block text-base mb-3">Quantity</label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 rounded-lg border-2 border-gray-200 hover:border-gray-300 flex items-center justify-center text-lg"
                      >
                        -
                      </button>
                      <span className="text-lg w-12 text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 rounded-lg border-2 border-gray-200 hover:border-gray-300 flex items-center justify-center text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Product Description */}
                  <div className="mb-6">
                    <h3 className="text-lg mb-2">Product Description</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Experience ultimate comfort with our premium {product.name.toLowerCase()}. 
                      Crafted from {product.material.toLowerCase()}, these sheets offer exceptional 
                      breathability and durability. Perfect for year-round comfort, they become softer 
                      with each wash while maintaining their luxurious feel.
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4 border-t">
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-slate-700 text-white px-6 py-4 rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 text-lg"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="w-full bg-gray-900 text-white px-6 py-4 rounded-lg hover:bg-gray-800 transition-colors text-lg"
                  >
                    Buy It Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
