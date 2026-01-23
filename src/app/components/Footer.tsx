export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl mb-4">DreamWeave</h3>
            <p className="text-gray-400 text-sm">
              Premium bed sheets for the perfect night's sleep.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-base mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white">All Products</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Cotton Sheets</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Linen Sheets</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Silk Sheets</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-base mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Shipping Info</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Returns</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-base mb-4">About</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white">Our Story</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Sustainability</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Reviews</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 DreamWeave. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
