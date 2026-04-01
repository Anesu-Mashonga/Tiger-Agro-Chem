import { useEffect, useState } from "react";
import { LayoutGrid, Building2, Factory, Users, Heart, UserCheck } from "lucide-react";
import { API_HOST, buildApiUrl, normalizeMediaUrl } from "../utils/api";

const categories = ["all", "CSR", "Factory", "Field Days", "Sponsorship", "Staff"];
const GALLERIES_API = buildApiUrl("galleries");

function GalleryPage() {
  const [currentFilter, setCurrentFilter] = useState("all");
  const [galleries, setGalleries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGallery, setSelectedGallery] = useState(null);

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
    CSR: Heart,
    Factory: Factory,
    "Field Days": Users,
    Sponsorship: Building2,
    Staff: UserCheck,
  };

  const showGalleryDetail = (gallery) => {
    setSelectedGallery(gallery);
  };

  const closeGalleryModal = () => setSelectedGallery(null);

  return (
    <div>
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Gallery
          </h1>
          <p className="text-xl text-emerald-100 max-w-2xl">
            Explore moments from our CSR initiatives, factory operations, field days, sponsorships, and team.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
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

        <div className="mb-8">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <span className="text-xs font-bold uppercase tracking-wide bg-emerald-600 px-2 py-1 rounded">
                      {gallery.category}
                    </span>
                    <p className="mt-2 text-sm line-clamp-2">{gallery.description}</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">
                  {gallery.category}
                </span>
                <p className="text-gray-600 mt-2 text-sm line-clamp-2">
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

      {selectedGallery && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={closeGalleryModal}
        >
          <div
            className="w-full max-w-4xl overflow-hidden rounded-[32px] border border-emerald-100 bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative">
              <button
                type="button"
                onClick={closeGalleryModal}
                className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-700"
                aria-label="Close details"
              >
                ✕
              </button>
              <div className="overflow-hidden bg-slate-100">
                <img
                  src={selectedGallery.media}
                  alt={selectedGallery.description || "Gallery image"}
                  className="w-full max-h-[70vh] object-contain"
                />
              </div>
              <div className="p-6 space-y-4">
                <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
                  {selectedGallery.category}
                </span>
                <p className="text-slate-700 leading-relaxed text-lg">
                  {selectedGallery.description || "No description available"}
                </p>
                <button
                  type="button"
                  onClick={closeGalleryModal}
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700"
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
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default GalleryPage;