import { ShoppingCart, Menu, X, Heart, Search } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  cartItemCount: number;
  wishlistItemCount: number;
  onCartClick: () => void;
  onWishlistClick: () => void;
  onSearchClick?: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export function Header({ cartItemCount, wishlistItemCount, onCartClick, onWishlistClick, onSearchClick, searchQuery, onSearchChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl sm:text-2xl tracking-tight">
              DreamWeave
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-gray-900">Shop</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Collections</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">About</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Contact</a>
          </nav>

          {/* Desktop Cart/Wishlist Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={onWishlistClick}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-6 h-6" />
              {wishlistItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlistItemCount}
                </span>
              )}
            </button>

            <button
              onClick={onCartClick}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-slate-700 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Search"
            >
              <Search className="w-6 h-6" />
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showMobileSearch && (
          <div className="md:hidden py-3 border-t animate-in slide-in-from-top">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery || ''}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 focus:bg-white text-base"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-1 border-t animate-in slide-in-from-top">
            <a href="#" className="block py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-base font-medium">Shop</a>
            <a href="#" className="block py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-base font-medium">Collections</a>
            <a href="#" className="block py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-base font-medium">About</a>
            <a href="#" className="block py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-base font-medium">Contact</a>
            <div className="pt-2 mt-2 border-t">
              <button
                onClick={() => {
                  onWishlistClick();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-base font-medium"
              >
                <span>Wishlist</span>
                {wishlistItemCount > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {wishlistItemCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => {
                  onCartClick();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-base font-medium"
              >
                <span>Shopping Cart</span>
                {cartItemCount > 0 && (
                  <span className="bg-slate-700 text-white text-xs px-2 py-1 rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}