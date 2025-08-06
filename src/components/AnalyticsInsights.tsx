"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, AlertTriangle, Lightbulb, Target } from "lucide-react";

interface Insight {
  id: string;
  type: "opportunity" | "warning" | "trend" | "recommendation";
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  confidence: number;
}

export function AnalyticsInsights() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate AI-generated insights
    setTimeout(() => {
      setInsights([
        {
          id: "1",
          type: "opportunity",
          title: "Peak Performance Window",
          description: "Your campaigns perform 23% better between 2-4 PM. Consider increasing budget during these hours.",
          impact: "high",
          confidence: 92
        },
        {
          id: "2",
          type: "warning",
          title: "CTR Decline Detected",
          description: "Mobile CTR has dropped 15% over the last 7 days. Ad creative refresh recommended.",
          impact: "medium",
          confidence: 87
        },
        {
          id: "3",
          type: "trend",
          title: "Emerging Audience Segment",
          description: "25-34 age group showing 40% higher conversion rates than average.",
          impact: "high",
          confidence: 95
        },
        {
          id: "4",
          type: "recommendation",
          title: "Budget Optimization",
          description: "Reallocating 20% of budget from Campaign A to Campaign C could increase ROI by 12%.",
          impact: "medium",
          confidence: 78
        }
      ]);
      setIsLoading(false);
    }, 1500);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case "opportunity": return <Target className="h-4 w-4" />;
      case "warning": return <AlertTriangle className="h-4 w-4" />;
      case "trend": return <TrendingUp className="h-4 w-4" />;
      case "recommendation": return <Lightbulb className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case "opportunity": return "text-green-600 bg-green-50 dark:bg-green-950";
      case "warning": return "text-yellow-600 bg-yellow-50 dark:bg-yellow-950";
      case "trend": return "text-blue-600 bg-blue-50 dark:bg-blue-950";
      case "recommendation": return "text-purple-600 bg-purple-50 dark:bg-purple-950";
      default: return "text-gray-600 bg-gray-50 dark:bg-gray-950";
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          AI Insights
          <Badge variant="secondary" className="ml-auto">
            {insights.length} insights
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border rounded-lg p-3 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${getColor(insight.type)}`}>
                  {getIcon(insight.type)}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{insight.title}</h4>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={insight.impact === "high" ? "destructive" : insight.impact === "medium" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {insight.impact} impact
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {insight.confidence}% confidence
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {insight.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}