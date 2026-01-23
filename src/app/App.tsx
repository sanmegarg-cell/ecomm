import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { toast } from 'sonner';
import { Header } from '@/app/components/Header';
import { Hero } from '@/app/components/Hero';
import { ProductGrid } from '@/app/components/ProductGrid';
import { Cart, CartItem } from '@/app/components/Cart';
import { Wishlist } from '@/app/components/Wishlist';
import { CategoryPanel, Category } from '@/app/components/CategoryPanel';
import { MobileCategoryFilter } from '@/app/components/MobileCategoryFilter';
import { MobileBottomNav } from '@/app/components/MobileBottomNav';
import { ProductDetailPage } from '@/app/components/ProductDetailPage';
import { Footer } from '@/app/components/Footer';
import { Product } from '@/app/components/ProductCard';

const products: Product[] = [
  {
    id: 1,
    name: 'Classic White Cotton',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1542716507-9c9c00501321?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGJlZCUyMGxpbmVufGVufDF8fHx8MTc2OTA1MTc3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    images: [
      'https://images.unsplash.com/photo-1636892843533-d2cefbd4b507?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1759176171634-674f37841636?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    ],
    material: '100% Egyptian Cotton',
    threadCount: 800,
    sheetType: 'flat',
    rating: 4.5,
    reviews: [
      { id: 1, author: 'Sarah M.', text: 'Amazing quality and very comfortable!', rating: 5 },
      { id: 2, author: 'John D.', text: 'Great value for the price', rating: 4 },
    ],
  },
  {
    id: 2,
    name: 'Charcoal Grey Premium',
    price: 109.99,
    image: 'https://images.unsplash.com/photo-1568305427839-b16e35fe0072?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmV5JTIwYmVkJTIwc2hlZXRzfGVufDF8fHx8MTc2OTExNDQxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    material: 'Organic Cotton',
    threadCount: 1000,
    sheetType: 'fitted',
    rating: 4.8,
    reviews: [
      { id: 3, author: 'Emily T.', text: 'Love the premium feel', rating: 5 },
      { id: 4, author: 'Mike R.', text: 'Excellent durability', rating: 5 },
      { id: 5, author: 'Lisa W.', text: 'Perfect for my bedroom', rating: 4 },
    ],
  },
  {
    id: 3,
    name: 'Ocean Blue Luxury',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1759176171634-674f37841636?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlJTIwYmVkZGluZyUyMGJlZHJvb218ZW58MXx8fHwxNzY5MTE0NDEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    material: 'Silk Blend',
    threadCount: 900,
    sheetType: 'flat',
    rating: 5,
    reviews: [
      { id: 6, author: 'Alex P.', text: 'Simply luxurious!', rating: 5 },
      { id: 7, author: 'Nina B.', text: 'Best purchase ever', rating: 5 },
    ],
  },
  {
    id: 4,
    name: 'Warm Beige Comfort',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1636892843533-d2cefbd4b507?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWlnZSUyMGJlZCUyMHNoZWV0c3xlbnwxfHx8fDE3NjkxMTQ0MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    material: 'Premium Linen',
    threadCount: 750,
    sheetType: 'fitted',
    rating: 4.3,
    reviews: [
      { id: 8, author: 'David H.', text: 'Very comfortable and warm', rating: 4 },
      { id: 9, author: 'Rachel G.', text: 'Good quality', rating: 4 },
      { id: 10, author: 'Chris M.', text: 'Looks great', rating: 5 },
    ],
  },
  {
    id: 5,
    name: 'Midnight Black Elite',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1668089677938-b52086753f77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWRyb29tJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY5MDcyMzc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    material: 'Bamboo Cotton',
    threadCount: 850,
    sheetType: 'flat',
    rating: 4.6,
    reviews: [
      { id: 11, author: 'Tom S.', text: 'Elegant and sophisticated', rating: 5 },
      { id: 12, author: 'Anna L.', text: 'Excellent material', rating: 4 },
    ],
  },
  {
    id: 6,
    name: 'Ivory Silk Touch',
    price: 139.99,
    image: 'https://images.unsplash.com/photo-1766928210443-0be92ed5884a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWQlMjBzaGVldHMlMjBiZWRyb29tfGVufDF8fHx8MTc2OTExNDQwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    material: 'Pure Silk',
    threadCount: 950,
    sheetType: 'fitted',
    rating: 4.9,
    reviews: [
      { id: 13, author: 'Victoria K.', text: 'Pure luxury at its finest', rating: 5 },
      { id: 14, author: 'James F.', text: 'Worth every penny', rating: 5 },
      { id: 15, author: 'Sophie N.', text: 'Incredible quality', rating: 5 },
    ],
  },
  {
    id: 7,
    name: 'Sage Green Natural',
    price: 94.99,
    image: 'https://images.unsplash.com/photo-1542716507-9c9c00501321?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGJlZCUyMGxpbmVufGVufDF8fHx8MTc2OTA1MTc3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    material: 'Organic Linen',
    threadCount: 700,
    sheetType: 'flat',
    rating: 4.4,
    reviews: [
      { id: 16, author: 'Oliver C.', text: 'Natural and comfortable', rating: 4 },
      { id: 17, author: 'Emma J.', text: 'Eco-friendly choice', rating: 5 },
    ],
  },
  {
    id: 8,
    name: 'Blush Pink Deluxe',
    price: 104.99,
    image: 'https://images.unsplash.com/photo-1568305427839-b16e35fe0072?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmV5JTIwYmVkJTIwc2hlZXRzfGVufDF8fHx8MTc2OTExNDQxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    material: 'Cotton Sateen',
    threadCount: 820,
    sheetType: 'fitted',
    rating: 4.7,
    reviews: [
      { id: 18, author: 'Grace H.', text: 'Beautiful color and soft', rating: 5 },
      { id: 19, author: 'Mark B.', text: 'My wife loves it', rating: 5 },
      { id: 20, author: 'Laura S.', text: 'Premium feel', rating: 4 },
    ],
  },
];

// Home component containing the main page content
function Home({
  cartItems,
  setCartItems,
  wishlistItems,
  setWishlistItems
}: {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  wishlistItems: Product[];
  setWishlistItems: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSheetType, setSelectedSheetType] = useState<'all' | 'flat' | 'fitted'>('all');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  
  // Calculate min and max prices from products
  const priceRange = useMemo(() => {
    const prices = products.map(p => p.price);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices))
    };
  }, []);
  
  const [priceRangeFilter, setPriceRangeFilter] = useState<[number, number]>(() => {
    const prices = products.map(p => p.price);
    const min = Math.floor(Math.min(...prices));
    const max = Math.ceil(Math.max(...prices));
    return [min, max];
  });

  // Generate categories from products
  const categories: Category[] = useMemo(() => {
    const categoryMap = new Map<string, number>();
    
    products.forEach((product) => {
      const categoryKey = product.material.toLowerCase().includes('cotton') 
        ? 'cotton'
        : product.material.toLowerCase().includes('linen')
        ? 'linen'
        : product.material.toLowerCase().includes('silk')
        ? 'silk'
        : product.material.toLowerCase().includes('bamboo')
        ? 'bamboo'
        : 'other';
      
      categoryMap.set(categoryKey, (categoryMap.get(categoryKey) || 0) + 1);
    });

    const categoryNames: Record<string, string> = {
      cotton: 'Cotton',
      linen: 'Linen',
      silk: 'Silk',
      bamboo: 'Bamboo',
      other: 'Other Materials',
    };

    return Array.from(categoryMap.entries()).map(([id, count]) => ({
      id,
      name: categoryNames[id] || id,
      count,
    }));
  }, []);

  // Scroll to Top functionality
  useEffect(() => {
    const handleScrollVisibility = () => {
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };
    window.addEventListener('scroll', handleScrollVisibility);
    return () => window.removeEventListener('scroll', handleScrollVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter products based on search, category, and price
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((product) => {
        const material = product.material.toLowerCase();
        return material.includes(selectedCategory);
      });
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.material.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price range
    filtered = filtered.filter((product) =>
      product.price >= priceRangeFilter[0] && product.price <= priceRangeFilter[1]
    );

    // Filter by sheet type
    if (selectedSheetType !== 'all') {
      filtered = filtered.filter((product) =>
        product.sheetType === selectedSheetType
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery, priceRangeFilter, selectedSheetType]);

  const handleAddToCart = (product: Product, sheetType?: string) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        const updated = prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        toast.success(`${product.name} quantity updated!`, {
          description: `Quantity: ${existingItem.quantity + 1}`,
          style: {
            background: '#475569',
            color: '#ffffff',
            border: '1px solid #334155',
          },
        });
        setCartOpen(true);
        return updated;
      }
      toast.success(`${product.name} added to cart!`, {
        description: 'Item has been added to your shopping cart.',
        style: {
          background: '#475569',
          color: '#ffffff',
          border: '1px solid #334155',
        },
      });
      setCartOpen(true);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((prev) => {
      const item = prev.find((item) => item.id === id);
      const updated = prev.map((item) => (item.id === id ? { ...item, quantity } : item));
      if (item) {
        toast.info(`Quantity updated to ${quantity}`, {
          description: item.name,
          style: {
            background: '#475569',
            color: '#ffffff',
            border: '1px solid #334155',
          },
        });
      }
      return updated;
    });
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => {
      const item = prev.find((item) => item.id !== id);
      if (item) {
        toast.success(`${item.name} removed from cart`, {
          description: 'Item has been removed from your shopping cart.',
          style: {
            background: '#475569',
            color: '#ffffff',
            border: '1px solid #334155',
          },
        });
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        toast.success(`${product.name} removed from wishlist`, {
          description: 'Item has been removed from your wishlist.',
          style: {
            background: '#f59e0b',
            color: '#ffffff',
            border: '1px solid #d97706',
          },
        });
        return prev.filter((item) => item.id !== product.id);
      }
      toast.success(`${product.name} added to wishlist!`, {
        description: 'Item has been added to your wishlist.',
        style: {
          background: '#f59e0b',
          color: '#ffffff',
          border: '1px solid #d97706',
        },
      });
      return [...prev, product];
    });
  };

  const handleRemoveFromWishlist = (id: number) => {
    setWishlistItems((prev) => {
      const item = prev.find((item) => item.id !== id);
      if (item) {
        toast.success(`${item.name} removed from wishlist`, {
          description: 'Item has been removed from your wishlist.',
          style: {
            background: '#f59e0b',
            color: '#ffffff',
            border: '1px solid #d97706',
          },
        });
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  const handleViewDetails = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistIds = new Set(wishlistItems.map((item) => item.id));

  return (
    <div className="min-h-screen flex flex-col pb-20 lg:pb-0">
      <Header
        cartItemCount={totalItems}
        wishlistItemCount={wishlistItems.length}
        onCartClick={() => setCartOpen(true)}
        onWishlistClick={() => setWishlistOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <CategoryPanel
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        isExpanded={sidebarExpanded}
        onToggleExpand={() => setSidebarExpanded(!sidebarExpanded)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        priceRange={priceRange}
        priceRangeFilter={priceRangeFilter}
        onPriceRangeChange={setPriceRangeFilter}
        selectedSheetType={selectedSheetType}
        onSheetTypeChange={setSelectedSheetType}
      />
      <div className={`flex-1 transition-all duration-300 ${sidebarExpanded ? 'lg:ml-64' : 'lg:ml-0'}`}>
        <Hero />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <ProductGrid
              products={filteredProducts}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlistIds}
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              onMobileFilterClick={() => setMobileFilterOpen(true)}
              onViewDetails={handleViewDetails}
            />
          </div>
        </div>
      </div>
      <Footer />
      <MobileBottomNav
        cartItemCount={totalItems}
        wishlistItemCount={wishlistItems.length}
        onCartClick={() => setCartOpen(true)}
        onWishlistClick={() => setWishlistOpen(true)}
        onSearchClick={() => {
          // Scroll to top and focus search if available
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
      <Wishlist
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        items={wishlistItems}
        onRemoveItem={handleRemoveFromWishlist}
        onAddToCart={handleAddToCart}
      />
      <MobileCategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        isOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
      />

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 bg-slate-700 text-white rounded-full shadow-lg hover:bg-slate-800 transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

// Main App component with routing
export default function App() {
  // Load cart and wishlist from localStorage on mount
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('dreamweave_cart');
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        // Validate that it's an array
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
      return [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      // Clear invalid data
      localStorage.removeItem('dreamweave_cart');
      return [];
    }
  });

  const [wishlistItems, setWishlistItems] = useState<Product[]>(() => {
    try {
      const savedWishlist = localStorage.getItem('dreamweave_wishlist');
      if (savedWishlist) {
        const parsed = JSON.parse(savedWishlist);
        // Validate that it's an array
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
      return [];
    } catch (error) {
      console.error('Error loading wishlist from localStorage:', error);
      // Clear invalid data
      localStorage.removeItem('dreamweave_wishlist');
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('dreamweave_cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cartItems]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('dreamweave_wishlist', JSON.stringify(wishlistItems));
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error);
    }
  }, [wishlistItems]);

  const handleAddToCart = (product: Product, sheetType?: string) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        const updated = prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        toast.success(`${product.name} quantity updated in cart!`, {
          description: `Quantity: ${existingItem.quantity + 1}`,
          style: {
            background: '#475569',
            color: '#ffffff',
            border: '1px solid #334155',
          },
        });
        return updated;
      }
      toast.success(`${product.name} added to cart!`, {
        description: 'Item has been added to your shopping cart.',
        style: {
          background: '#475569',
          color: '#ffffff',
          border: '1px solid #334155',
        },
      });
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((prev) => {
      const item = prev.find((item) => item.id === id);
      const updated = prev.map((item) => (item.id === id ? { ...item, quantity } : item));
      if (item) {
        toast.info(`Quantity updated to ${quantity}`, {
          description: item.name,
          style: {
            background: '#475569',
            color: '#ffffff',
            border: '1px solid #334155',
          },
        });
      }
      return updated;
    });
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => {
      const item = prev.find((item) => item.id !== id);
      if (item) {
        toast.success(`${item.name} removed from cart`, {
          description: 'Item has been removed from your shopping cart.',
          style: {
            background: '#475569',
            color: '#ffffff',
            border: '1px solid #334155',
          },
        });
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        toast.success(`${product.name} removed from wishlist`, {
          description: 'Item has been removed from your wishlist.',
          style: {
            background: '#f59e0b',
            color: '#ffffff',
            border: '1px solid #d97706',
          },
        });
        return prev.filter((item) => item.id !== product.id);
      }
      toast.success(`${product.name} added to wishlist!`, {
        description: 'Item has been added to your wishlist.',
        style: {
          background: '#f59e0b',
          color: '#ffffff',
          border: '1px solid #d97706',
        },
      });
      return [...prev, product];
    });
  };

  const handleRemoveFromWishlist = (id: number) => {
    setWishlistItems((prev) => {
      const item = prev.find((item) => item.id !== id);
      if (item) {
        toast.success(`${item.name} removed from wishlist`, {
          description: 'Item has been removed from your wishlist.',
          style: {
            background: '#f59e0b',
            color: '#ffffff',
            border: '1px solid #d97706',
          },
        });
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  const wishlistIds = new Set(wishlistItems.map((item) => item.id));

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            cartItems={cartItems}
            setCartItems={setCartItems}
            wishlistItems={wishlistItems}
            setWishlistItems={setWishlistItems}
          />
        }
      />
      <Route
        path="/product/:id"
        element={
          <ProductDetailPage
            products={products}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            cartItems={cartItems}
            wishlistItems={wishlistItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onRemoveFromWishlist={handleRemoveFromWishlist}
          />
        }
      />
    </Routes>
  );
}