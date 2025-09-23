"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from "@heroui/table";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { motion } from "framer-motion";

interface Job {
  Id: number;
  id: number;
  job_id: string;
  status: string;
  input_parameters: any;
  output_shopify_url: string | null;
  output_gdrive_url: string | null;
  CreatedAt: string;
  UpdatedAt: string;
  productName?: string;
  shopifyUrl?: string | null;
  gdriveUrl?: string | null;
  createdAt?: string;
}

const statusColorMap: Record<
  string,
  "success" | "warning" | "danger" | "default"
> = {
  completed: "success",
  "in-progress": "warning",
  failed: "danger",
  default: "default",
};

export default function JobStatusPageClient() {
  const [jobs, setJobs] = React.useState<Job[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const columns = [
    { key: "job_id", label: "Job ID" },
    { key: "productName", label: "Product Name" },
    { key: "status", label: "Status" },
    { key: "shopifyUrl", label: "Shopify URL" },
    { key: "gdriveUrl", label: "Google Drive URL" },
    { key: "createdAt", label: "Created At" },
    { key: "actions", label: "Actions" },
  ];

  const fetchJobs = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/jobs");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Job[] = await response.json();
      console.log('Raw API data:', data);

      setJobs(
        data.map((job) => {
          let inputParams: any = {};
          if (typeof job.input_parameters === 'object' && job.input_parameters !== null) {
            inputParams = job.input_parameters;
          } else if (typeof job.input_parameters === 'string') {
            try {
              inputParams = JSON.parse(job.input_parameters);
            } catch (e) {
              try {
                const correctedString = job.input_parameters.replace(/'/g, '"');
                inputParams = JSON.parse(correctedString);
              } catch (e2) {
                console.error("Failed to parse input_parameters string:", job.input_parameters, e2);
              }
            }
          }

          return {
            ...job,
            id: job.Id, // Use NocoDB's Id as the key
            productName: inputParams?.productName || "N/A",
            shopifyUrl: job.output_shopify_url,
            gdriveUrl: job.output_gdrive_url,
            createdAt: new Date(job.CreatedAt).toLocaleString(),
          };
        }),
      );
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleRetry = React.useCallback(
    async (jobId: string) => {
      try {
        const response = await fetch(
          `http://localhost:8000/jobs/${jobId}/retry`,
          {
            method: "POST",
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        await response.json();
        // Refresh the jobs list to show the new job
        fetchJobs();
      } catch (e: any) {
        setError(e.message);
      }
    },
    [fetchJobs],
  );

  const renderCell = React.useCallback(
    (job: Job, columnKey: React.Key) => {
      const cellValue = getKeyValue(job, String(columnKey));

      switch (columnKey) {
        case "status":
          return (
            <Chip
              color={statusColorMap[job.status] || statusColorMap.default}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "shopifyUrl":
          return cellValue ? (
            <Link isExternal href={cellValue.toString()}>
              View
            </Link>
          ) : (
            "N/A"
          );
        case "gdriveUrl":
          return cellValue ? (
            <Link isExternal href={cellValue.toString()}>
              View
            </Link>
          ) : (
            "N/A"
          );
        case "actions":
          return job.status === "failed" || job.status === "pending" ? (
            <Button
              color="primary"
              size="sm"
              onClick={() => handleRetry(job.job_id)}
            >
              Retry
            </Button>
          ) : null;
        default:
          return cellValue;
      }
    },
    [handleRetry],
  );

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      {jobs.length === 0 ? (
        <p>
          No jobs found. Create a new job from the{" "}
          <Link href="/dashboard/new-job">New Job page</Link>.
        </p>
      ) : (
        <Table aria-label="Jobs table">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={jobs}>
            {(item) => (
              <TableRow key={item.job_id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </motion.div>
  );
}
