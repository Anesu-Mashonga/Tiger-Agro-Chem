import { useEffect, useState } from "react";
import {
  LayoutGrid,
  Sprout,
  Bug,
  FlaskConical,
  ArrowRight,
} from "lucide-react";
import { initializeStorage, readStorage } from "../utils/storage";
import { defaultGuidelines } from "../data/defaultData";

const categories = ["all", "Planting", "Pest Control", "Fertilization"];

function CropGuidelinesPage() {
  const [currentFilter, setCurrentFilter] = useState("all");
  const [guidelines, setGuidelines] = useState([]);
  const [selectedGuideline, setSelectedGuideline] = useState(null);

  useEffect(() => {
    initializeStorage("guidelines", defaultGuidelines);
    setGuidelines(readStorage("guidelines", defaultGuidelines));
  }, []);

  const filteredGuidelines =
    currentFilter === "all"
      ? guidelines
      : guidelines.filter((guideline) => guideline.category === currentFilter);

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
