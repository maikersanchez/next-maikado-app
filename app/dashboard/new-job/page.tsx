"use client";

import React, { useState } from "react";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";
import { motion } from "framer-motion";

export default function NewJobPage() {
  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    language: "es",
    currency: "USD",
    urlProducto: "",
    customerPains: "",
    imageCount: 1,
    videoCount: 0,
    templateId: "",
    niche: "",
  });

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Submitting form data:", formData);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/create-job`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log("Job created successfully:", result);
      alert(`Job created successfully!\nJob ID: ${result.job_id}`);
      // Optionally, redirect or clear the form
      // window.location.href = '/dashboard/jobs';
    } catch (error) {
      console.error("Failed to create job:", error);
      alert("Failed to create job. Check the console for more details.");
    } finally {
      setIsLoading(false);
    }
  };

  const formItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      animate="visible"
      initial="hidden"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
    >
      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={formItemVariants}>
            <Input
              required
              label="Product Name"
              type="text"
              value={formData.productName}
              onValueChange={(value) => handleChange("productName", value)}
            />
          </motion.div>
          <motion.div variants={formItemVariants}>
            <Input
              required
              label="Product Price"
              type="text"
              value={formData.productPrice}
              onValueChange={(value) => handleChange("productPrice", value)}
            />
          </motion.div>
        </div>
        <motion.div variants={formItemVariants}>
          <Input
            required
            label="Product URL"
            type="url"
            value={formData.urlProducto}
            onValueChange={(value) => handleChange("urlProducto", value)}
          />
        </motion.div>
        <motion.div variants={formItemVariants}>
          <Textarea
            label="Customer Pains (comma-separated)"
            value={formData.customerPains}
            onValueChange={(value) => handleChange("customerPains", value)}
          />
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={formItemVariants}>
            <Select
              label="Language"
              selectedKeys={[formData.language]}
              onChange={(e) => handleChange("language", e.target.value)}
            >
              <SelectItem key="es">Spanish</SelectItem>
              <SelectItem key="en">English</SelectItem>
            </Select>
          </motion.div>
          <motion.div variants={formItemVariants}>
            <Select
              label="Currency"
              selectedKeys={[formData.currency]}
              onChange={(e) => handleChange("currency", e.target.value)}
            >
              <SelectItem key="USD">USD</SelectItem>
              <SelectItem key="EUR">EUR</SelectItem>
              <SelectItem key="MXN">MXN</SelectItem>
              <SelectItem key="COP">COP</SelectItem>
            </Select>
          </motion.div>
        </div>
        <motion.div variants={formItemVariants}>
          <Input
            required
            label="Niche"
            type="text"
            value={formData.niche}
            onValueChange={(value) => handleChange("niche", value)}
          />
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div variants={formItemVariants}>
            <Input
              label="Number of Images"
              min="0"
              type="number"
              value={String(formData.imageCount)}
              onValueChange={(value) =>
                handleChange("imageCount", Number(value))
              }
            />
          </motion.div>
          <motion.div variants={formItemVariants}>
            <Input
              label="Number of Videos"
              min="0"
              type="number"
              value={String(formData.videoCount)}
              onValueChange={(value) =>
                handleChange("videoCount", Number(value))
              }
            />
          </motion.div>
          <motion.div variants={formItemVariants}>
            <Input
              required
              label="Template ID"
              type="text"
              value={formData.templateId}
              onValueChange={(value) => handleChange("templateId", value)}
            />
          </motion.div>
        </div>
        <motion.div variants={formItemVariants}>
          <Button
            className="w-full"
            color="primary"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? "Creating Job..." : "Create Job"}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
}
