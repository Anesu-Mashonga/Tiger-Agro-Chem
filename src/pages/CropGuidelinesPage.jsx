import { useEffect, useState } from "react";
import {
  LayoutGrid,
  Sprout,
  Bug,
  FlaskConical,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { buildApiUrl } from "../utils/api";

const categories = ["all", "Planting", "Pest Control", "Fertilization"];
const GUIDELINES_API = buildApiUrl("scheme");

function CropGuidelinesPage() {
  const [currentFilter, setCurrentFilter] = useState("all");
  const [guidelines, setGuidelines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGuideline, setSelectedGuideline] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const normalizeImage = (item) => {
      const media = item?._embedded?.["wp:featuredmedia"]?.[0];
      if (media?.source_url) return media.source_url;
      const acfImage = item?.acf?.image || item?.acf?.guideline_image;
      if (typeof acfImage === "string" && acfImage) return acfImage;
      if (acfImage?.url) return acfImage.url;
      if (acfImage?.sizes?.large) return acfImage.sizes.large;
      if (acfImage?.sizes?.medium) return acfImage.sizes.medium;
      return "";
    };

    const normalizeGuideline = (item) => {
      const acf = item.acf || {};
      const pdfField = acf.pdf_url || acf.pdfUrl || acf.pdf || acf.pdf_document;
      return {
        id: item.id,
        title: acf.title || acf.Title || item.title?.rendered || "",
        category: acf.category || acf.Category || "",
        image: normalizeImage(item),
        excerpt:
          acf.excerpt ||
          acf.Excerpt ||
          acf.description ||
          acf.Description ||
          item.excerpt?.rendered ||
          "",
        content:
          acf.content ||
          acf.Content ||
          acf.description ||
          acf.Description ||
          item.content?.rendered ||
          "",
        pdfUrl: typeof pdfField === "string" ? pdfField : pdfField?.url || "",
      };
    };

    const normalizeGuidelinesResponse = (data) => {
      if (!data) return [];
      const items = Array.isArray(data) ? data : [];
      return items.map(normalizeGuideline);
    };

    fetch(`${GUIDELINES_API}?_embed&per_page=100`)
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

  const getCategoryDisplayName = (category) => {
    return category === "all" ? "All" : category;
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Crop Protection Scheme
          </h1>
          <p className="text-xl text-emerald-100 max-w-2xl">
            Cost effective pest control program for a healthy crop. Explore best
            practices for planting, fertilization, and pest control from our
            agronomy team.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Desktop Category Filters */}
        <div className="hidden md:grid md:grid-cols-4 gap-4 mb-8">
          {categories.map((category) => {
            const Icon = iconMap[category];
            return (
              <button
                type="button"
                key={category}
                onClick={() => setCurrentFilter(category)}
                aria-pressed={currentFilter === category}
                className={`p-4 rounded-xl text-center cursor-pointer transition-all duration-200 ${
                  currentFilter === category
                    ? "bg-emerald-50 border border-emerald-300 shadow-lg shadow-emerald-200/80 scale-[1.01]"
                    : "bg-white border border-transparent hover:border-emerald-200 hover:bg-emerald-50"
                }`}
              >
                <Icon className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                <h3
                  className={`font-bold text-sm ${
                    currentFilter === category
                      ? "text-emerald-800"
                      : "text-gray-800"
                  }`}
                >
                  {category === "all" ? "All" : category}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Search and Mobile Filter Row */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {/* Search Input */}
          <div className="flex-1">
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

          {/* Mobile Category Dropdown */}
          <div className="relative md:hidden">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full sm:w-48 flex items-center justify-between px-4 py-3 bg-white border border-slate-300 rounded-full text-sm text-slate-700 shadow-sm hover:border-emerald-300 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition"
            >
              <span className="flex items-center gap-2">
                {(() => {
                  const Icon = iconMap[currentFilter];
                  return <Icon className="h-4 w-4 text-emerald-600" />;
                })()}
                <span>{getCategoryDisplayName(currentFilter)}</span>
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
                <div className="absolute right-0 mt-2 w-full sm:w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-50">
                  {categories.map((category) => {
                    const Icon = iconMap[category];
                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => {
                          setCurrentFilter(category);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition ${
                          currentFilter === category
                            ? "bg-emerald-50 text-emerald-700 font-medium"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <Icon className="h-4 w-4 text-emerald-600" />
                        <span>{category === "all" ? "All" : category}</span>
                        {currentFilter === category && (
                          <span className="ml-auto text-emerald-600">✓</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Guidelines Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuidelines.map((guideline) => (
            <div
              key={guideline.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden guideline-card"
            >
              <img
                src={guideline.image}
                alt={guideline.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">
                  {guideline.category}
                </span>
                <h3 className="text-lg font-bold text-gray-800 mt-2 mb-2">
                  {guideline.title}
                </h3>
                <p className="text-gray-600 mb-3 text-sm line-clamp-2">
                  {guideline.excerpt}
                </p>
                <button
                  type="button"
                  onClick={() => showGuidelineDetail(guideline)}
                  className="text-emerald-600 font-bold hover:text-emerald-700 flex items-center text-sm"
                >
                  Read More <ArrowRight className="ml-1 h-3 w-3" />
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

      {/* Guideline Modal */}
      {selectedGuideline && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={closeGuidelineModal}
        >
          <div
            className="w-full max-w-4xl overflow-hidden rounded-[24px] border border-emerald-100 bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative bg-emerald-700/10 px-4 py-4 sm:px-6 sm:py-6">
              <button
                type="button"
                onClick={closeGuidelineModal}
                className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-700"
                aria-label="Close details"
              >
                ✕
              </button>
              <div className="grid gap-4 lg:grid-cols-[1.25fr_0.85fr]">
                <div className="overflow-hidden rounded-[24px] bg-slate-100">
                  <img
                    src={selectedGuideline.image}
                    alt={selectedGuideline.title}
                    className="h-64 w-full object-cover"
                  />
                </div>
                <div className="space-y-3 px-0 py-1 sm:px-2 sm:py-0">
                  <span className="inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
                    {selectedGuideline.category}
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {selectedGuideline.title}
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {selectedGuideline.content}
                  </p>
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
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
                      className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700"
                    >
                      Close
                    </button>
                  </div>
                  <p className="text-xs text-slate-500">
                    Download PDF to read full article.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .guideline-card {
          transition: all 0.3s ease;
        }
        .guideline-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
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

export default CropGuidelinesPage;
