// src/components/Chart.tsx
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { Card } from "@/components/ui/card";
import { ChartData } from "chart.js";
import React from "react";

ChartJS.register(...registerables);

// Define overloaded function signatures for type safety
interface LineChartProps {
  type: "line";
  data: ChartData<"line">;
  title: string;
}

interface BarChartProps {
  type: "bar";
  data: ChartData<"bar">;
  title: string;
}

interface PieChartProps {
  type: "pie";
  data: ChartData<"pie">;
  title: string;
}

type ChartProps = LineChartProps | BarChartProps | PieChartProps;

export function Chart({ type, data, title }: ChartProps) {
  const renderChart = () => {
    switch (type) {
      case "line":
        return <Line data={data as ChartData<"line">} options={{ responsive: true }} />;
      case "bar":
        return <Bar data={data as ChartData<"bar">} options={{ responsive: true }} />;
      case "pie":
        return <Pie data={data as ChartData<"pie">} options={{ responsive: true }} />;
      default:
        return null;
    }
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {renderChart()}
    </Card>
  );
}