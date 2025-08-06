// src/components/Card.tsx
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  title: string;
  value: string | number;
  change: number;
  icon?: string;
}

export function Card({ title, value, change, icon }: CardProps) {
  return (
    <motion.div
      className="p-4 bg-card rounded-lg shadow-md border border-border"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center gap-2">
        {icon && <span className="text-2xl">{icon}</span>}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
          <p
            className={cn(
              "text-sm",
              change >= 0 ? "text-green-500" : "text-red-500"
            )}
          >
            {change >= 0 ? "+" : ""}{change}%
          </p>
        </div>
      </div>
    </motion.div>
  );
}