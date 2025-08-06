"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Wifi, WifiOff } from "lucide-react";

// Describe the live update data shape
export type RealTimeUpdate = {
  timestamp: Date;
  metrics: {
    revenue: number;
    users: number;
    conversions: number;
    growth: number;
  };
};

interface RealTimeUpdatesProps {
  onDataUpdate: (data: RealTimeUpdate) => void;
}

export function RealTimeUpdates({ onDataUpdate }: RealTimeUpdatesProps) {
  const [isConnected, setIsConnected] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      const mockUpdate: RealTimeUpdate = {
        timestamp: new Date(),
        metrics: {
          revenue: Math.floor(Math.random() * 1000) + 50000,
          users: Math.floor(Math.random() * 100) + 1000,
          conversions: Math.floor(Math.random() * 50) + 100,
          growth: (Math.random() - 0.5) * 10,
        },
      };

      setLastUpdate(new Date());
      onDataUpdate(mockUpdate);
      setIsConnected(Math.random() > 0.05);
    }, 5000);

    return () => clearInterval(interval);
  }, [onDataUpdate]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-2 text-sm text-muted-foreground"
    >
      <div className="flex items-center gap-1">
        {isConnected ? (
          <Wifi className="h-4 w-4 text-green-500" />
        ) : (
          <WifiOff className="h-4 w-4 text-red-500" />
        )}
        <Badge variant={isConnected ? "success" : "destructive"} className="text-xs">
          {isConnected ? "Live" : "Offline"}
        </Badge>
      </div>
      <span>Last update: {lastUpdate.toLocaleTimeString()}</span>
    </motion.div>
  );
}
