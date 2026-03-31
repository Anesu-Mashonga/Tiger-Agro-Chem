import { useEffect, useState } from "react";
import {
  LayoutGrid,
  Sprout,
  Bug,
  FlaskConical,
  ArrowRight,
} from "lucide-react";
import { API_HOST, buildApiUrl } from "../utils/api";

const categories = ["all", "Planting", "Pest Control", "Fertilization"];
const GUIDELINES_API = buildApiUrl("guidelines");

function CropGuidelinesPage() {
  const [currentFilter, setCurrentFilter] = useState("all");
  const [guidelines, setGuidelines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGuideline, setSelectedGuideline] = useState(null);

  useEffect(() => {
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

    const normalizeGuideline = (item) => {
      const attrs = item.attributes || item;
      return {
        id: item.id || attrs.id,
        title: attrs.title || attrs.Title || "",
        category: attrs.category || attrs.Category || "",
        image: normalizeImage(attrs.image),
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
        pdfUrl: attrs.pdfUrl || attrs.pdf_url || attrs.pdf || "",
      };
    };

    const normalizeGuidelinesResponse = (data) => {
      if (!data) return [];
      const items = Array.isArray(data) ? data : data.data || [];
      return items.map(normalizeGuideline);
    };

    fetch(`${GUIDELINES_API}?populate=*`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch guidelines (${res.status})`);
        }
        return res.json();
      })
      .then((json) => setGuidelines(normalizeGuidelinesResponse(json)))
      .catch((error) => {
        console.error("Error fetching crop guidelines:", error);
        setGuidelines([]);
      });
  }, []);

  const filteredGuidelines = guidelines.filter((guideline) => {
    const matchesCategory =
      currentFilter === "all" || guideline.category === currentFilter;
    const matchesSearch = guideline.title
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const iconMap = {
    all: LayoutGrid,
    Planting: Sprout,
    "Pest Control": Bug,
    Fertilization: FlaskConical,
  };

  const showGuidelineDetail = (guideline) => {
    setSelectedGuideline(guideline);
  };

  const closeGuidelineModal = () => setSelectedGuideline(null);

  return (
    <div>
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Crop protection Scheme
          </h1>
          <p className="text-xl text-emerald-100 max-w-2xl">
            Expert agricultural advice and best practices for successful
            farming.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {categories.map((category) => {
            const Icon = iconMap[category];
            return (
              <button
                type="button"
                key={category}
                onClick={() => setCurrentFilter(category)}
                className={`bg-white p-6 rounded-xl shadow-md text-center cursor-pointer transition ${
                  currentFilter === category
                    ? "bg-emerald-50"
                    : "hover:bg-emerald-50"
                }`}
              >
                <Icon className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-800">
                  {category === "all" ? "All Schemes" : category}
                </h3>
              </button>
            );
          })}
        </div>

        <div className="mb-8">
          <label htmlFor="guideline-search" className="sr-only">
            Search schemes
          </label>
          <input
            id="guideline-search"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search schemes by name..."
            className="w-full rounded-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGuidelines.map((guideline) => (
            <div
              key={guideline.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden guideline-card"
            >
              <img
                src={guideline.image}
                alt={guideline.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">
                  {guideline.category}
                </span>
                <h3 className="text-xl font-bold text-gray-800 mt-2 mb-3">
                  {guideline.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {guideline.excerpt}
                </p>
                <button
                  type="button"
                  onClick={() => showGuidelineDetail(guideline)}
                  className="text-emerald-600 font-bold hover:text-emerald-700 flex items-center"
                >
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        {filteredGuidelines.length === 0 && (
          <div className="mt-8 text-center text-slate-500">
            No schemes match your search.
          </div>
        )}
      </div>

      {selectedGuideline && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={closeGuidelineModal}
        >
          <div
            className="w-full max-w-5xl overflow-hidden rounded-[32px] border border-emerald-100 bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative bg-emerald-700/10 px-6 py-5 sm:px-8 sm:py-6">
              <button
                type="button"
                onClick={closeGuidelineModal}
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-700"
                aria-label="Close details"
              >
                ✕
              </button>
              <div className="grid gap-6 lg:grid-cols-[1.25fr_0.85fr]">
                <div className="overflow-hidden rounded-[28px] bg-slate-100">
                  <img
                    src={selectedGuideline.image}
                    alt={selectedGuideline.title}
                    className="h-80 w-full object-cover"
                  />
                </div>
                <div className="space-y-4 px-0 py-2 sm:px-2 sm:py-0">
                  <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
                    {selectedGuideline.category}
                  </span>
                  <h2 className="text-3xl font-bold text-slate-900">
                    {selectedGuideline.title}
                  </h2>
                  <p className="text-slate-600 leading-relaxed">
                    {selectedGuideline.content}
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                      onClick={(event) => {
                        event.preventDefault();
                        if (selectedGuideline.pdfUrl) {
                          window.open(selectedGuideline.pdfUrl, "_blank");
                        }
                      }}
                    >
                      Download PDF
                    </button>
                    <button
                      type="button"
                      onClick={closeGuidelineModal}
                      className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700"
                    >
                      Close
                    </button>
                  </div>
                  <p className="text-sm text-slate-500">
                    Download PDF to read full article.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CropGuidelinesPage;
