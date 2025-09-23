"use client";

import React, { useEffect, useState } from "react";
import { DollarSign, ShoppingCart, Zap } from "lucide-react";

import { AnalyticsCard } from "@/components/AnalyticsCard";

interface AnalyticsData {
  total_views: number;
  total_purchases: number;
  total_revenue: number;
  conversion_rate: number;
}

interface AnalyticsSummary {
  [job_id: string]: AnalyticsData;
}

export default function AnalyticsDashboardPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsSummary | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        // Using mock data for now
        const mockData: AnalyticsSummary = {
          "job-1": {
            total_views: 1200,
            total_purchases: 50,
            total_revenue: 2500,
            conversion_rate: 4.17,
          },
          "job-2": {
            total_views: 800,
            total_purchases: 25,
            total_revenue: 1250,
            conversion_rate: 3.13,
          },
          "job-3": {
            total_views: 2500,
            total_purchases: 120,
            total_revenue: 6000,
            conversion_rate: 4.8,
          },
        };

        setAnalyticsData(mockData);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (loading) {
    return <p>Loading analytics data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Detailed Analytics</h2>
      {analyticsData && Object.keys(analyticsData).length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(analyticsData).map(([jobId, data]) => (
            <div key={jobId} className="p-4 border rounded-lg">
              <h3 className="font-bold text-lg mb-2">Job ID: {jobId}</h3>
              <div className="grid grid-cols-2 gap-4">
                <AnalyticsCard
                  icon={<Zap className="h-6 w-6 text-gray-500" />}
                  title="Total Views"
                  value={data.total_views.toString()}
                />
                <AnalyticsCard
                  icon={<ShoppingCart className="h-6 w-6 text-gray-500" />}
                  title="Total Purchases"
                  value={data.total_purchases.toString()}
                />
                <AnalyticsCard
                  icon={<DollarSign className="h-6 w-6 text-gray-500" />}
                  title="Total Revenue"
                  value={`$${data.total_revenue.toFixed(2)}`}
                />
                <AnalyticsCard
                  icon={<Zap className="h-6 w-6 text-gray-500" />}
                  title="Conversion Rate"
                  value={`${data.conversion_rate.toFixed(2)}%`}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No analytics data available.</p>
      )}
    </div>
  );
}
