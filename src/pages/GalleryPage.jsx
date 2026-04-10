import { useEffect, useState } from "react";
import { LayoutGrid, Factory, Users, UserCheck, ChevronDown } from "lucide-react";
import { buildApiUrl, normalizeMediaUrl } from "../utils/api";

const categories = ["all", "Factory", "Field Days", "Staff"];
const GALLERIES_API = buildApiUrl("galleries");

function GalleryPage() {
  const [currentFilter, setCurrentFilter] = useState("all");
  const [galleries, setGalleries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const normalizeGallery = (item) => {
      const attrs = item.attributes || item;
      return {
        id: item.id || attrs.id,
        category: attrs.category || attrs.Category || "",
        description: attrs.description || attrs.Description || "",
        media: normalizeMediaUrl(
          attrs.gallery_media || attrs.media || attrs.image || attrs.picture
        ),
      };
    };

    const normalizeGalleriesResponse = (data) => {
      if (!data) return [];
      const items = Array.isArray(data) ? data : data.data || [];
      return items.map(normalizeGallery);
    };

    fetch(`${GALLERIES_API}?populate=*`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch galleries (${res.status})`);
        }
        return res.json();
      })
      .then((json) => setGalleries(normalizeGalleriesResponse(json)))
      .catch((error) => {
        console.error("Error fetching galleries:", error);
        setGalleries([]);
      });
  }, []);

  const filteredGalleries = galleries.filter((gallery) => {
    const matchesCategory =
      currentFilter === "all" || gallery.category === currentFilter;
    const matchesSearch = gallery.description
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const iconMap = {
    all: LayoutGrid,
    Factory: Factory,
    "Field Days": Users,
    Staff: UserCheck,
  };

  const showGalleryDetail = (gallery) => {
    setSelectedGallery(gallery);
  };

  const closeGalleryModal = () => setSelectedGallery(null);

  const getCategoryDisplayName = (category) => {
    return category === "all" ? "All" : category;
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Gallery
          </h1>
          <p className="text-xl text-emerald-100 max-w-2xl">
            Explore moments from our factory operations, field days, and team activities.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Desktop Category Filters */}
        <div className="hidden md:grid md:grid-cols-4 gap-2 mb-6">
          {categories.map((category) => {
            const Icon = iconMap[category];
            return (
              <button
                type="button"
                key={category}
                onClick={() => setCurrentFilter(category)}
                aria-pressed={currentFilter === category}
                className={`p-3 rounded-xl text-center cursor-pointer transition-all duration-200 ${
                  currentFilter === category
                    ? "bg-emerald-50 border border-emerald-300 shadow-lg shadow-emerald-200/80 scale-[1.01]"
                    : "bg-white border border-transparent hover:border-emerald-200 hover:bg-emerald-50"
                }`}
              >
                <Icon className="h-5 w-5 text-emerald-600 mx-auto mb-1" />
                <h3
                  className={`font-bold text-xs ${
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
            <label htmlFor="gallery-search" className="sr-only">
              Search galleries
            </label>
            <input
              id="gallery-search"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search galleries by description..."
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
              <ChevronDown className={`h-4 w-4 text-slate-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
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
                        <span>{getCategoryDisplayName(category)}</span>
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

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGalleries.map((gallery) => (
            <div
              key={gallery.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden gallery-card cursor-pointer"
              onClick={() => showGalleryDetail(gallery)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={gallery.media}
                  alt={gallery.description || "Gallery image"}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-3 text-white">
                    <span className="text-xs font-bold uppercase tracking-wide bg-emerald-600 px-1.5 py-0.5 rounded">
                      {gallery.category}
                    </span>
                    <p className="mt-1 text-xs line-clamp-2">{gallery.description}</p>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">
                  {gallery.category}
                </span>
                <p className="text-gray-600 mt-1 text-xs line-clamp-2">
                  {gallery.description || "No description available"}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredGalleries.length === 0 && (
          <div className="mt-8 text-center text-slate-500">
            No galleries match your search.
          </div>
        )}
      </div>

      {/* Gallery Modal */}
      {selectedGallery && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={closeGalleryModal}
        >
          <div
            className="w-full max-w-4xl overflow-hidden rounded-[24px] border border-emerald-100 bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative">
              <button
                type="button"
                onClick={closeGalleryModal}
                className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-700"
                aria-label="Close details"
              >
                ✕
              </button>
              <div className="overflow-hidden bg-slate-100">
                <img
                  src={selectedGallery.media}
                  alt={selectedGallery.description || "Gallery image"}
                  className="w-full max-h-[60vh] object-contain"
                />
              </div>
              <div className="p-4 space-y-3">
                <span className="inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
                  {selectedGallery.category}
                </span>
                <p className="text-slate-700 leading-relaxed text-sm">
                  {selectedGallery.description || "No description available"}
                </p>
                <button
                  type="button"
                  onClick={closeGalleryModal}
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .gallery-card {
          transition: all 0.3s ease;
        }
        .gallery-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
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

export default GalleryPage;