"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { EnhancedCard } from "@/components/EnhancedCard";
import { Chart } from "@/components/Chart";
import { DataTable } from "@/components/DataTable";
import { AdvancedFilters } from "@/components/AdvancedFilters";
import { RealTimeUpdates } from "@/components/RealTimeUpdates";
import { AnalyticsInsights } from "@/components/AnalyticsInsights";
import { QuickActions } from "@/components/QuickActions";
import { MetricsComparison } from "@/components/MetricsComparison";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { useToast } from "@/components/ui/use-toast";
import { chartData, tableData } from "@/lib/data";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [realTimeData, setRealTimeData] = useState(null);
  const { toast } = useToast();

  // Enhanced metrics with more data
  const [metrics, setMetrics] = useState([
    {
      title: "Total Revenue",
      value: "$54,239",
      change: 12.5,
      icon: "💰",
      trend: [20, 35, 28, 45, 38, 52, 48],
      comparison: "vs. last month",
      status: "good" as const
    },
    {
      title: "Active Users",
      value: "12,543",
      change: 8.2,
      icon: "👥",
      trend: [15, 25, 20, 30, 28, 35, 32],
      comparison: "+2,341 new users",
      status: "good" as const
    },
    {
      title: "Conversions",
      value: "3,456",
      change: -2.4,
      icon: "📈",
      trend: [40, 35, 38, 30, 32, 28, 25],
      comparison: "Below target by 5%",
      status: "warning" as const
    },
    {
      title: "CTR",
      value: "4.23%",
      change: 15.3,
      icon: "🎯",
      trend: [10, 15, 12, 18, 20, 25, 23],
      comparison: "Industry avg: 3.2%",
      status: "good" as const
    }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleFiltersChange = (filters: any) => {
    toast({
      title: "Filters Applied",
      description: `Data filtered by ${filters.dateRange} period`,
    });
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    toast({
      title: `Export Started`,
      description: `Your ${format.toUpperCase()} export is being prepared...`,
    });

    // Simulate export process
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: `Dashboard data exported successfully as ${format.toUpperCase()}`,
      });
    }, 2000);
  };

  const handleRefresh = () => {
    toast({
      title: "Data Refreshed",
      description: "Dashboard data has been updated with the latest information.",
    });
  };

  const handleRealTimeUpdate = (data: any) => {
    setRealTimeData(data);
    // Update metrics with real-time data
    setMetrics(prev => prev.map(metric => ({
      ...metric,
      value: metric.title === "Total Revenue" 
        ? `$${data.metrics.revenue.toLocaleString()}` 
        : metric.value,
      change: metric.title === "Total Revenue" 
        ? data.metrics.growth 
        : metric.change
    })));
  };

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="space-y-6">
      {/* Header with Real-time Status and Quick Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
          >
            Dashboard Overview
          </motion.h1>
          <RealTimeUpdates onDataUpdate={handleRealTimeUpdate} />
        </div>
        <QuickActions />
      </div>

      {/* Advanced Filters */}
      <AdvancedFilters 
        onFiltersChange={handleFiltersChange}
        onExport={handleExport}
        onRefresh={handleRefresh}
      />

      {/* Enhanced Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <EnhancedCard {...metric} />
          </motion.div>
        ))}
      </div>

      {/* Charts and Insights Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Chart type="line" data={chartData.line} title="Revenue Trend" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Chart type="bar" data={chartData.bar} title="Daily Clicks" />
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Chart type="pie" data={chartData.pie} title="Traffic Sources" />
          </motion.div>
        </div>

        {/* Right Sidebar with Insights and Comparison */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <AnalyticsInsights />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <MetricsComparison />
          </motion.div>
        </div>
      </div>

      {/* Enhanced Data Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <DataTable data={tableData} />
      </motion.div>
    </div>
  );
}