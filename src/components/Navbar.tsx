// src/components/Navbar.tsx
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  return (
    <header className="bg-background border-b p-4 flex justify-between items-center">
      <h2 className="text-lg font-semibold">Insights Dashboard</h2>
      <ThemeToggle />
    </header>
  );
}