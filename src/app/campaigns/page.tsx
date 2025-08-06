"use client";

import { Card } from "@/components/Card";
import { Chart } from "@/components/Chart";
import { DataTable } from "@/components/DataTable";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";

// Mock data for campaigns
const campaignMetrics = [
  { title: "Impressions", value: "1.5M", change: 5.2, icon: "👀" },
  { title: "Clicks", value: "75K", change: 3.8, icon: "👆" },
  { title: "Conversions", value: "3.2K", change: -1.5, icon: "✅" },
  { title: "CTR", value: "5.0%", change: 2.1, icon: "📊" },
];

const campaignChartData = {
  line: {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Impressions",
        data: [1200000, 1400000, 1500000, 1450000],
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
      },
    ],
  },
  bar: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Clicks",
        data: [6000, 7000, 6500, 8000, 7500],
        backgroundColor: "#3b82f6",
      },
    ],
  },
};

const campaignTableData = [
  { id: 1, campaign: "Summer Sale", impressions: 500000, clicks: 25000, conversions: 1000, ctr: "5.0%" },
  { id: 2, campaign: "Winter Promo", impressions: 400000, clicks: 20000, conversions: 800, ctr: "5.0%" },
  { id: 3, campaign: "Holiday Boost", impressions: 600000, clicks: 30000, conversions: 1400, ctr: "5.0%" },
];

export default function Campaigns() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {campaignMetrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card {...metric} />
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Chart type="line" data={campaignChartData.line} title="Impressions Trend" />
        <Chart type="bar" data={campaignChartData.bar} title="Daily Clicks" />
      </div>

      {/* Data Table */}
      <DataTable data={campaignTableData} />
    </div>
  );
}