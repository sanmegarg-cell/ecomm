import { Home, ShoppingCart, Heart, Search } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface MobileBottomNavProps {
  cartItemCount: number;
  wishlistItemCount: number;
  onCartClick: () => void;
  onWishlistClick: () => void;
  onSearchClick: () => void;
}

export function MobileBottomNav({
  cartItemCount,
  wishlistItemCount,
  onCartClick,
  onWishlistClick,
  onSearchClick,
}: MobileBottomNavProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-inset-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        <button
          onClick={() => navigate('/')}
          className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors ${
            isHome ? 'text-slate-700' : 'text-gray-500'
          }`}
          aria-label="Home"
        >
          <Home className={`w-6 h-6 ${isHome ? 'fill-current' : ''}`} />
          <span className="text-xs font-medium">Home</span>
        </button>

        <button
          onClick={onSearchClick}
          className="flex flex-col items-center justify-center gap-1 flex-1 h-full text-gray-500 transition-colors"
          aria-label="Search"
        >
          <Search className="w-6 h-6" />
          <span className="text-xs font-medium">Search</span>
        </button>

        <button
          onClick={onWishlistClick}
          className="relative flex flex-col items-center justify-center gap-1 flex-1 h-full text-gray-500 transition-colors"
          aria-label="Wishlist"
        >
          <Heart className="w-6 h-6" />
          <span className="text-xs font-medium">Wishlist</span>
          {wishlistItemCount > 0 && (
            <span className="absolute top-1 right-1/4 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
              {wishlistItemCount > 9 ? '9+' : wishlistItemCount}
            </span>
          )}
        </button>

        <button
          onClick={onCartClick}
          className="relative flex flex-col items-center justify-center gap-1 flex-1 h-full text-gray-500 transition-colors"
          aria-label="Shopping cart"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="text-xs font-medium">Cart</span>
          {cartItemCount > 0 && (
            <span className="absolute top-1 right-1/4 bg-slate-700 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
              {cartItemCount > 9 ? '9+' : cartItemCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
