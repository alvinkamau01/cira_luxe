import { Leaf, Star, Shield, RefreshCcw } from "lucide-react"

const values = [
  {
    icon: Leaf,
    title: "Natural Ingredients",
    description: "We source the finest natural ingredients, ensuring each product is gentle yet effective.",
  },
  {
    icon: Star,
    title: "Quality First",
    description: "Every formula is rigorously tested to meet the highest standards of quality and safety.",
  },
  {
    icon: Shield,
    title: "Clean Beauty",
    description: "Free from harmful chemicals, our products are safe for you and the environment.",
  },
  {
    icon: RefreshCcw,
    title: "Sustainable Practice",
    description: "We're committed to eco-friendly packaging and sustainable production methods.",
  },
]

export function MissionSection() {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-serif mb-6">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            To revolutionize skincare by creating products that combine the best of science and nature, while
            maintaining our commitment to sustainability and ethical practices.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-rose-50 flex items-center justify-center">
                <value.icon className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-medium mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

