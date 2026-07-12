import { Home, Calendar, MessageCircle, User, LayoutDashboard } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/lib/auth";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Calendar, label: "Events", path: "/events" },
  { icon: MessageCircle, label: "Clubs", path: "/community" },
];

export const BottomNav = () => {
  const { isAuthenticated, user } = useAuth();
  
  // Add profile/dashboard link if authenticated
  const allNavItems = isAuthenticated 
    ? [
        ...navItems,
        { 
          icon: user?.role === 'student' ? User : LayoutDashboard, 
          label: user?.role === 'student' ? 'Profile' : 'Dashboard', 
          path: user?.role === 'student' ? '/profile' : 
                user?.role === 'organizer' ? '/organizer/dashboard' : 
                user?.role === 'admin' ? '/admin/dashboard' : '/profile' 
        }
      ]
    : navItems;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-border shadow-2xl z-50 lg:hidden safe-area-bottom">
      <div className={`flex justify-around items-center h-16 max-w-2xl mx-auto px-2 ${isAuthenticated ? 'px-1' : 'px-4'}`}>
        {allNavItems.map((item, index) => {
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className="flex flex-col items-center justify-center gap-1 flex-1 h-full py-2 px-1 transition-all duration-300 text-muted-foreground hover:text-primary group relative rounded-xl"
              activeClassName="text-primary"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Active Indicator */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-gradient-to-r from-primary to-accent transition-all duration-300 rounded-full group-[.active]:w-8"></div>
              
              {/* Icon with badge for authenticated users on profile/dashboard */}
              <div className="relative">
                <item.icon className="h-6 w-6 group-hover:scale-110 group-[.active]:scale-110 group-hover:-translate-y-0.5 transition-all duration-300 group-[.active]:text-primary" />
                {isAuthenticated && index === allNavItems.length - 1 && (
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full border border-white animate-pulse"></span>
                )}
              </div>
              
              {/* Label */}
              <span className="text-[10px] xs:text-xs font-medium group-hover:font-semibold group-[.active]:font-bold transition-all group-[.active]:text-primary truncate max-w-full">
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
      
      {/* Spacer for notched phones */}
      <div className="h-safe-area-inset-bottom bg-white/95 backdrop-blur-lg"></div>
    </nav>
  );
};
