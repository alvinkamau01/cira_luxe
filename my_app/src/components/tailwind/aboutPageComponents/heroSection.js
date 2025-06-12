export function HeroSection() {
   return (
      <div className="flex items-center min-h-screen bg-neutral-50">
        <div className="absolute inset-0 overflow-hidden items-center justify-center w-full h-full">
          <img
            src="https://www.istockphoto.com/photo/woman-beauty-portrait-gm1189453442-336802247?searchscope=image%2Cfilm"
            alt="Skincare products arrangement"
            width={2000}
            height={1200}
            className="object-cover w-full h-full opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-rose-50/90 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex justify-center items-center">
          <div className="max-w-2xl text-center">
            <h1 className="text-5xl font-serif font-light mb-6">Pure Science, Natural Beauty</h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              At Luminous, we believe in the perfect harmony between scientific innovation and nature's wisdom. Our
              commitment to clean, effective skincare has made us a trusted name in beauty for over a decade.
            </p>
            <a href ="/homePage" className="bg-rose-600 hover:no-underline text-white px-8 py-3 rounded-full hover:bg-rose-700 transition-colors">
              Proceed to store
            </a>
          </div>
        </div>
      </div>
    );
  }
  