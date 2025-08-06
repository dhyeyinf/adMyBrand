"use client"; // Mark as Client Component since we use usePathname

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BarChart2, FileText } from "lucide-react"; // Optional: for icons

export function Sidebar() {
  const pathname = usePathname(); // Get the current path to determine active state

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/campaigns", label: "Campaigns", icon: BarChart2 },
    { href: "/reports", label: "Reports", icon: FileText },
  ];

  return (
    <aside className="w-64 bg-muted p-4">
      <div className="flex items-center gap-2 mb-6">
        <img src="/logo.png" alt="ADmyBRAND" className="h-8 w-8" />
        <h1 className="text-xl font-bold">ADmyBRAND</h1>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            className={pathname === item.href ? "bg-accent/50" : ""}
          >
            <Button
              variant={pathname === item.href ? "default" : "ghost"}
              className="w-full justify-start hover:bg-accent/50 transition-colors"
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.icon && <item.icon className="mr-2 h-4 w-4" />}
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>
    </aside>
  );
}