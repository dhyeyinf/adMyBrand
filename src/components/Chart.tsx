// src/components/Chart.tsx
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { Card } from "@/components/ui/card";

ChartJS.register(...registerables);

interface ChartProps {
  type: "line" | "bar" | "pie";
  data: any;
  title: string;
}

export function Chart({ type, data, title }: ChartProps) {
  const Component = { line: Line, bar: Bar, pie: Pie }[type];

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <Component data={data} options={{ responsive: true }} />
    </Card>
  );
}