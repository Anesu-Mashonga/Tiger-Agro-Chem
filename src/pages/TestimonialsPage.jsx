import { useEffect, useState } from "react";
import { Quote, Star, StarHalf } from "lucide-react";
import { buildApiUrl } from "../utils/api";

const TESTIMONIALS_API = buildApiUrl("testimonials");

function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const normalizeTestimonial = (item) => {
      const attrs = item.attributes || item;
      return {
        id: item.id || attrs.id,
        name: attrs.name || attrs.Name || attrs.title || attrs.fullName || "Anonymous",
        role:
          attrs.profession ||
          attrs.Profession ||
          attrs.role ||
          attrs.Role ||
          attrs.position ||
          attrs.job ||
          attrs.occupation ||
          "",
        content:
          attrs.content ||
          attrs.Content ||
          attrs.testimonial ||
          attrs.Testimonial ||
          attrs.review ||
          attrs.description ||
          attrs.Description ||
          "",
        rating: Math.max(
          0,
          Math.min(
            5,
            Math.round((Number(attrs.rating ?? attrs.Rating ?? 0) || 0) * 2) / 2,
          ),
        ),
      };
    };

    const normalizeResponse = (data) => {
      if (!data) return [];
      const items = Array.isArray(data) ? data : data.data || [];
      return items.map(normalizeTestimonial);
    };

    fetch(`${TESTIMONIALS_API}?populate=*`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch testimonials (${res.status})`);
        }
        return res.json();
      })
      .then((json) => {
        const normalized = normalizeResponse(json);
        setTestimonials(normalized);
      })
      .catch((error) => {
        console.error("Error fetching testimonials:", error);
        setHasError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const renderRatingStars = (rating) => {
    const value = Math.max(0, Math.min(5, Math.round((Number(rating) || 0) * 2) / 2));
    const fullStars = Math.floor(value);
    const hasHalfStar = value % 1 === 0.5;
    return [
      ...Array.from({ length: fullStars }, (_, index) => (
        <Star key={`full-${index}`} className="h-5 w-5 text-amber-400" />
      )),
      ...(hasHalfStar
        ? [
            <StarHalf
              key="half"
              className="h-5 w-5 text-amber-400"
            />,
          ]
        : []),
    ];
  };

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
        {loading ? (
          <div className="text-center text-gray-500 py-16">
            Loading testimonials...
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center text-gray-500 py-16">
            {hasError
              ? "Unable to load testimonials right now. Please try again later."
              : "No testimonials available yet."}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-8 rounded-2xl shadow-md relative"
              >
                <Quote className="h-8 w-8 text-emerald-200 absolute top-4 right-4" />
                <div className="flex text-amber-400 mb-4">
                  {renderRatingStars(testimonial.rating)}
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
        )}
      </div>
    </div>
  );
}

export default TestimonialsPage;
