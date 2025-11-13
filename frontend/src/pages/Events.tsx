import { useState, useEffect } from "react";
import { Search, Calendar, SearchX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/EventCard";
import { BottomNav } from "@/components/BottomNav";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

const filters = ["All", "Technical", "Cultural", "Sports"];

const Events = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch("http://localhost:5000/api/events")
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
      event.department?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const userRole = localStorage.getItem("tce_user_role");

  return (
    <div className="flex flex-col min-h-screen bg-background page-transition">
      <Navbar />
      <div className="flex-1 pb-20 lg:pb-0">
        {/* Header with consistent theme */}
        <header className="bg-white border-b border-border p-4 lg:p-6 sticky top-0 z-10 animate-fade-in shadow-md">
          <div className="max-w-5xl mx-auto space-y-3">
          <h1 className="text-xl font-bold text-foreground flex items-center gap-2 animate-slide-up opacity-0" style={{ animationFillMode: 'forwards' }}>
            <Calendar className="h-6 w-6 text-primary" />
            <span className="text-primary">TCE</span> Events
          </h1>

          {/* Search Bar with animation */}
          <div className="relative animate-slide-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events or clubs"
              className="pl-10 bg-background border-border focus:border-primary transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Chips with hover effects */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide animate-slide-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            {filters.map((filter) => (
              <Button
                key={filter}
                size="sm"
                variant="outline"
                className={cn(
                  "rounded-full whitespace-nowrap transition-all duration-300 hover:shadow-lg",
                  selectedFilter === filter
                    ? "border-2 !border-primary text-primary font-bold !bg-white hover:!bg-white hover:!text-primary hover:scale-105"
                    : "bg-white border border-border text-foreground hover:bg-primary/10 hover:text-primary hover:scale-105"
                )}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>
          </div>
        </header>

        {/* Events List with staggered animations */}
        <div className="max-w-5xl mx-auto px-4 lg:px-6 py-6">
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg">Loading events...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">
              <p className="text-lg">{error}</p>
            </div>
          ) : filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEvents.map((event, index) => (
                <div 
                  key={event.id || event._id || index} 
                  className="animate-slide-up opacity-0"
                  style={{ 
                    animationDelay: `${index * 0.08}s`,
                    animationFillMode: 'forwards'
                  }}
                >
                  <EventCard {...event} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground animate-fade-in">
              <SearchX className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-lg">No events found</p>
              <p className="text-sm mt-2">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {/* Event creation form for organizers */}
        {userRole === "organizer" && (
          <Card className="p-6 mb-6 max-w-5xl mx-auto">
            <h2 className="text-lg font-bold mb-4">Create Event</h2>
            <EventForm onCreated={() => window.location.reload()} />
          </Card>
        )}

        <BottomNav />
      </div>
      <Footer />
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
      const response = await fetch("http://localhost:5000/api/events", {
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
      <Input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
      <Input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      <Input placeholder="Venue" value={venue} onChange={e => setVenue(e.target.value)} required />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Creating..." : "Create Event"}
      </Button>
    </form>
  );
}

export default Events;
