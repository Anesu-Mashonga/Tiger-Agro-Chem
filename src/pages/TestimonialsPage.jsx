import { useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";
import { initializeStorage, readStorage } from "../utils/storage";
import { defaultTestimonials } from "../data/defaultData";

function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    initializeStorage("testimonials", defaultTestimonials);
    setTestimonials(readStorage("testimonials", defaultTestimonials));
  }, []);

  return (
    <div>
      <div className="bg-amber-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Customer Testimonials
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from farmers and agronomists who trust Tiger Agrochem for
            products, training, and crop support.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-8 rounded-2xl shadow-md relative"
            >
              <Quote className="h-8 w-8 text-emerald-200 absolute top-4 right-4" />
              <div className="flex text-amber-400 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <Star key={index} className="h-5 w-5" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <span className="text-emerald-700 font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TestimonialsPage;
