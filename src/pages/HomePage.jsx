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
import { initializeStorage, readStorage } from "../utils/storage";
import {
  defaultEvents,
  defaultGuidelines,
  defaultTestimonials,
} from "../data/defaultData";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:1337/api";
const PRODUCTS_API = `${API_BASE_URL}/products`;

function HomePage() {
  const [isContactOpen, setContactOpen] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const normalizeImage = (image) => {
      if (!image) return "";
      if (typeof image === "string") return image;
      const url = image.url || image?.data?.attributes?.url || image?.data?.url;
      if (!url) return "";
      return url.startsWith("http") ? url : `${API_BASE_URL}${url}`;
    };

    const normalizeProduct = (product) => {
      const attrs = product.attributes || product;
      return {
        id: product.id || attrs.id,
        name: attrs.name || "",
        category: attrs.category || "",
        price: attrs.price || "",
        image: normalizeImage(attrs.product_image),
        description: attrs.description || "",
      };
    };

    const normalizeResponse = (data) => {
      if (!data) return [];
      const items = Array.isArray(data) ? data : data.data || [];
      return items.map(normalizeProduct);
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

    initializeStorage("events", defaultEvents);
    initializeStorage("guidelines", defaultGuidelines);
    initializeStorage("testimonials", defaultTestimonials);
  }, []);

  const events = readStorage("events", defaultEvents).slice(0, 2);
  const testimonials = readStorage("testimonials", defaultTestimonials).slice(
    0,
    3,
  );
  const guidelines = readStorage("guidelines", defaultGuidelines).slice(0, 4);

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
                Crop Guidelines
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
                Read Guidelines
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {guidelines.map((guideline) => (
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
