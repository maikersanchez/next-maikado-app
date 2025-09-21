'use client'; // This is a Client Component

import React, { useEffect, useState } from 'react';
import { AnalyticsCard } from '@/components/AnalyticsCard';

interface AnalyticsSummary {
  [job_id: string]: {
    total_views: number;
    total_purchases: number;
    total_revenue: number;
    conversion_rate: number;
  };
}

const AnalyticsDashboardPage = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await fetch('http://localhost:8000/analytics/summary');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: AnalyticsSummary = await response.json();
        setAnalyticsData(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading analytics data...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
      {analyticsData && Object.keys(analyticsData).length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(analyticsData).map(([jobId, data]) => (
            <AnalyticsCard key={jobId} jobId={jobId} data={data} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">No analytics data available.</p>
        </div>
      )}
    </div>
  );
};

export default AnalyticsDashboardPage;

