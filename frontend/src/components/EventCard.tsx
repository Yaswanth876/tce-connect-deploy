import { Calendar, MapPin, Clock, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface EventCardProps {
  id?: string;
  title: string;
  date: string;
  venue: string;
  department: string;
  type?: "technical" | "cultural" | "sports";
  horizontal?: boolean;
}

export const EventCard = ({
  id = "1",
  title,
  date,
  venue,
  department,
  type = "technical",
  horizontal = false,
}: EventCardProps) => {
  const navigate = useNavigate();

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/events/${id}`);
  };

  const handleCardClick = () => {
    navigate(`/events/${id}`);
  };

  const normalizedType = (type || "technical").toLowerCase() as "technical" | "cultural" | "sports";

  const typeConfig: Record<string, { badge: string; accentBar: string; indicator: string }> = {
    technical: {
      badge: "bg-primary/10 text-primary border-primary/20 hover:bg-primary/15",
      accentBar: "from-primary via-primary-light to-accent/60",
      indicator: "bg-primary",
    },
    cultural: {
      badge: "bg-purple-50 text-purple-700 border-purple-200/80 hover:bg-purple-100 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800",
      accentBar: "from-purple-600 via-purple-400 to-pink-400",
      indicator: "bg-purple-600",
    },
    sports: {
      badge: "bg-emerald-50 text-emerald-700 border-emerald-200/80 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
      accentBar: "from-emerald-600 via-teal-400 to-amber-400",
      indicator: "bg-emerald-600",
    },
  };

  const currentTheme = typeConfig[normalizedType] || typeConfig.technical;
  const typeLabel = normalizedType.charAt(0).toUpperCase() + normalizedType.slice(1);

  if (horizontal) {
    return (
      <Card
        className="min-w-[280px] p-4 bg-card border-border/80 hover:border-primary/40 shadow-sm hover:shadow-card-hover transition-all duration-300 cursor-pointer group border-l-4 border-l-primary rounded-xl"
        onClick={handleCardClick}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className={cn(
              "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide border",
              currentTheme.badge
            )}>
              <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", currentTheme.indicator)}></span>
              {typeLabel}
            </span>
          </div>

          <h3 className="font-semibold text-base text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
            {title}
          </h3>

          <div className="space-y-1.5 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-primary/80 shrink-0" />
              <span className="truncate">{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-primary/80 shrink-0" />
              <span className="truncate">{venue}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2.5 border-t border-border/70">
            <span className="text-xs font-medium text-muted-foreground truncate max-w-[130px]">{department}</span>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 px-2 text-xs font-semibold text-primary hover:text-primary hover:bg-primary/10 gap-1 rounded-md"
              onClick={handleViewDetails}
            >
              Details
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "overflow-hidden bg-card border border-border/80 hover:border-primary/40 shadow-sm hover:shadow-card-hover transition-all duration-300 cursor-pointer group flex flex-col h-full rounded-2xl hover:-translate-y-1"
      )}
      onClick={handleCardClick}
    >
      {/* Top subtle gradient accent line */}
      <div className={cn("h-1.5 w-full bg-gradient-to-r", currentTheme.accentBar)} />

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        {/* Header: Tag + Department */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 text-xs px-2.5 py-0.5 rounded-full border font-semibold tracking-wide transition-colors",
                currentTheme.badge
              )}
            >
              <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", currentTheme.indicator)} />
              {typeLabel}
            </span>
            {department && (
              <span className="text-[11px] font-medium text-muted-foreground tracking-tight uppercase bg-muted/60 px-2 py-0.5 rounded-md truncate max-w-[140px]" title={department}>
                {department}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-semibold text-base text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2 min-h-[2.75rem]">
            {title}
          </h3>
        </div>

        {/* Details list */}
        <div className="space-y-2 py-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
              <Calendar className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="font-medium text-foreground/90 truncate">{date}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
              <MapPin className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="truncate">{venue}</span>
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-3 border-t border-border/70 flex items-center justify-between mt-auto">
          <span className="text-xs font-semibold text-primary/90 group-hover:text-primary inline-flex items-center gap-1">
            Explore Event
          </span>
          <Button
            size="sm"
            className="gap-1"
            onClick={handleViewDetails}
          >
            <span>View</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
