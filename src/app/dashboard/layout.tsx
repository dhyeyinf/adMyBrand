import { Sidebar } from "@/components/Sidebar";
import { EnhancedNavbar } from "@/components/EnhancedNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <EnhancedNavbar />
        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-background to-muted/20">
          {children}
        </main>
      </div>
    </div>
  );
}