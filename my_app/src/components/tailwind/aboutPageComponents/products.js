

const products = [
  {
    name: "Radiance Serum",
    description: "A powerful blend of Vitamin C and hyaluronic acid that brightens and hydrates your skin.",
    ingredients: ["Vitamin C", "Hyaluronic Acid", "Niacinamide", "Green Tea Extract"],
    image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fplaceholder-image&psig=AOvVaw35EIRuUAkBmxdDWUTcrXff&ust=1738657622769000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOjA1daKp4sDFQAAAAAdAAAAABAE",
  },
  {
    name: "Renewal Night Cream",
    description: "Rich in retinol and peptides, this cream works overnight to regenerate and repair your skin.",
    ingredients: ["Retinol", "Peptides", "Ceramides", "Shea Butter"],
    image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fplaceholder-image&psig=AOvVaw35EIRuUAkBmxdDWUTcrXff&ust=1738657622769000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOjA1daKp4sDFQAAAAAdAAAAABAE",
  },
  {
    name: "Gentle Cleansing Gel",
    description: "A soft, pH-balanced formula that cleanses without stripping your skin's natural moisture.",
    ingredients: ["Aloe Vera", "Chamomile", "Glycerin", "Green Tea"],
    image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fplaceholder-image&psig=AOvVaw35EIRuUAkBmxdDWUTcrXff&ust=1738657622769000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOjA1daKp4sDFQAAAAAdAAAAABAE",
  },
]

export function ProductSection() {
  return (
    <div className="py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-serif mb-6">Our Signature Products</h2>
          <p className="text-gray-600 leading-relaxed">
            Each product is thoughtfully formulated to deliver exceptional results while maintaining our commitment to
            clean, sustainable beauty.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-64">
                <image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium mb-3">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Key Ingredients:</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients.map((ingredient, idx) => (
                      <span key={idx} className="px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-sm">
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

