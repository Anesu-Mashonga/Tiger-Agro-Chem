import { useEffect, useState } from "react";
import { Calendar, MapPin, CalendarX } from "lucide-react";
import { initializeStorage, readStorage } from "../utils/storage";
import { defaultEvents } from "../data/defaultData";

function EventsPage() {
  const [currentTab, setCurrentTab] = useState("upcoming");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    initializeStorage("events", defaultEvents);
    setEvents(readStorage("events", defaultEvents));
  }, []);

  const filteredEvents = events.filter((event) => event.status === currentTab);

  const registerEvent = (title) => {
    alert(
      `You have registered for ${title}. Our team will contact you with the next steps.`,
    );
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Events & Training
          </h1>
          <p className="text-xl text-amber-100 max-w-2xl">
            Join us for workshops, field days, and training sessions designed to
            improve your farming practices.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex space-x-4 mb-8 border-b border-gray-200">
          <button
            type="button"
            onClick={() => setCurrentTab("upcoming")}
            className={`px-6 py-3 font-semibold ${
              currentTab === "upcoming"
                ? "text-emerald-600 border-b-2 border-emerald-600"
                : "text-gray-500 hover:text-emerald-600"
            }`}
          >
            Upcoming Events
          </button>
          <button
            type="button"
            onClick={() => setCurrentTab("past")}
            className={`px-6 py-3 font-semibold ${
              currentTab === "past"
                ? "text-emerald-600 border-b-2 border-emerald-600"
                : "text-gray-500 hover:text-emerald-600"
            }`}
          >
            Past Events
          </button>
        </div>

        <div className="space-y-6">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center h-16 w-16 bg-gray-100 rounded-full mx-auto mb-4">
                <CalendarX className="h-8 w-8 text-gray-300" />
              </div>
              <p className="text-gray-500 text-lg">
                No {currentTab} events found.
              </p>
            </div>
          ) : (
            filteredEvents.map((event) => {
              const eventDate = new Date(event.date);
              const isUpcoming = event.status === "upcoming";

              return (
                <div
                  key={event.id}
                  className={`bg-white rounded-2xl shadow-lg p-6 md:p-8 event-card border-l-4 ${
                    isUpcoming ? "border-emerald-500" : "border-gray-400"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            isUpcoming
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {event.type}
                        </span>
                        <span className="text-gray-500 text-sm flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {eventDate.toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{event.description}</p>
                      <div className="flex items-center text-gray-500">
                        <MapPin className="h-5 w-5 mr-2" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 min-w-[150px]">
                      {isUpcoming ? (
                        <button
                          type="button"
                          onClick={() => registerEvent(event.title)}
                          className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-emerald-700 transition text-center"
                        >
                          Register
                        </button>
                      ) : (
                        <span className="bg-gray-100 text-gray-600 px-6 py-3 rounded-lg font-bold text-center">
                          Completed
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default EventsPage;
