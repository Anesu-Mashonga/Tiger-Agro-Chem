import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  ShieldCheck,
  Sprout,
  FlaskConical,
  MapPin,
  Quote,
  Star,
  X,
} from "lucide-react";
import { API_HOST, buildApiUrl, normalizeMediaUrl } from "../utils/api";

const PRODUCTS_API = buildApiUrl("products");
const GUIDELINES_API = buildApiUrl("guidelines");
const TESTIMONIALS_API = buildApiUrl("testimonials");
const EVENTS_API = buildApiUrl("events");

function HomePage() {
  const [isContactOpen, setContactOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [guidelines, setGuidelines] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const formatPrice = (value) => {
      if (value === null || value === undefined || value === "") return "";
      const parsed = Number(value);
      return Number.isNaN(parsed) ? "" : `$${parsed.toFixed(2)}`;
    };

    const normalizeImage = (image) => {
      if (!image) return "";
      if (typeof image === "string") return image;

      let asset = Array.isArray(image) ? image[0] : image;
      if (asset?.data) {
        asset = Array.isArray(asset.data) ? asset.data[0] : asset.data;
      }
      const attrs = asset?.attributes || asset;
      const url =
        attrs?.url ||
        attrs?.data?.url ||
        attrs?.formats?.large?.url ||
        attrs?.formats?.medium?.url ||
        attrs?.formats?.small?.url ||
        attrs?.formats?.thumbnail?.url;
      if (!url) return "";
      if (url.startsWith("//")) return `https:${url}`;
      return url.startsWith("http") ? url : `${API_HOST}${url}`;
    };

    const normalizeProduct = (product) => {
      const attrs = product.attributes || product;
      return {
        id: product.id || attrs.id,
        name: attrs.Name || attrs.name || attrs.Title || attrs.title || "",
        category: attrs.category || attrs.Category || "",
        price: formatPrice(attrs.Price ?? attrs.price ?? ""),
        image: normalizeImage(attrs.product_image),
        description: attrs.Description || attrs.description || "",
        createdAt: attrs.createdAt || product.createdAt || "",
      };
    };

    const normalizeResponse = (data) => {
      if (!data) return [];
      const items = Array.isArray(data) ? data : data.data || [];
      return items
        .map(normalizeProduct)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    };

    const normalizeGuideline = (item) => {
      const attrs = item.attributes || item;
      const normalizeImage = (image) => {
        if (!image) return "";
        if (typeof image === "string") return image;

        let asset = Array.isArray(image) ? image[0] : image;
        if (asset?.data) {
          asset = Array.isArray(asset.data) ? asset.data[0] : asset.data;
        }
        const imgAttrs = asset?.attributes || asset;
        const url =
          imgAttrs?.url ||
          imgAttrs?.data?.url ||
          imgAttrs?.formats?.large?.url ||
          imgAttrs?.formats?.medium?.url ||
          imgAttrs?.formats?.small?.url ||
          imgAttrs?.formats?.thumbnail?.url;
        if (!url) return "";
        if (url.startsWith("//")) return `https:${url}`;
        return url.startsWith("http") ? url : `${API_HOST}${url}`;
      };

      return {
        id: item.id || attrs.id,
        title: attrs.title || attrs.Title || "",
        category: attrs.category || attrs.Category || "",
        image: normalizeMediaUrl(
          attrs.image || attrs.guideline_image || attrs.guidelineImage,
        ),
        excerpt:
          attrs.excerpt ||
          attrs.Excerpt ||
          attrs.description ||
          attrs.Description ||
          "",
        content:
          attrs.content ||
          attrs.Content ||
          attrs.description ||
          attrs.Description ||
          "",
        pdfUrl: normalizeMediaUrl(
          attrs.pdfUrl ||
            attrs.pdf_url ||
            attrs.pdf ||
            attrs.pdf_document ||
            attrs.pdfDocument,
        ),
      };
    };

    const normalizeGuidelinesResponse = (data) => {
      if (!data) return [];
      const items = Array.isArray(data) ? data : data.data || [];
      return items.map(normalizeGuideline);
    };

    fetch(`${PRODUCTS_API}?populate=product_image`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch products (${res.status})`);
        }
        return res.json();
      })
      .then((json) => setProducts(normalizeResponse(json).slice(0, 3)))
      .catch((error) => {
        console.error("Error fetching home products:", error);
        setProducts([]);
      });

    fetch(`${GUIDELINES_API}?populate=*`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch guidelines (${res.status})`);
        }
        return res.json();
      })
      .then((json) => setGuidelines(normalizeGuidelinesResponse(json)))
      .catch((error) => {
        console.error("Error fetching home guidelines:", error);
        setGuidelines([]);
      });

    const normalizeEvent = (item) => {
      const attrs = item.attributes || item;
      const dateValue =
        attrs.date || attrs.event_date || attrs.eventDate || attrs.Date || "";
      const parsedDate = new Date(dateValue);
      const isValidDate = !Number.isNaN(parsedDate.valueOf());
      const today = new Date();
      const normalizedStatus = isValidDate
        ? new Date(today.getFullYear(), today.getMonth(), today.getDate()) <=
          new Date(
            parsedDate.getFullYear(),
            parsedDate.getMonth(),
            parsedDate.getDate(),
          )
          ? "upcoming"
          : "past"
        : "upcoming";

      return {
        id: item.id || attrs.id,
        title: attrs.title || attrs.Title || attrs.name || attrs.Name || "",
        date: dateValue,
        location:
          attrs.location ||
          attrs.Location ||
          attrs.venue ||
          attrs.Venue ||
          attrs.address ||
          attrs.Address ||
          "",
        type:
          attrs.tag ||
          attrs.Tag ||
          attrs.type ||
          attrs.Type ||
          attrs.category ||
          attrs.Category ||
          "",
        description:
          attrs.description ||
          attrs.Description ||
          attrs.details ||
          attrs.Details ||
          "",
        status: normalizedStatus === "past" ? "past" : "upcoming",
      };
    };

    const normalizeEventsResponse = (data) => {
      if (!data) return [];
      const items = Array.isArray(data) ? data : data.data || [];
      return items.map(normalizeEvent);
    };

    fetch(`${EVENTS_API}?populate=*`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch events (${res.status})`);
        }
        return res.json();
      })
      .then((json) => {
        const normalized = normalizeEventsResponse(json);
        const upcomingEvents = normalized
          .filter((event) => event.status === "upcoming")
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 2);
        setEvents(upcomingEvents);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setEvents([]);
      });

    const normalizeTestimonial = (item) => {
      const attrs = item.attributes || item;
      return {
        id: item.id || attrs.id,
        name:
          attrs.name ||
          attrs.Name ||
          attrs.title ||
          attrs.fullName ||
          "Anonymous",
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
            Math.round((Number(attrs.rating ?? attrs.Rating ?? 0) || 0) * 2) /
              2,
          ),
        ),
      };
    };

    const normalizeTestimonialsResponse = (data) => {
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
        const normalized = normalizeTestimonialsResponse(json);
        setTestimonials(normalized.slice(0, 3));
      })
      .catch((error) => {
        console.error("Error fetching testimonials:", error);
      })
      .finally(() => {
        setTestimonialsLoading(false);
      });
  }, []);

  const homeGuidelines = guidelines.slice(0, 4);

  const handleContactSubmit = (event) => {
    event.preventDefault();
    alert("Thank you for your message! We will get back to you soon.");
    setContactOpen(false);
    event.target.reset();
  };

  return (
    <div>
      <section className="hero-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-amber-400 text-emerald-900 px-4 py-1 rounded-full text-sm font-bold mb-6">
                Leading Agricultural Supplier
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                Growing Success <br />
                <span className="text-amber-300">Together</span>
              </h1>
              <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
                Premium agrochemicals, fertilizers, and crop protection
                solutions for modern farming. Empowering Zimbabwean farmers with
                quality products and expert guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="bg-amber-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-600 transition shadow-lg text-center"
                >
                  Explore Products
                </Link>
                <Link
                  to="/guidelines"
                  className="bg-white text-emerald-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg text-center"
                >
                  View Guidelines
                </Link>
              </div>
            </div>
            <div className="hidden md:block relative">
              <img
                src="http://static.photos/agriculture/640x360/123"
                alt="Farming"
                className="rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition duration-500"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="bg-emerald-100 p-3 rounded-full">
                    <Award className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">15+</p>
                    <p className="text-sm text-gray-600">Years Experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-2xl bg-emerald-50 card-hover">
              <div className="bg-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sprout className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Quality Seeds
              </h3>
              <p className="text-gray-600">
                Certified high-yield seeds for maximum productivity
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-amber-50 card-hover">
              <div className="bg-amber-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Crop Protection
              </h3>
              <p className="text-gray-600">
                Effective pesticides and herbicides for healthy crops
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-emerald-50 card-hover">
              <div className="bg-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FlaskConical className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Fertilizers
              </h3>
              <p className="text-gray-600">
                Balanced nutrition for healthier, higher-yield crops
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-amber-50 card-hover">
              <div className="bg-amber-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Expert Advice
              </h3>
              <p className="text-gray-600">
                Practical farming guidance from experienced agronomists
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Latest Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our newest agricultural inputs designed to maximize your
              farm productivity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover border border-gray-100"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {product.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="text-2xl font-bold text-emerald-700">
                      {product.price}
                    </span>
                    <Link
                      to="/products"
                      className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition text-sm"
                    >
                      View Product
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center text-emerald-600 font-bold text-lg hover:text-emerald-700"
            >
              View all products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="uppercase text-amber-200 font-semibold mb-4">
                Crop protection Scheme
              </p>
              <h2 className="text-4xl font-bold mb-4">
                Trusted advice for stronger yields
              </h2>
              <p className="text-lg text-emerald-100 mb-8">
                Explore best practices for planting, fertilization, and pest
                control from our agronomy team.
              </p>
              <Link
                to="/guidelines"
                className="bg-white text-emerald-700 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition shadow-lg"
              >
                Read Crop protection Scheme
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {homeGuidelines.map((guideline) => (
                <div
                  key={guideline.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-xl"
                >
                  <img
                    src={guideline.image}
                    alt={guideline.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">
                      {guideline.category}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold text-gray-800">
                      {guideline.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">
                Events & Training
              </h2>
              <p className="text-lg text-gray-600">
                Join us for workshops, field days, and training sessions
                designed to improve your farming practices.
              </p>
            </div>
            <Link
              to="/events"
              className="hidden md:inline-flex items-center text-emerald-600 font-bold hover:text-emerald-700"
            >
              View all events
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {events.map((event) => {
              const eventDate = new Date(event.date);
              return (
                <div
                  key={event.id}
                  className="flex bg-gray-50 rounded-xl p-6 hover:shadow-md transition border border-gray-100"
                >
                  <div className="bg-emerald-600 text-white rounded-lg p-4 text-center min-w-[80px] mr-6">
                    <span className="block text-2xl font-bold">
                      {eventDate.getDate()}
                    </span>
                    <span className="block text-sm uppercase">
                      {eventDate.toLocaleString("default", { month: "short" })}
                    </span>
                  </div>
                  <div>
                    <span className="text-amber-600 text-sm font-semibold">
                      {event.type}
                    </span>
                    <h3 className="text-xl font-bold text-gray-800 mt-1 mb-2">
                      {event.title}
                    </h3>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      {event.location}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Real feedback from farmers who trust Tiger Agrochem for products,
              training, and crop support.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-8 rounded-2xl shadow-md relative"
              >
                <Quote className="h-8 w-8 text-emerald-200 absolute top-4 right-4" />
                <div className="flex text-amber-400 mb-4">
                  {Array.from({ length: testimonial.rating }).map(
                    (_, index) => (
                      <Star key={index} className="h-5 w-5" />
                    ),
                  )}
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
          <div className="text-center mt-12">
            <Link
              to="/testimonials"
              className="inline-block border-2 border-emerald-600 text-emerald-600 px-8 py-3 rounded-full font-bold hover:bg-emerald-600 hover:text-white transition"
            >
              Read more testimonials
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-emerald-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Improve Your Yield?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Contact our team today for personalized recommendations and bulk
            pricing.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="bg-white text-emerald-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg"
            >
              Contact Us
            </button>
            <Link
              to="/products"
              className="bg-amber-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-600 transition shadow-lg flex items-center justify-center"
            >
              Shop Products
            </Link>
          </div>
        </div>
      </section>

      {isContactOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
            <button
              type="button"
              onClick={() => setContactOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Contact Us
            </h3>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
              />
              <textarea
                name="message"
                placeholder="How can we help?"
                required
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-emerald-600 text-white px-6 py-3 rounded-full font-bold hover:bg-emerald-700 transition"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
