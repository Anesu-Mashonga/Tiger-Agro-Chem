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
  ChevronRight,
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
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Helper: format price
  const formatPrice = (value) => {
    if (value === null || value === undefined || value === "") return "";
    const parsed = Number(value);
    return Number.isNaN(parsed) ? "" : `$${parsed.toFixed(2)}`;
  };

  // Normalize image (supports Strapi v4/v5)
  const normalizeImage = (image) => {
    if (!image) return "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800";
    if (typeof image === "string") return image;
    let asset = Array.isArray(image) ? image[0] : image;
    if (asset?.data) asset = Array.isArray(asset.data) ? asset.data[0] : asset.data;
    const attrs = asset?.attributes || asset;
    const url =
      attrs?.url ||
      attrs?.data?.url ||
      attrs?.formats?.large?.url ||
      attrs?.formats?.medium?.url ||
      attrs?.formats?.small?.url ||
      attrs?.formats?.thumbnail?.url;
    if (!url) return "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800";
    if (url.startsWith("//")) return `https:${url}`;
    return url.startsWith("http") ? url : `${API_HOST}${url}`;
  };

  // Normalize product
  const normalizeProduct = (product) => {
    const attrs = product.attributes || product;
    return {
      id: product.id || attrs.id,
      name: attrs.Name || attrs.name || attrs.Title || attrs.title || "",
      category: attrs.category || attrs.Category || "",
      price: formatPrice(attrs.Price ?? attrs.price ?? ""),
      image: normalizeImage(attrs.product_image || attrs.image),
      description: attrs.Description || attrs.description || "",
      composition: attrs.Composition || attrs.composition || "",
      createdAt: attrs.createdAt || product.createdAt || "",
    };
  };

  // Normalize guideline
  const normalizeGuideline = (item) => {
    const attrs = item.attributes || item;
    return {
      id: item.id || attrs.id,
      title: attrs.title || attrs.Title || "",
      category: attrs.category || attrs.Category || "",
      image: normalizeMediaUrl(attrs.image || attrs.guideline_image || attrs.guidelineImage),
      excerpt: attrs.excerpt || attrs.Excerpt || attrs.description || attrs.Description || "",
      content: attrs.content || attrs.Content || attrs.description || attrs.Description || "",
      pdfUrl: normalizeMediaUrl(attrs.pdfUrl || attrs.pdf_url || attrs.pdf || attrs.pdf_document || attrs.pdfDocument),
    };
  };

  // Normalize event
  const normalizeEvent = (item) => {
    const attrs = item.attributes || item;
    const dateValue = attrs.date || attrs.event_date || attrs.eventDate || attrs.Date || "";
    const parsedDate = new Date(dateValue);
    const isValidDate = !Number.isNaN(parsedDate.valueOf());
    const today = new Date();
    const normalizedStatus = isValidDate
      ? new Date(today.getFullYear(), today.getMonth(), today.getDate()) <=
        new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate())
        ? "upcoming"
        : "past"
      : "upcoming";
    return {
      id: item.id || attrs.id,
      title: attrs.title || attrs.Title || attrs.name || attrs.Name || "",
      date: dateValue,
      location: attrs.location || attrs.Location || attrs.venue || attrs.Venue || attrs.address || attrs.Address || "",
      type: attrs.tag || attrs.Tag || attrs.type || attrs.Type || attrs.category || attrs.Category || "",
      description: attrs.description || attrs.Description || attrs.details || attrs.Details || "",
      status: normalizedStatus === "past" ? "past" : "upcoming",
    };
  };

  // Normalize testimonial
  const normalizeTestimonial = (item) => {
    const attrs = item.attributes || item;
    return {
      id: item.id || attrs.id,
      name: attrs.name || attrs.Name || attrs.title || attrs.fullName || "Anonymous",
      role: attrs.profession || attrs.Profession || attrs.role || attrs.Role || attrs.position || attrs.job || attrs.occupation || "",
      content: attrs.content || attrs.Content || attrs.testimonial || attrs.Testimonial || attrs.review || attrs.description || attrs.Description || "",
      rating: Math.max(0, Math.min(5, Math.round((Number(attrs.rating ?? attrs.Rating ?? 0) || 0) * 2) / 2)),
    };
  };

  useEffect(() => {
    // Fetch products (limit 4 for homepage)
    fetch(`${PRODUCTS_API}?populate=product_image&pagination[limit]=4`)
      .then((res) => res.json())
      .then((json) => {
        const items = Array.isArray(json) ? json : json.data || [];
        setProducts(items.map(normalizeProduct));
      })
      .catch((err) => console.error("Error fetching products:", err));

    // Fetch guidelines
    fetch(`${GUIDELINES_API}?populate=*`)
      .then((res) => res.json())
      .then((json) => {
        const items = Array.isArray(json) ? json : json.data || [];
        setGuidelines(items.map(normalizeGuideline));
      })
      .catch((err) => console.error("Error fetching guidelines:", err));

    // Fetch events
    fetch(`${EVENTS_API}?populate=*`)
      .then((res) => res.json())
      .then((json) => {
        const items = Array.isArray(json) ? json : json.data || [];
        const upcomingEvents = items
          .map(normalizeEvent)
          .filter((event) => event.status === "upcoming")
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 2);
        setEvents(upcomingEvents);
      })
      .catch((err) => console.error("Error fetching events:", err));

    // Fetch testimonials
    fetch(`${TESTIMONIALS_API}?populate=*`)
      .then((res) => res.json())
      .then((json) => {
        const items = Array.isArray(json) ? json : json.data || [];
        setTestimonials(items.map(normalizeTestimonial).slice(0, 3));
      })
      .catch((err) => console.error("Error fetching testimonials:", err))
      .finally(() => setTestimonialsLoading(false));
  }, []);

  const homeGuidelines = guidelines.slice(0, 4);
  const showProductDetail = (product) => setSelectedProduct(product);
  const closeProductModal = () => setSelectedProduct(null);

  const handleContactSubmit = (event) => {
    event.preventDefault();
    alert("Thank you for your message! We will get back to you soon.");
    setContactOpen(false);
    event.target.reset();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ========== NEW HERO SECTION (with background image) ========== */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80"
            className="w-full h-full object-cover"
            alt="Farming background"
          />
          <div className="absolute inset-0 bg-emerald-900/60" />
        </div>
        <div className="container mx-auto px-4 z-10 text-white">
          <div className="max-w-3xl">
            <div className="inline-block bg-amber-400 text-emerald-900 px-4 py-1 rounded-full text-sm font-bold mb-6">
              Leading Agricultural Supplier
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              We Grow Well <br />
              <span className="text-amber-400">Together</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-emerald-50 max-w-xl">
              Premium agrochemicals and biostimulators, expert guidance. With quality and cost-effective Crop Protection Scheme for modern farming.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="bg-emerald-600 hover:bg-emerald-700 px-8 py-4 rounded-full font-bold transition flex items-center gap-2 shadow-lg">
                Explore Products <ArrowRight size={20} />
              </Link>
              <Link to="/guidelines" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 px-8 py-4 rounded-full font-bold transition">
                View Guidelines
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== NEW SERVICE CARDS (modern look) ========== */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Our Expertise</h2>
            <div className="w-20 h-1.5 bg-emerald-500 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-800">Crop Protection</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">Cost effective pesticides.</p>
              <Link to="/products" className="text-emerald-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                Learn More <ChevronRight size={18} />
              </Link>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Sprout size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-800">Biostimulators</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Balanced Content of essential micro nutrients necessary for the plant growth and yield maximization
              </p>
              <Link to="/products" className="text-emerald-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                Learn More <ChevronRight size={18} />
              </Link>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <FlaskConical size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-800">Expert Advice</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Good agronomic practice from local and international seasoned agronomists
              </p>
              <Link to="/guidelines" className="text-emerald-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                Learn More <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== LATEST PRODUCTS (modern grid, 4 items) ========== */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Latest Products</h2>
              <p className="text-slate-500 mt-2">Discover our newest agricultural inputs designed to maximize your farm productivity.</p>
            </div>
            <Link to="/products" className="text-emerald-600 font-bold flex items-center gap-2">
              View All Products <ArrowRight size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => showProductDetail(product)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-all"
              >
                <div className="aspect-square overflow-hidden relative bg-gray-100">
                  <img
                    src={product.image}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    alt={product.name}
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-emerald-700">
                    {product.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-slate-800 text-lg mb-2">{product.name}</h3>
                  <p className="text-slate-500 text-sm line-clamp-2 mb-4">{product.composition}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-emerald-700">{product.price}</span>
                    <button className="py-2 px-4 bg-slate-50 text-slate-700 font-bold rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CROP PROTECTION SCHEME (original section, modernized) ========== */}
      <section className="py-20 bg-emerald-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="uppercase text-amber-200 font-semibold mb-4">Crop Protection Scheme</p>
              <h2 className="text-4xl font-bold mb-4">Cost effective pest control program for a healthy crop</h2>
              <p className="text-lg text-emerald-100 mb-8">
                Explore best practices for planting, fertilization, and pest control from our agronomy team.
              </p>
              <Link to="/guidelines" className="bg-white text-emerald-700 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition shadow-lg inline-block">
                Read Crop Protection Scheme
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {homeGuidelines.map((guideline) => (
                <div key={guideline.id} className="bg-white rounded-3xl overflow-hidden shadow-xl">
                  <img src={guideline.image} alt={guideline.title} className="w-full h-32 object-cover" />
                  <div className="p-4">
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">{guideline.category}</span>
                    <h3 className="mt-2 text-lg font-semibold text-gray-800">{guideline.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== EVENTS & TRAINING (original, modern styling) ========== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Events & Training</h2>
              <p className="text-lg text-slate-600">Join us for workshops, field days and training sessions to learn more.</p>
            </div>
            <Link to="/events" className="hidden md:inline-flex items-center text-emerald-600 font-bold hover:text-emerald-700">
              View all events <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {events.map((event) => {
              const eventDate = new Date(event.date);
              return (
                <div key={event.id} className="flex bg-slate-50 rounded-xl p-6 hover:shadow-md transition border border-slate-100">
                  <div className="bg-emerald-600 text-white rounded-lg p-4 text-center min-w-[80px] mr-6">
                    <span className="block text-2xl font-bold">{eventDate.getDate()}</span>
                    <span className="block text-sm uppercase">{eventDate.toLocaleString("default", { month: "short" })}</span>
                  </div>
                  <div>
                    <span className="text-amber-600 text-sm font-semibold">{event.type}</span>
                    <h3 className="text-xl font-bold text-slate-800 mt-1 mb-2">{event.title}</h3>
                    <div className="flex items-center text-slate-600 text-sm">
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

      {/* ========== TESTIMONIALS (original with stars, modernized) ========== */}
      <section className="py-20 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-slate-600">Feedback from farmers who are using Avgust products, services and Crop Protection Scheme.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-8 rounded-2xl shadow-md relative">
                <Quote className="h-8 w-8 text-emerald-200 absolute top-4 right-4" />
                <div className="flex text-amber-400 mb-4">
                  {Array.from({ length: Math.floor(testimonial.rating) }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                  {testimonial.rating % 1 !== 0 && <Star className="h-5 w-5 fill-current text-amber-400" />}
                </div>
                <p className="text-slate-600 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <span className="text-emerald-700 font-bold text-lg">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{testimonial.name}</h4>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/testimonials" className="inline-block border-2 border-emerald-600 text-emerald-600 px-8 py-3 rounded-full font-bold hover:bg-emerald-600 hover:text-white transition">
              Read more testimonials
            </Link>
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION (original, modern) ========== */}
      <section className="py-20 bg-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Improve Your Yield?</h2>
          <p className="text-xl text-emerald-100 mb-8">Contact our team today for personalized recommendations and bulk pricing.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button type="button" onClick={() => setContactOpen(true)} className="bg-white text-emerald-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg">
              Contact Us
            </button>
            <Link to="/products" className="bg-amber-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-600 transition shadow-lg flex items-center justify-center">
              Shop Products
            </Link>
          </div>
        </div>
      </section>

      {/* ========== CONTACT MODAL (original) ========== */}
      {isContactOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
            <button type="button" onClick={() => setContactOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h3>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <input type="text" name="name" placeholder="Full name" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500" />
              <input type="email" name="email" placeholder="Email address" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500" />
              <textarea name="message" placeholder="How can we help?" required rows="4" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500" />
              <div className="flex justify-end">
                <button type="submit" className="bg-emerald-600 text-white px-6 py-3 rounded-full font-bold hover:bg-emerald-700 transition">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========== PRODUCT MODAL (with WhatsApp inquiry) ========== */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm" role="dialog" aria-modal="true" onClick={closeProductModal}>
          <div className="w-full max-w-5xl overflow-hidden rounded-[32px] border border-emerald-100 bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative bg-emerald-700/10 px-6 py-5 sm:px-8 sm:py-6">
              <button type="button" onClick={closeProductModal} className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-700" aria-label="Close">
                ✕
              </button>
              <div className="grid gap-6 lg:grid-cols-[1.25fr_0.85fr]">
                <div className="overflow-hidden rounded-[28px] bg-slate-100">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="h-80 w-full object-contain" />
                </div>
                <div className="space-y-4 px-0 py-2 sm:px-2 sm:py-0">
                  <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
                    {selectedProduct.category}
                  </span>
                  <h2 className="text-3xl font-bold text-slate-900">{selectedProduct.name}</h2>
                  <p className="text-slate-600 leading-relaxed">{selectedProduct.description}</p>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-emerald-700">{selectedProduct.price}</span>
                  </div>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <a
                      href={`https://wa.me/263773416214?text=Hi, I am interested in ${selectedProduct.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                    >
                      Inquire via WhatsApp
                    </a>
                    <button type="button" onClick={closeProductModal} className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700">
                      Close
                    </button>
                  </div>
                  <p className="text-sm text-slate-500">Contact us for bulk orders and pricing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;