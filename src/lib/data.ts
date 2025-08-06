// src/lib/data.ts
export type Metric = {
  title: string;
  value: number | string;
  change: number; // Percentage change
  icon?: string; // Optional icon for UI
};

export type TableData = {
  id: number;
  campaign: string;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
};

export const metrics: Metric[] = [
  { title: "Revenue", value: "$245,678", change: 12.5, icon: "💰" },
  { title: "Users", value: "1.2M", change: -3.2, icon: "👥" },
  { title: "Conversions", value: "15,432", change: 8.7, icon: "📈" },
  { title: "Growth", value: "24%", change: 5.1, icon: "🚀" },
];

export const tableData: TableData[] = [
  { id: 1, campaign: "Summer Sale", impressions: 100000, clicks: 5000, conversions: 200, revenue: 15000 },
  { id: 2, campaign: "Winter Promo", impressions: 80000, clicks: 4000, conversions: 150, revenue: 12000 },
  // Add more rows as needed
];

export const chartData = {
  line: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
      },
    ],
  },
  bar: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Clicks",
        data: [500, 700, 600, 800, 900],
        backgroundColor: "#10b981",
      },
    ],
  },
  pie: {
    labels: ["Social", "Search", "Direct", "Referral"],
    datasets: [
      {
        data: [300, 500, 200, 100],
        backgroundColor: ["#ef4444", "#f59e0b", "#10b981", "#3b82f6"],
      },
    ],
  },
};