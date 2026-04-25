import { useEffect, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { buildApiUrl } from "../utils/api";

const PRODUCTS_API = buildApiUrl("product");

const categories = [
  "all",
  "Fungicides",
  "Insecticides",
  "Herbicides",
  "Nematicides",
  "Acaricides",
  "Plant growth regulators",
  "Biostimulators",
];

function ProductsPage() {
  const [currentCategory, setCurrentCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const normalizeImage = (product) => {
      // WordPress: featured media via _embed
      const media = product?._embedded?.["wp:featuredmedia"]?.[0];
      if (media?.source_url) return media.source_url;
      // ACF image field (return type: Array, URL, or ID)
      const acfImage = product?.acf?.product_image;
      if (typeof acfImage === "string" && acfImage) return acfImage;
      if (acfImage?.url) return acfImage.url;
      if (acfImage?.sizes?.large) return acfImage.sizes.large;
      if (acfImage?.sizes?.medium) return acfImage.sizes.medium;
      if (acfImage?.sizes?.thumbnail) return acfImage.sizes.thumbnail;
      return "";
    };

    const normalizeProduct = (product) => {
      const acf = product.acf || {};
      return {
        id: product.id,
        name: acf.name || acf.Name || product.title?.rendered || "",
        category: acf.category || acf.Category || "",
        image: normalizeImage(product),
        description:
          acf.description || acf.Description || product.content?.rendered || "",
        composition: acf.composition || acf.Composition || "",
      };
    };

    fetch(`${PRODUCTS_API}?_embed&per_page=100`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch products (${res.status})`);
        }
        return res.json();
      })
      .then((data) => {
        const items = Array.isArray(data) ? data : [];
        setProducts(items.map(normalizeProduct));
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts([]);
      });
  }, []);

  const filteredProducts = products
    .filter((product) => {
      if (currentCategory === "all") return true;
      return (
        product.category?.toString().trim().toLowerCase() ===
        currentCategory.toLowerCase()
      );
    })
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  const showProductDetail = (product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => setSelectedProduct(null);

  const getCategoryDisplayName = (category) => {
    return category === "all" ? "All" : category;
  };

  return (
    <div>
      <div className="bg-emerald-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-xl text-emerald-100 max-w-2xl">
            Agrochemicals and Biostimulators formulated to maximize your yield.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Desktop Category Filters */}
        <div className="hidden md:flex flex-wrap gap-2 mb-6">
          {categories.map((category) => {
            const isActive = currentCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setCurrentCategory(category)}
                className={`filter-btn px-3 py-1.5 rounded-full font-medium text-sm transition ${
                  isActive
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-gray-600 border border-gray-300 hover:bg-emerald-50"
                }`}
              >
                {category === "all" ? "All" : category}
              </button>
            );
          })}
        </div>

        {/* Search and Mobile Filter Row */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="flex-1">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition"
              />
            </div>
          </div>

          <div className="relative md:hidden">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full sm:w-56 flex items-center justify-between px-4 py-3 bg-white border border-slate-300 rounded-full text-sm text-slate-700 shadow-sm hover:border-emerald-300 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition"
            >
              <span className="flex items-center gap-2">
                <span className="text-emerald-600 font-medium">
                  {getCategoryDisplayName(currentCategory)}
                </span>
              </span>
              <ChevronDown
                className={`h-4 w-4 text-slate-500 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-full sm:w-64 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-50 max-h-80 overflow-y-auto">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => {
                        setCurrentCategory(category);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition ${
                        currentCategory === category
                          ? "bg-emerald-50 text-emerald-700 font-medium"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span>{category === "all" ? "All" : category}</span>
                      {currentCategory === category && (
                        <span className="text-emerald-600">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <div className="inline-flex items-center justify-center h-12 w-12 bg-gray-100 rounded-full mx-auto mb-3">
                <span className="text-xl">📦</span>
              </div>
              <p className="text-gray-500 text-base">
                No products found matching your criteria.
              </p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover border border-gray-100 flex flex-col"
              >
                <div className="relative bg-gray-100">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-32 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className="w-full h-32 items-center justify-center text-gray-300 text-5xl"
                    style={{ display: product.image ? "none" : "flex" }}
                  >
                    📦
                  </div>
                  <span className="absolute top-2 right-2 bg-emerald-600 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                    {product.category}
                  </span>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-base font-bold text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-xs mb-3 flex-1 line-clamp-2 whitespace-pre-line">
                    {product.composition}
                  </p>
                  <div className="flex justify-end items-center pt-2 border-t border-gray-100 mt-auto">
                    <button
                      type="button"
                      onClick={() => showProductDetail(product)}
                      className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg font-semibold text-sm hover:bg-emerald-700 transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={closeProductModal}
        >
          <div
            className="w-full max-w-4xl overflow-hidden rounded-[24px] border border-emerald-100 bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative bg-emerald-700/10 px-4 py-4 sm:px-6 sm:py-6">
              <button
                type="button"
                onClick={closeProductModal}
                className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-700"
                aria-label="Close details"
              >
                ✕
              </button>
              <div className="grid gap-4 lg:grid-cols-[1.25fr_0.85fr]">
                <div className="overflow-hidden rounded-[24px] bg-slate-100">
                  {selectedProduct.image ? (
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="h-64 w-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className="h-64 w-full items-center justify-center text-gray-300 text-7xl"
                    style={{ display: selectedProduct.image ? "none" : "flex" }}
                  >
                    📦
                  </div>
                </div>
                <div className="space-y-3 px-0 py-1 sm:px-2 sm:py-0">
                  <span className="inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
                    {selectedProduct.category}
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {selectedProduct.description}
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <a
                      href={`https://wa.me/263710938772?text=Hi, I am interested in ${selectedProduct.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                    >
                      Inquire via WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={closeProductModal}
                      className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700"
                    >
                      Close
                    </button>
                  </div>
                  <p className="text-xs text-slate-500">
                    Contact us for bulk orders and pricing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .filter-btn {
          cursor: pointer;
          user-select: none;
        }
        .filter-btn:focus {
          outline: 2px solid #059669;
          outline-offset: 2px;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default ProductsPage;
