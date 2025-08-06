"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, MoreHorizontal } from "lucide-react";

interface EnhancedCardProps {
  title: string;
  value: string;
  change: number;
  icon: string;
  trend?: number[];
  comparison?: string;
  status?: "good" | "warning" | "danger";
}

export function EnhancedCard({
  title,
  value,
  change,
  icon,
  trend = [],
  comparison,
  status = "good"
}: EnhancedCardProps) {
  const isPositive = change > 0;
  
  const statusColors = {
    good: "text-green-600 bg-green-50 dark:bg-green-950",
    warning: "text-yellow-600 bg-yellow-50 dark:bg-yellow-950",
    danger: "text-red-600 bg-red-50 dark:bg-red-950"
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="relative overflow-hidden group cursor-pointer">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{icon}</span>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
          </div>
          <MoreHorizontal className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </CardHeader>
        
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">{value}</p>
              <Badge 
                variant={isPositive ? "success" : "destructive"}
                className="flex items-center gap-1"
              >
                {isPositive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {Math.abs(change)}%
              </Badge>
            </div>
            
            {comparison && (
              <p className="text-xs text-muted-foreground">
                {comparison}
              </p>
            )}
            
            {trend.length > 0 && (
              <div className="h-8 flex items-end space-x-1">
                {trend.map((value, index) => (
                  <div
                    key={index}
                    className="bg-primary/20 rounded-sm flex-1"
                    style={{ height: `${(value / Math.max(...trend)) * 100}%` }}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Status indicator */}
          <div className={`absolute top-0 left-0 w-1 h-full ${statusColors[status]}`} />
        </CardContent>
      </Card>
    </motion.div>
  );
}