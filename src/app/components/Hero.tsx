export function Hero() {
  return (
    <section className="relative bg-gray-900 text-white">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1766928210443-0be92ed5884a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWQlMjBzaGVldHMlMjBiZWRyb29tfGVufDF8fHx8MTc2OTExNDQwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Luxury bedding"
          className="w-full h-full object-cover opacity-60"
        />
      </div>
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="max-w-2xl">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6">
            Premium Comfort for Your Best Sleep
          </h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-gray-200">
            Discover our collection of luxurious bed sheets crafted from the finest materials for ultimate comfort.
          </p>
          <button className="bg-white text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-gray-100 transition-colors text-base sm:text-lg">
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
}
