import { useEffect, useState } from "react";
import { Quote, Star, StarHalf } from "lucide-react";
import { buildApiUrl } from "../utils/api";

const TESTIMONIALS_API = buildApiUrl("testimonial");
const TESTIMONIALS_API_FALLBACK = buildApiUrl("testimonials");

function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const normalizeTestimonial = (item) => {
      const acf = item.acf || {};
      return {
        id: item.id,
        name:
          acf.name ||
          acf.Name ||
          acf.title ||
          acf.fullName ||
          item.title?.rendered ||
          "Anonymous",
        role:
          acf.profession ||
          acf.Profession ||
          acf.role ||
          acf.Role ||
          acf.position ||
          acf.job ||
          acf.occupation ||
          "",
        content:
          acf.content ||
          acf.Content ||
          acf.testimonial ||
          acf.Testimonial ||
          acf.review ||
          acf.description ||
          acf.Description ||
          item.content?.rendered ||
          "",
        rating: Math.max(
          0,
          Math.min(
            5,
            Math.round((Number(acf.rating ?? acf.Rating ?? 0) || 0) * 2) / 2,
          ),
        ),
      };
    };

    const normalizeResponse = (data) => {
      if (!data) return [];
      const items = Array.isArray(data) ? data : [];
      return items.map(normalizeTestimonial);
    };

    const fetchTestimonials = async () => {
      const endpoints = [TESTIMONIALS_API, TESTIMONIALS_API_FALLBACK];

      let lastError = null;
      for (const endpoint of endpoints) {
        try {
          const res = await fetch(`${endpoint}?_embed&per_page=100`);
          if (!res.ok) {
            throw new Error(`Failed to fetch testimonials (${res.status})`);
          }

          const json = await res.json();
          const normalized = normalizeResponse(json);
          setTestimonials(normalized);
          return;
        } catch (error) {
          lastError = error;
        }
      }

      console.error("Error fetching testimonials:", lastError);
      setHasError(true);
    };

    fetchTestimonials().finally(() => {
      setLoading(false);
    });
  }, []);

  const renderRatingStars = (rating) => {
    const value = Math.max(
      0,
      Math.min(5, Math.round((Number(rating) || 0) * 2) / 2),
    );
    const fullStars = Math.floor(value);
    const hasHalfStar = value % 1 === 0.5;
    return [
      ...Array.from({ length: fullStars }, (_, index) => (
        <Star key={`full-${index}`} className="h-5 w-5 text-amber-400" />
      )),
      ...(hasHalfStar
        ? [<StarHalf key="half" className="h-5 w-5 text-amber-400" />]
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
            Feedback from farmers who are using Avgust products, services and
            Crop Protection Scheme.
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
