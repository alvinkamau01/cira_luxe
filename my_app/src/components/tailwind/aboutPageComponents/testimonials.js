
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Skincare Enthusiast",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "The Radiance Serum has completely transformed my skin. I've never received so many compliments on my complexion!",
    rating: 5,
  },
  {
    name: "Emily Chen",
    role: "Beauty Blogger",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "As someone who tests countless products, I can say that these are truly exceptional. The results speak for themselves.",
    rating: 5,
  },
  {
    name: "Maria Garcia",
    role: "Makeup Artist",
    image: "/placeholder.svg?height=100&width=100",
    quote: "I recommend these products to all my clients. They create the perfect canvas for makeup application.",
    rating: 5,
  },
]

export function TestimonialSection() {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-serif mb-6">What Our Customers Say</h2>
          <p className="text-gray-600 leading-relaxed">
            Don't just take our word for it. Hear from our community of satisfied customers who have experienced the
            transformation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-6 bg-neutral-50 rounded-2xl">
              <div className="flex items-center gap-4 mb-6">
                <image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-medium">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

