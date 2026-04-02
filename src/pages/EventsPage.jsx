import { useEffect, useState } from "react";
import { Calendar, MapPin, CalendarX } from "lucide-react";
import { buildApiUrl } from "../utils/api";

const EVENTS_API = buildApiUrl("events");

function EventsPage() {
  const [currentTab, setCurrentTab] = useState("upcoming");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrationData, setRegistrationData] = useState({
    fullName: "",
    phone: "",
    email: "",
    organization: "",
    notes: "",
  });
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const normalizeEvent = (item) => {
      const attrs = item.attributes || item;
      const dateValue =
        attrs.date || attrs.event_date || attrs.eventDate || attrs.Date || "";
      const parsedDate = new Date(dateValue);
      const isValidDate = !Number.isNaN(parsedDate.valueOf());
      const today = new Date();
      const normalizedStatus = isValidDate
        ? new Date(today.getFullYear(), today.getMonth(), today.getDate()) <=
          new Date(
            parsedDate.getFullYear(),
            parsedDate.getMonth(),
            parsedDate.getDate(),
          )
          ? "upcoming"
          : "past"
        : "upcoming";

      return {
        id: item.id || attrs.id,
        title: attrs.title || attrs.Title || attrs.name || attrs.Name || "",
        date: dateValue,
        location:
          attrs.location ||
          attrs.Location ||
          attrs.venue ||
          attrs.Venue ||
          attrs.address ||
          attrs.Address ||
          "",
        tag:
          attrs.tag ||
          attrs.Tag ||
          attrs.type ||
          attrs.Type ||
          attrs.category ||
          attrs.Category ||
          "",
        description:
          attrs.description ||
          attrs.Description ||
          attrs.details ||
          attrs.Details ||
          "",
        status: normalizedStatus === "past" ? "past" : "upcoming",
      };
    };

    const normalizeResponse = (data) => {
      if (!data) return [];
      const items = Array.isArray(data) ? data : data.data || [];
      return items.map(normalizeEvent);
    };

    fetch(`${EVENTS_API}?populate=*`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch events (${res.status})`);
        }
        return res.json();
      })
      .then((json) => setEvents(normalizeResponse(json)))
      .catch((error) => {
        console.error("Error fetching events:", error);
        setHasError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredEvents = events.filter((event) => event.status === currentTab);

  const openRegisterModal = (event) => {
    setSelectedEvent(event);
    setSubmitError("");
    setSubmitSuccess(false);
    setRegistrationData({
      fullName: "",
      phone: "",
      email: "",
      organization: "",
      notes: "",
    });
  };

  const closeRegisterModal = () => {
    setSelectedEvent(null);
    setSubmitError("");
    setSubmitSuccess(false);
  };

  const handleRegistrationChange = (event) => {
    const { name, value } = event.target;
    setRegistrationData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleRegistrationSubmit = (event) => {
    event.preventDefault();
    setSubmitError("");

    const { fullName, phone, email, organization } = registrationData;
    if (!fullName.trim() || !phone.trim() || !email.trim()) {
      setSubmitError("Name, phone and email are required.");
      return;
    }

    const subject = `Event registration: ${selectedEvent?.title || "Event"}`;
    const body = [
      `Event: ${selectedEvent?.title || "N/A"}`,
      `Date: ${selectedEvent?.date || "N/A"}`,
      `Location: ${selectedEvent?.location || "N/A"}`,
      "",
      `Name: ${fullName}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Organization: ${organization}`,
      "",
      `Notes: ${registrationData.notes}`,
    ].join("\n");

    const mailtoLink = `mailto:sales@tigeragrochem.co.zw?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
    setSubmitSuccess(true);
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
          {loading ? (
            <div className="text-center py-12 text-gray-500">
              Loading events...
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center h-16 w-16 bg-gray-100 rounded-full mx-auto mb-4">
                <CalendarX className="h-8 w-8 text-gray-300" />
              </div>
              <p className="text-gray-500 text-lg">
                {hasError
                  ? "Unable to load events. Please try again later."
                  : `No ${currentTab} events found.`}
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
                          {event.tag}
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
                          onClick={() => openRegisterModal(event)}
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

      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-3xl rounded-[32px] bg-white shadow-2xl overflow-hidden">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-emerald-700 font-semibold">
                  Register
                </p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {selectedEvent.title}
                </h2>
                <p className="text-sm text-slate-500 mt-2">
                  Fill your details below to register for this event.
                </p>
              </div>
              <button
                type="button"
                onClick={closeRegisterModal}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>
            <form
              onSubmit={handleRegistrationSubmit}
              className="space-y-6 px-6 py-8 sm:px-10"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">
                    Full name
                  </span>
                  <input
                    name="fullName"
                    value={registrationData.fullName}
                    onChange={handleRegistrationChange}
                    type="text"
                    placeholder="John Doe"
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">
                    Phone number
                  </span>
                  <input
                    name="phone"
                    value={registrationData.phone}
                    onChange={handleRegistrationChange}
                    type="tel"
                    placeholder="+263 77 123 4567"
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">
                    Email address
                  </span>
                  <input
                    name="email"
                    value={registrationData.email}
                    onChange={handleRegistrationChange}
                    type="email"
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">
                    Organization
                  </span>
                  <input
                    name="organization"
                    value={registrationData.organization}
                    onChange={handleRegistrationChange}
                    type="text"
                    placeholder="Farm name or company"
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  />
                </label>
              </div>
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">
                  Additional notes
                </span>
                <textarea
                  name="notes"
                  value={registrationData.notes}
                  onChange={handleRegistrationChange}
                  rows={4}
                  placeholder="Optional: any special requirements or questions"
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                />
              </label>
              {submitError && (
                <p className="text-sm text-red-600">{submitError}</p>
              )}
              {submitSuccess && (
                <p className="text-sm text-emerald-700">
                  Your registration is ready to send. Please complete the email
                  in your mail client.
                </p>
              )}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  Confirm registration
                </button>
                <button
                  type="button"
                  onClick={closeRegisterModal}
                  className="inline-flex justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventsPage;
