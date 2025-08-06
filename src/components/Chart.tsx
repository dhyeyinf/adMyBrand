// src/components/Chart.tsx
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { Card } from "@/components/ui/card";
import { ChartData, ChartOptions } from "chart.js";
import React from "react";

ChartJS.register(...registerables);

type ChartType = "line" | "bar" | "pie";

interface ChartProps<TData> {
  type: ChartType;
  data: ChartData<"line"> | ChartData<"bar"> | ChartData<"pie">;
  title: string;
}

export function Chart<TData>({
  type,
  data,
  title,
}: ChartProps<TData>) {
  const Component = {
    line: Line,
    bar: Bar,
    pie: Pie,
  }[type];

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <Component data={data} options={{ responsive: true }} />
    </Card>
  );
}
