import React from "react";
import { Card, CardBody } from "@heroui/card";
import { motion } from "framer-motion";

interface AnalyticsCardProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
}

export const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  value,
  icon,
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div animate="visible" initial="hidden" variants={cardVariants}>
      <Card>
        <CardBody className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            {icon}
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
          <p className="text-4xl font-bold">{value}</p>
        </CardBody>
      </Card>
    </motion.div>
  );
};
