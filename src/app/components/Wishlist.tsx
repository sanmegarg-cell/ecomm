import { X, ShoppingCart, Trash2 } from 'lucide-react';
import { Product } from './ProductCard';

interface WishlistProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemoveItem: (id: number) => void;
  onAddToCart: (product: Product) => void;
}

export function Wishlist({ isOpen, onClose, items, onRemoveItem, onAddToCart }: WishlistProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Wishlist Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b">
          <h2 className="text-xl sm:text-2xl">My Wishlist</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Close wishlist"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {items.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              Your wishlist is empty
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 border rounded-lg p-3 hover:shadow-md transition-shadow">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="text-base mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">{item.material}</p>
                    <p className="text-lg mb-2">${item.price}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          onAddToCart(item);
                          onRemoveItem(item.id);
                        }}
                        className="flex items-center gap-1 bg-slate-700 text-white px-3 py-1 rounded text-sm hover:bg-slate-800 transition-colors"
                      >
                        <ShoppingCart className="w-3 h-3" />
                        <span>Add to Cart</span>
                      </button>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1 hover:bg-red-50 rounded text-red-600"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-4 sm:p-6">
            <p className="text-sm text-gray-600 text-center">
              {items.length} {items.length === 1 ? 'item' : 'items'} in your wishlist
            </p>
          </div>
        )}
      </div>
    </>
  );
}
