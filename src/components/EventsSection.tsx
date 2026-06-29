import { useState } from "react";
import { Calendar, MapPin, Clock, Ticket, CheckCircle2 } from "lucide-react";
import { EVENTS } from "../data/musicData";

export default function EventsSection() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  const filteredEvents = EVENTS.filter((event) => event.status === activeTab);

  const formatEventDate = (dateStr: string) => {
    const eventDate = new Date(dateStr);
    const day = eventDate.getDate() + 1; // standard timezone correction
    const month = eventDate.toLocaleString("default", { month: "short" });
    const weekday = eventDate.toLocaleString("default", { weekday: "short" });
    return { day, month, weekday };
  };

  return (
    <section id="events" className="py-24 bg-sedona-dark relative overflow-hidden">
      {/* Visual desert gradient glowing orb */}
      <div className="absolute right-1/4 bottom-1/4 w-96 h-96 bg-sedona-clay/10 rounded-full filter blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-sedona-orange">
            Live Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-sedona-sand mt-3 mb-6">
            Performances & Tour Dates
          </h2>
          <div className="w-16 h-0.5 bg-sedona-red mx-auto"></div>
        </div>

        {/* Tab Filters */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-sedona-charcoal/60 rounded-lg border border-sedona-clay/20 backdrop-blur-sm" id="event-tabs">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-6 py-2.5 rounded-md font-mono text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                activeTab === "upcoming"
                  ? "bg-sedona-red text-sedona-sand shadow-md"
                  : "text-sedona-sand/60 hover:text-sedona-sand"
              }`}
              id="tab-upcoming-events"
            >
              Upcoming Shows
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`px-6 py-2.5 rounded-md font-mono text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                activeTab === "past"
                  ? "bg-sedona-red text-sedona-sand shadow-md"
                  : "text-sedona-sand/60 hover:text-sedona-sand"
              }`}
              id="tab-past-events"
            >
              Past Shows
            </button>
          </div>
        </div>

        {/* Performances List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="events-grid">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => {
              const { day, month, weekday } = formatEventDate(event.date);
              
              return (
                <div
                  key={event.id}
                  className={`p-6 rounded-2xl border transition-all flex flex-col justify-between group ${
                    event.isSoldOut
                      ? "bg-sedona-charcoal/20 border-sedona-clay/10 opacity-70"
                      : "bg-sedona-charcoal/50 hover:bg-sedona-charcoal border-sedona-clay/20 hover:border-sedona-orange/40 hover:shadow-xl hover:shadow-black/20"
                  }`}
                  id={`event-card-${event.id}`}
                >
                  <div className="flex items-start space-x-6">
                    {/* Artistic Sedona Red-Rock Calendar Block */}
                    <div className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-20 bg-gradient-to-br from-sedona-clay to-sedona-red rounded-xl text-sedona-sand shadow-md border border-sedona-orange/25 group-hover:scale-105 transition-transform duration-300">
                      <span className="font-mono text-[10px] uppercase tracking-widest opacity-80">
                        {month}
                      </span>
                      <span className="font-serif text-2xl font-bold mt-0.5">
                        {day}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-wider opacity-75 mt-1">
                        {weekday}
                      </span>
                    </div>

                    {/* Performance details */}
                    <div className="min-w-0">
                      <h3 className="font-serif text-lg sm:text-xl text-sedona-sand group-hover:text-sedona-orange transition-colors duration-300 leading-snug">
                        {event.venue}
                      </h3>
                      
                      <div className="flex flex-col space-y-2 mt-3">
                        <span className="text-xs text-sedona-copper flex items-center">
                          <MapPin className="w-3.5 h-3.5 mr-2 text-sedona-orange/85 flex-shrink-0" />
                          {event.city}, {event.state}
                        </span>
                        <span className="text-xs text-sedona-copper/80 flex items-center">
                          <Clock className="w-3.5 h-3.5 mr-2 text-sedona-orange/85 flex-shrink-0" />
                          {event.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions / Booking Section */}
                  <div className="mt-6 pt-4 border-t border-sedona-clay/10 flex items-center justify-between">
                    {activeTab === "upcoming" ? (
                      event.isSoldOut ? (
                        <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-sedona-dark border border-sedona-clay/20 text-sedona-copper/60 rounded font-mono text-[10px] uppercase tracking-wider">
                          <span>Sold Out</span>
                        </div>
                      ) : (
                        <a
                          href={event.ticketsUrl}
                          className="flex items-center space-x-2 px-4 py-2 bg-sedona-red hover:bg-sedona-orange text-sedona-sand text-xs font-mono uppercase tracking-widest rounded transition-all duration-300 border border-sedona-orange/20 shadow"
                          id={`btn-ticket-${event.id}`}
                        >
                          <Ticket className="w-3.5 h-3.5" />
                          <span>Get Details</span>
                        </a>
                      )
                    ) : (
                      <div className="flex items-center space-x-1 text-sedona-orange/80 font-mono text-[10px] uppercase tracking-wider">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Completed</span>
                      </div>
                    )}

                    <span className="text-[10px] font-mono text-sedona-copper/40">
                      ID: {event.id.toUpperCase()}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-2 text-center py-12 border border-dashed border-sedona-clay/20 rounded-2xl bg-sedona-charcoal/20">
              <Calendar className="w-8 h-8 text-sedona-copper/40 mx-auto mb-3" />
              <p className="font-serif text-sm text-sedona-sand/60">
                No performances scheduled for this period. Check back soon!
              </p>
            </div>
          )}
        </div>

        {/* Private bookings note */}
        <div className="mt-16 text-center max-w-xl mx-auto p-6 bg-sedona-charcoal/40 border border-sedona-clay/20 rounded-2xl backdrop-blur-sm" id="booking-cta-block">
          <h4 className="font-serif text-lg text-sedona-sand mb-2">
            Host Luke Harvey At Your Event
          </h4>
          <p className="text-xs text-sedona-sand/75 leading-relaxed mb-4">
            Luke is available for private performances, weddings, resort wine hours, corporate retreats, and Southwest festival bookings. Get in touch to craft a custom set list!
          </p>
          <a
            href="#contact"
            className="inline-block px-6 py-2.5 bg-transparent hover:bg-sedona-clay/20 text-sedona-orange font-mono text-xs uppercase tracking-widest rounded border border-sedona-orange/30 hover:border-sedona-orange transition-all duration-300"
            id="btn-book-private"
          >
            Inquire About Bookings
          </a>
        </div>

      </div>
    </section>
  );
}
