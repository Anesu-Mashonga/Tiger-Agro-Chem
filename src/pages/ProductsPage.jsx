import { useEffect, useState } from "react";
import { buildApiUrl } from "../utils/api";

const PRODUCTS_API = buildApiUrl("products");

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

  const formatPrice = (value) => {
    if (value === null || value === undefined || value === "") return "";
    const parsed = Number(value);
    return Number.isNaN(parsed) ? "" : `$${parsed.toFixed(2)}`;
  };

  useEffect(() => {
    const normalizeImage = (image) => {
      if (!image) return "";
      if (typeof image === "string") return image;
      const url =
        image.url ||
        image?.data?.attributes?.url ||
        image?.data?.url ||
        image?.data?.attributes?.formats?.large?.url ||
        image?.data?.attributes?.formats?.medium?.url ||
        image?.data?.attributes?.formats?.small?.url ||
        image?.data?.attributes?.formats?.thumbnail?.url;
      if (!url) return "";
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
      .then((json) => setProducts(normalizeResponse(json)))
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

  const handleInquire = (name) => {
    alert(
      `Thank you for your interest in ${name}. Please contact us at +263 123 456 789 or visit our store.`,
    );
  };

  return (
    <div>
      <div className="bg-emerald-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-xl text-emerald-100 max-w-2xl">
            Browse our comprehensive range of agricultural inputs designed to
            maximize your farm productivity.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map((category) => {
            const isActive = currentCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setCurrentCategory(category)}
                className={`filter-btn px-6 py-2 rounded-full font-medium transition ${
                  isActive
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-gray-600 border border-gray-300 hover:bg-emerald-50"
                }`}
              >
                {category === "all" ? "All Products" : category}
              </button>
            );
          })}
        </div>

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500"
              />
              <span className="absolute left-4 top-3.5 text-gray-400">🔍</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="inline-flex items-center justify-center h-16 w-16 bg-gray-100 rounded-full mx-auto mb-4">
                <span className="text-2xl">📦</span>
              </div>
              <p className="text-gray-500 text-lg">
                No products found matching your criteria.
              </p>
            </div>
          ) : (
            filteredProducts.map((product) => (
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
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="text-2xl font-bold text-emerald-700">
                      {product.price}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleInquire(product.name)}
                      className="bg-amber-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-amber-600 transition text-sm"
                    >
                      Inquire
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
