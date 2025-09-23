"use client";

import { DollarSign, ShoppingCart, Zap } from "lucide-react";

import { AnalyticsCard } from "@/components/AnalyticsCard";

export default function DashboardPage() {
  const kpis = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      icon: <DollarSign className="h-6 w-6 text-gray-500" />,
    },
    {
      title: "Total Sales",
      value: "+12,234",
      icon: <ShoppingCart className="h-6 w-6 text-gray-500" />,
    },
    {
      title: "Conversion Rate",
      value: "5.6%",
      icon: <Zap className="h-6 w-6 text-gray-500" />,
    },
    {
      title: "Active Jobs",
      value: "3",
      icon: <Zap className="h-6 w-6 text-gray-500" />,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => (
        <AnalyticsCard key={kpi.title} {...kpi} />
      ))}
    </div>
  );
}
