import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Users, Award, TrendingUp, MapPin } from "lucide-react";
import { toast } from "sonner";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("tce_user_email");
  const token = localStorage.getItem("tce_token");
  
  const [registeredEvents, setRegisteredEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch registered events
  useEffect(() => {
    if (!token) return;

    setLoading(true);
    fetch("http://localhost:5000/api/users/me/events", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch events");
        return res.json();
      })
      .then((data) => {
        setRegisteredEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Failed to load events", {
          description: err.message || "Please try refreshing the page.",
        });
        setLoading(false);
      });
  }, [token]);

  // Calculate stats
  const upcomingEvents = registeredEvents.filter(
    (event) => new Date(event.date) >= new Date()
  );
  const attendedEvents = registeredEvents.filter(
    (event) => new Date(event.date) < new Date()
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="flex-1 pb-20 lg:pb-0">
        {/* Header */}
        <header className="bg-white border-b border-border p-4 lg:p-6 animate-fade-in shadow-md">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Award className="h-6 w-6 text-primary" />
              Student Dashboard
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Welcome back, {userEmail}
            </p>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="max-w-5xl mx-auto px-4 lg:px-6 py-6 space-y-6">
          {/* Loading State */}
          {loading && (
            <div className="text-center py-4">
              <p className="text-muted-foreground">Loading your dashboard...</p>
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{registeredEvents.length}</p>
                  <p className="text-sm text-muted-foreground">Registered Events</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{upcomingEvents.length}</p>
                  <p className="text-sm text-muted-foreground">Upcoming Events</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{attendedEvents.length}</p>
                  <p className="text-sm text-muted-foreground">Events Attended</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={() => navigate("/events")}
                className="h-auto py-4 justify-start"
                variant="outline"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Browse Events
              </Button>
              <Button
                onClick={() => navigate("/community")}
                className="h-auto py-4 justify-start"
                variant="outline"
              >
                <Users className="h-5 w-5 mr-2" />
                Explore Clubs
              </Button>
            </div>
          </Card>

          {/* Upcoming Events */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">My Upcoming Events</h2>
            
            {upcomingEvents.length === 0 ? (
              <>
                <p className="text-muted-foreground">
                  You haven't registered for any upcoming events yet.
                </p>
                <Button
                  onClick={() => navigate("/events")}
                  className="mt-4"
                  variant="default"
                >
                  Explore Events
                </Button>
              </>
            ) : (
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event._id}
                    className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => navigate(`/events/${event._id}`)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {event.description}
                        </p>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(event.date).toLocaleDateString('en-US', {
                              weekday: 'short',
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </div>
                          {event.venue && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {event.venue}
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {event.participants?.length || 0} registered
                          </div>
                        </div>
                      </div>
                      <div className="ml-4">
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                          Registered
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Past Events */}
          {attendedEvents.length > 0 && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Past Events</h2>
              <div className="space-y-4">
                {attendedEvents.slice(0, 3).map((event) => (
                  <div
                    key={event._id}
                    className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow cursor-pointer opacity-75"
                    onClick={() => navigate(`/events/${event._id}`)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{event.title}</h3>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          {event.venue && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {event.venue}
                            </div>
                          )}
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                        Attended
                      </span>
                    </div>
                  </div>
                ))}
                {attendedEvents.length > 3 && (
                  <Button
                    variant="outline"
                    onClick={() => navigate("/profile")}
                    className="w-full"
                  >
                    View All Past Events ({attendedEvents.length})
                  </Button>
                )}
              </div>
            </Card>
          )}
        </div>

        <BottomNav />
      </div>
      <Footer />
    </div>
  );
}
