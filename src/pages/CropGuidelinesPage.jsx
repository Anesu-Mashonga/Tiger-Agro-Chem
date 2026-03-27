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
    alert(
      `${guideline.title}\n\n${guideline.content}\n\nFor more detailed information, please contact our agronomy team.`,
    );
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Crop Guidelines
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
                  {category === "all" ? "All Guidelines" : category}
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
    </div>
  );
}

export default CropGuidelinesPage;
