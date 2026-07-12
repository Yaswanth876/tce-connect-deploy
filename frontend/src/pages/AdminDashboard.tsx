import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  Calendar,
  Building2,
  TrendingUp,
  LogOut,
  CalendarClock,
  CalendarCheck,
  CalendarDays
} from 'lucide-react';
import { toast } from 'sonner';
import API_BASE_URL from '@/config/api';

interface Stats {
  totalUsers: number;
  totalEvents: number;
  activeClubs: number;
  todaysEventsCount: number;
}

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  type: string;
  organizer: {
    name: string;
    email: string;
  };
}

interface Organizer {
  _id: string;
  name: string;
  email: string;
  department: string;
}

interface AnalyticsData {
  stats: Stats;
  todaysEvents: Event[];
  pastEvents: Event[];
  upcomingEvents: Event[];
  organizers: Organizer[];
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminUser, setAdminUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const user = localStorage.getItem('admin_user');

    if (!token || !user) {
      toast.error('Please login to access admin dashboard');
      navigate('/admin/login');
      return;
    }

    setAdminUser(JSON.parse(user));
    fetchAnalytics(token);
  }, [navigate]);

  const fetchAnalytics = async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/analytics`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }

      const analyticsData = await response.json();
      setData(analyticsData);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load analytics');
      if (error.message.includes('401') || error.message.includes('403')) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return 'N/A';
    return timeString;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load dashboard data</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <div className="bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back, {adminUser?.name}</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2 hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Users
              </CardTitle>
              <Users className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{data.stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground mt-1">Registered users</p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-accent/50 transition-all hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Events
              </CardTitle>
              <Calendar className="h-5 w-5 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">{data.stats.totalEvents}</div>
              <p className="text-xs text-muted-foreground mt-1">All time events</p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Clubs
              </CardTitle>
              <Building2 className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{data.stats.activeClubs}</div>
              <p className="text-xs text-muted-foreground mt-1">Registered clubs</p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-accent/50 transition-all hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Today's Events
              </CardTitle>
              <TrendingUp className="h-5 w-5 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">{data.stats.todaysEventsCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Happening today</p>
            </CardContent>
          </Card>
        </div>

        {/* Events Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Today's Events */}
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CalendarClock className="h-5 w-5 text-accent" />
                <CardTitle className="text-primary">Today's Events</CardTitle>
              </div>
              <CardDescription>{data.todaysEvents.length} events</CardDescription>
            </CardHeader>
            <CardContent className="max-h-96 overflow-y-auto">
              {data.todaysEvents.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No events today</p>
              ) : (
                <div className="space-y-3">
                  {data.todaysEvents.map((event) => (
                    <div key={event._id} className="border-2 rounded-lg p-3 hover:bg-accent/10 hover:border-accent transition-all">
                      <h4 className="font-semibold text-sm">{event.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {event.time} • {event.venue}
                      </p>
                      <Badge variant="secondary" className="mt-2 text-xs bg-accent/20">
                        {event.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-primary" />
                <CardTitle className="text-primary">Upcoming Events</CardTitle>
              </div>
              <CardDescription>{data.upcomingEvents.length} events</CardDescription>
            </CardHeader>
            <CardContent className="max-h-96 overflow-y-auto">
              {data.upcomingEvents.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No upcoming events</p>
              ) : (
                <div className="space-y-3">
                  {data.upcomingEvents.map((event) => (
                    <div key={event._id} className="border-2 rounded-lg p-3 hover:bg-primary/5 hover:border-primary transition-all">
                      <h4 className="font-semibold text-sm">{event.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(event.date)} • {event.time}
                      </p>
                      <p className="text-xs text-muted-foreground">{event.venue}</p>
                      <Badge variant="secondary" className="mt-2 text-xs bg-primary/20">
                        {event.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Past Events */}
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CalendarCheck className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-primary">Past Events</CardTitle>
              </div>
              <CardDescription>Last {data.pastEvents.length} events</CardDescription>
            </CardHeader>
            <CardContent className="max-h-96 overflow-y-auto">
              {data.pastEvents.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No past events</p>
              ) : (
                <div className="space-y-3">
                  {data.pastEvents.map((event) => (
                    <div key={event._id} className="border rounded-lg p-3 hover:bg-muted/50 transition-colors opacity-75">
                      <h4 className="font-semibold text-sm">{event.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(event.date)}
                      </p>
                      <Badge variant="outline" className="mt-2 text-xs">
                        {event.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Staff Coordinators */}
        <Card className="border-2 hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <CardTitle className="text-primary">Staff Coordinators</CardTitle>
            </div>
            <CardDescription>Organizers and their respective clubs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.organizers.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No organizers found</p>
              ) : (
                data.organizers.map((organizer) => (
                  <div
                    key={organizer._id}
                    className="flex items-center justify-between border-2 border-transparent pb-3 last:border-b-0 hover:bg-primary/5 hover:border-primary/20 transition-all rounded-lg px-3 py-2"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{organizer.name}</p>
                        <p className="text-xs text-muted-foreground">{organizer.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="default" className="bg-primary hover:bg-primary/90">
                        {organizer.department}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        Staff Coordinator
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
