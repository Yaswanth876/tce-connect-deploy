import { useState, useEffect } from "react";
import { Search, Calendar, SearchX, X, Sparkles, PlusCircle, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/EventCard";
import { BottomNav } from "@/components/BottomNav";
import { Navbar } from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import API_BASE_URL from "@/config/api";

const filters = ["All", "Technical", "Cultural", "Sports"];

const Events = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`${API_BASE_URL}/events`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // Format dates for display and map _id to id
        const formattedEvents = data.map((event: any) => ({
          ...event,
          id: event._id, // Map MongoDB _id to id for EventCard
          date: event.date ? new Date(event.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }) : 'TBA'
        }));
        setEvents(formattedEvents);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please check if the backend is running.");
        setLoading(false);
      });
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesFilter =
      selectedFilter === "All" ||
      event.type?.toLowerCase() === selectedFilter.toLowerCase();
    const matchesSearch =
      event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const userRole = localStorage.getItem("tce_user_role");

  // Summary counts for filter chips
  const getFilterCount = (cat: string) => {
    if (cat === "All") return events.length;
    return events.filter(e => e.type?.toLowerCase() === cat.toLowerCase()).length;
  };

  return (
    <div className="flex flex-col min-h-screen bg-background page-transition">
      <Navbar />

      <main className="flex-1 pb-24 lg:pb-12">
        {/* Sticky Control Bar & Hero */}
        <header className="bg-card/95 backdrop-blur-md border-b border-border sticky top-0 z-20 shadow-sm transition-all">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 space-y-4">
            {/* Title & Metadata Row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <span><span className="text-primary font-extrabold">TCE</span> Events</span>
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  Discover workshops, hackathons, and cultural fests across campus
                </p>
              </div>

              {!loading && !error && (
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground self-start sm:self-auto bg-muted/60 px-2.5 py-1 rounded-full border border-border/60">
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                  <span>
                    Showing <strong className="text-foreground">{filteredEvents.length}</strong> of {events.length} events
                  </span>
                </div>
              )}
            </div>

            {/* Search Input & Filter Group */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title, department, or venue..."
                  className="pl-10 pr-9 h-10 bg-background/80 border-border hover:border-primary/40 focus:border-primary transition-colors text-sm rounded-xl"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5 rounded-full hover:bg-muted"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide shrink-0">
                {filters.map((filter) => {
                  const isSelected = selectedFilter === filter;
                  const count = !loading ? getFilterCount(filter) : null;
                  return (
                    <button
                      key={filter}
                      onClick={() => setSelectedFilter(filter)}
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 border-2",
                        isSelected
                          ? "bg-primary text-primary-foreground border-primary shadow-sm"
                          : "bg-white text-foreground/80 border-border hover:border-primary hover:text-primary"
                      )}
                    >
                      <span>{filter}</span>
                      {count !== null && count > 0 && (
                        <span
                          className={cn(
                            "px-1.5 py-0.2 rounded-full text-[10px] font-bold leading-tight",
                            isSelected
                              ? "bg-primary-foreground/20 text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
          {/* Loading Skeleton State */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <Card key={n} className="p-5 space-y-4 rounded-2xl animate-pulse border-border/60 bg-card">
                  <div className="h-2 w-full bg-muted/80 rounded" />
                  <div className="flex justify-between items-center">
                    <div className="h-5 w-20 bg-muted rounded-full" />
                    <div className="h-4 w-16 bg-muted/60 rounded" />
                  </div>
                  <div className="h-6 w-3/4 bg-muted/80 rounded" />
                  <div className="space-y-2 pt-2">
                    <div className="h-4 w-1/2 bg-muted/50 rounded" />
                    <div className="h-4 w-2/3 bg-muted/50 rounded" />
                  </div>
                  <div className="pt-4 border-t border-border/60 flex justify-between items-center">
                    <div className="h-4 w-20 bg-muted/40 rounded" />
                    <div className="h-8 w-20 bg-muted rounded-lg" />
                  </div>
                </Card>
              ))}
            </div>
          ) : error ? (
            /* Error State */
            <div className="max-w-md mx-auto my-12 text-center p-8 bg-destructive/5 border border-destructive/20 rounded-2xl">
              <SearchX className="h-12 w-12 mx-auto mb-3 text-destructive/80" />
              <h3 className="text-base font-semibold text-destructive">Unable to Load Events</h3>
              <p className="text-xs text-muted-foreground mt-1.5">{error}</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 border-destructive/30 text-destructive hover:bg-destructive/10"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          ) : filteredEvents.length > 0 ? (
            /* Events Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredEvents.map((event, index) => (
                <div
                  key={event.id || event._id || index}
                  className="animate-slide-up opacity-0"
                  style={{
                    animationDelay: `${Math.min(index * 0.05, 0.4)}s`,
                    animationFillMode: 'forwards'
                  }}
                >
                  <EventCard {...event} />
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="max-w-md mx-auto my-16 text-center p-8 bg-card border border-border/80 rounded-2xl shadow-sm">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-primary/10 flex items-center justify-center">
                <SearchX className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground">No events found</h3>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                {searchQuery
                  ? `No events matching "${searchQuery}". Try a different keyword or category.`
                  : `No ${selectedFilter.toLowerCase()} events scheduled right now. Check back soon!`}
              </p>
              {(searchQuery || selectedFilter !== "All") && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 text-xs font-semibold rounded-xl border-border hover:bg-muted"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedFilter("All");
                  }}
                >
                  Reset Filters
                </Button>
              )}
            </div>
          )}

          {/* Organizer Create Event Section */}
          {userRole === "organizer" && (
            <Card className="p-6 border border-border/90 rounded-2xl shadow-sm bg-card">
              <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-border/70">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <PlusCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">Create New Event</h2>
                  <p className="text-xs text-muted-foreground">Publish a new college event for students</p>
                </div>
              </div>
              <EventForm onCreated={() => window.location.reload()} />
            </Card>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

function EventForm({ onCreated }: { onCreated: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("tce_token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, description, date, venue })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Event creation failed");
      setIsLoading(false);
      setTitle(""); setDescription(""); setDate(""); setVenue("");
      onCreated();
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">Event Title</label>
          <Input
            placeholder="e.g. AI Hackathon 2026"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className="rounded-xl"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">Date</label>
          <Input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
            className="rounded-xl"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-foreground">Venue</label>
        <Input
          placeholder="e.g. Mech Seminar Hall / CSE Lab 3"
          value={venue}
          onChange={e => setVenue(e.target.value)}
          required
          className="rounded-xl"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-foreground">Description</label>
        <Input
          placeholder="Brief details about schedule, eligibility, and perks"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
          className="rounded-xl"
        />
      </div>

      {error && (
        <div className="p-3 text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-xl">
          {error}
        </div>
      )}

      <Button type="submit" disabled={isLoading} className="rounded-xl font-semibold px-6">
        {isLoading ? "Creating..." : "Publish Event"}
      </Button>
    </form>
  );
}

export default Events;
