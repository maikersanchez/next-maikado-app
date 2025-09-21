import React from "react";
import { motion } from "framer-motion"; // Import motion for animations

interface AnalyticsCardProps {
  jobId: string;
  data: {
    total_views: number;
    total_purchases: number;
    total_revenue: number;
    conversion_rate: number;
  };
}

export const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ jobId, data }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={cardVariants}>
      <div className="shadow-xl rounded-xl overflow-hidden bg-white transform transition-transform duration-300 hover:scale-105">
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-6">
          <h2 className="text-2xl font-extrabold tracking-tight text-center drop-shadow-md">Job ID: {jobId}</h2>
        </div>
        <div className="p-6 space-y-4">
          <motion.p variants={textVariants} className="text-gray-800 text-lg flex justify-between items-center">
            <span>Total Views:</span> <span className="font-bold text-blue-700 text-xl">{data.total_views}</span>
          </motion.p>
          <motion.p variants={textVariants} className="text-gray-800 text-lg flex justify-between items-center">
            <span>Total Purchases:</span> <span className="font-bold text-green-700 text-xl">{data.total_purchases}</span>
          </motion.p>
          <motion.p variants={textVariants} className="text-gray-800 text-lg flex justify-between items-center">
            <span>Total Revenue:</span> <span className="font-bold text-purple-700 text-xl">${data.total_revenue.toFixed(2)}</span>
          </motion.p>
          <motion.p variants={textVariants} className="text-gray-800 text-lg flex justify-between items-center">
            <span>Conversion Rate:</span> <span className="font-bold text-orange-700 text-xl">{data.conversion_rate.toFixed(2)}%</span>
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};