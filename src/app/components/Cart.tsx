import { X, Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { Product } from './ProductCard';

export interface CartItem extends Product {
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

export function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b">
          <h2 className="text-xl sm:text-2xl">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Close cart"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-12 px-4">
              <div className="mb-6">
                <div className="p-6 bg-gray-100 rounded-full mb-4">
                  <ShoppingCart className="w-16 h-16 text-gray-400" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-600 text-center mb-6 max-w-sm">
                Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
              </p>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 border-b pb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="text-base mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">${item.price}</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors touch-manipulation"
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <span className="text-base font-semibold w-12 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors touch-manipulation"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="ml-auto p-2 min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-red-50 rounded-lg text-red-600 transition-colors touch-manipulation"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
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
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg">Total</span>
              <span className="text-2xl">${total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-slate-700 text-white py-4 rounded-lg hover:bg-slate-800 transition-colors text-base font-semibold touch-manipulation min-h-[48px]">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
