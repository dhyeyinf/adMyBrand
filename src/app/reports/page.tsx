"use client";

import { Card } from "@/components/Card";
import { Chart } from "@/components/Chart";
import { DataTable } from "@/components/DataTable";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for reports
const reportMetrics = [
  { title: "Total Revenue", value: "$500K", change: 7.8, icon: "💰" },
  { title: "Average CTR", value: "4.5%", change: 1.2, icon: "📈" },
  { title: "Report Downloads", value: "1.2K", change: 3.5, icon: "📥" },
];

const reportChartData = {
  pie: {
    labels: ["Revenue", "Ad Spend", "Profit"],
    datasets: [
      {
        data: [500000, 300000, 200000],
        backgroundColor: ["#ef4444", "#f59e0b", "#10b981"],
      },
    ],
  },
};

const reportTableData = [
  { id: 1, report: "Q1 2025 Summary", revenue: "$250K", ctr: "4.5%", downloads: 600 },
  { id: 2, report: "Q2 2025 Summary", revenue: "$300K", ctr: "4.6%", downloads: 700 },
  { id: 3, report: "Q3 2025 Forecast", revenue: "$280K", ctr: "4.4%", downloads: 650 },
];

export default function Reports() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <LoadingSkeleton />;

  const exportToCSV = () => {
    const headers = Object.keys(reportTableData[0]).join(",");
    const rows = reportTableData.map((row) => Object.values(row).join(",")).join("\n");
    const csv = `${headers}\n${rows}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "reports.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportMetrics.map((metric, index) => (
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
      <div className="grid grid-cols-1 gap-4">
        <Chart type="pie" data={reportChartData.pie} title="Revenue Breakdown" />
      </div>

      {/* Data Table with Export */}
      <div className="space-y-4">
        <Button onClick={exportToCSV} className="flex items-center gap-2">
          <Download className="h-4 w-4" /> Export CSV
        </Button>
        <DataTable data={reportTableData} />
      </div>
    </div>
  );
}