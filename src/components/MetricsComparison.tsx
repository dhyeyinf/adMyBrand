"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight, Calendar } from "lucide-react";

interface ComparisonData {
  metric: string;
  current: number;
  previous: number;
  unit: string;
}

export function MetricsComparison() {
  const comparisonData: ComparisonData[] = [
    { metric: "Revenue", current: 125000, previous: 98000, unit: "$" },
    { metric: "Conversions", current: 3420, previous: 2890, unit: "" },
    { metric: "CTR", current: 4.8, previous: 4.2, unit: "%" },
    { metric: "ROAS", current: 3.2, previous: 2.8, unit: "x" },
  ];

  const formatNumber = (num: number, unit: string) => {
    if (unit === "$") return `${num.toLocaleString()}`;
    if (unit === "%") return `${num}%`;
    if (unit === "x") return `${num}x`;
    return num.toLocaleString();
  };

  const getPercentageChange = (current: number, previous: number) => {
    return ((current - previous) / previous) * 100;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Performance Comparison
          <Badge variant="outline" className="ml-auto">
            vs. Last Period
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {comparisonData.map((item, index) => {
            const change = getPercentageChange(item.current, item.previous);
            const isPositive = change > 0;
            
            return (
              <motion.div
                key={item.metric}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="space-y-1">
                  <p className="font-medium text-sm">{item.metric}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">
                      {formatNumber(item.current, item.unit)}
                    </span>
                    <Badge
                      variant={isPositive ? "success" : "destructive"}
                      className="flex items-center gap-1 text-xs"
                    >
                      {isPositive ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                      {Math.abs(change).toFixed(1)}%
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Previous</p>
                  <p className="text-sm font-medium text-muted-foreground">
                    {formatNumber(item.previous, item.unit)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}