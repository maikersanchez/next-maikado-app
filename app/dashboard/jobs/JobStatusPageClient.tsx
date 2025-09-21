'use client'; // This is a Client Component

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Import motion for animations


interface Job {
  job_id: string;
  status: string;
  input_parameters: any;
  output_shopify_url: string | null;
  output_gdrive_url: string | null;
  created_at: string;
  updated_at: string;
  productName?: string;
  shopifyUrl?: string | null;
  gdriveUrl?: string | null;
  createdAt?: string;
}

export default function JobStatusPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const columns = [
    { key: "job_id", label: "Job ID" },
    { key: "productName", label: "Product Name" },
    { key: "status", label: "Status" },
    { key: "shopifyUrl", label: "Shopify URL" },
    { key: "gdriveUrl", label: "Google Drive URL" },
    { key: "createdAt", label: "Created At" },
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/jobs');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Job[] = await response.json();
        setJobs(data.map(job => ({
          ...job,
          productName: job.input_parameters?.productName || 'N/A',
          shopifyUrl: job.output_shopify_url,
          gdriveUrl: job.output_gdrive_url,
          createdAt: new Date(job.created_at).toLocaleString(),
        })));
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
    // Optional: set up polling to refresh data periodically
    // const interval = setInterval(fetchJobs, 5000);
    // return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="container mx-auto p-8 text-center text-lg font-semibold text-gray-700">Loading jobs...</div>;
  if (error) return <div className="container mx-auto p-8 text-red-600 text-center text-lg font-semibold">Error: {error}</div>;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "tween" as const, duration: 0.6 } },
  };

  const tableVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "tween" as const, delay: 0.2, duration: 0.6 } },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { type: "tween" as const, duration: 0.4 } },
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <motion.div initial="hidden" animate="visible" variants={cardVariants}>
            <div className="shadow-xl rounded-xl overflow-hidden bg-white">
                <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-8">
                    <h1 className="text-4xl font-extrabold text-center tracking-tight drop-shadow-md">Job Status Dashboard</h1>
                </div>
                <div className="p-8">
                    {jobs.length === 0 ? (
                        <motion.p initial="hidden" animate="visible" variants={tableVariants} className="text-center text-gray-600 text-xl font-medium py-10">
                            No jobs found. Create a new job from the <a href="/dashboard/new-job" className="text-blue-700 hover:underline font-semibold">New Job page</a>.
                        </motion.p>
                    ) : (
                        <motion.div initial="hidden" animate="visible" variants={tableVariants}>
                            <div className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            {columns.map((column) => (
                                                <th key={column.key} className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                                                    {column.label}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {jobs.map((item) => (
                                            <motion.tr key={item.job_id} className="hover:bg-blue-50 transition-colors duration-200 ease-in-out" variants={rowVariants}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    <span className="font-mono text-blue-700 font-medium">{item.job_id.substring(0, 8)}...</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {item.productName}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide 
                                                        ${item.status === 'completed' ? 'bg-green-200 text-green-900' : 
                                                        item.status === 'in-progress' ? 'bg-yellow-200 text-yellow-900' : 
                                                        item.status === 'failed' ? 'bg-red-200 text-red-900' : 'bg-gray-200 text-gray-900'}`}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {item.shopifyUrl ? (
                                                        <a href={item.shopifyUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline font-medium">View</a>
                                                    ) : 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {item.gdriveUrl ? (
                                                        <a href={item.gdriveUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline font-medium">View</a>
                                                    ) : 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {item.createdAt}
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    </div>
  );
}