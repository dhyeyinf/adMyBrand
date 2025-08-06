"use client";

import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Search, User } from "lucide-react";

export function EnhancedNavbar() {
  const pathname = usePathname();
  
  const getPageTitle = (path: string) => {
    switch (path) {
      case "/dashboard": return "Dashboard Overview";
      case "/campaigns": return "Campaign Management";
      case "/reports": return "Analytics Reports";
      default: return "ADmyBRAND Insights";
    }
  };

  const getBreadcrumbs = (path: string) => {
    const segments = path.split("/").filter(Boolean);
    return segments.map(segment => 
      segment.charAt(0).toUpperCase() + segment.slice(1)
    );
  };

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b sticky top-0 z-40">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <div>
            <h2 className="text-lg font-semibold">{getPageTitle(pathname)}</h2>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <span>Home</span>
              {getBreadcrumbs(pathname).map((crumb, index) => (
                <span key={index} className="flex items-center">
                  <span className="mx-1">/</span>
                  <span>{crumb}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="relative">
            <Search className="h-4 w-4" />
          </Button>
          
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 flex items-center justify-center"
            >
              3
            </Badge>
          </Button>
          
          <Button variant="ghost" size="sm">
            <User className="h-4 w-4 mr-2" />
            Profile
          </Button>
          
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}