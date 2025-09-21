'use client'; // This is a Client Component

import React, { useState } from 'react';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { Card, CardHeader, CardBody } from '@heroui/card'; // Changed CardContent to CardBody
import { motion } from 'framer-motion'; // Import motion for animations


export default function NewJobPage() {
  const [formData, setFormData] = useState({
    productName: '',
    productPrice: '',
    language: 'es',
    urlProducto: '',
    customerPains: '',
    imageCount: 1,
    videoCount: 0,
    templateId: '',
    niche: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting form data:', formData);
    // Call backend API here
    try {
      const response = await fetch('http://localhost:8000/create-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        alert(`Job created successfully! Job ID: ${result.job_id}`);
        // Optionally clear form or redirect
      } else {
        alert(`Error creating job: ${result.detail || JSON.stringify(result)}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to connect to backend API.');
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const formItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <motion.div initial="hidden" animate="visible" variants={cardVariants} className="w-full">
            <Card className="max-w-2xl mx-auto shadow-xl rounded-xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-8">
                    <h1 className="text-4xl font-extrabold text-center tracking-tight drop-shadow-md">Create New Landing Page Job</h1>
                </CardHeader>
                <CardBody className="p-8 bg-white">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div variants={formItemVariants}>
                                <Input
                                    type="text"
                                    name="productName"
                                    id="productName"
                                    label="Product Name" // Added label prop
                                    value={formData.productName}
                                    onValueChange={value => handleChange({ target: { name: 'productName', value, type: 'text' } } as React.ChangeEvent<HTMLInputElement>)} // Changed to onValueChange
                                    required
                                    className="w-full"
                                    variant="bordered"
                                    color="primary"
                                />
                            </motion.div>
                            <motion.div variants={formItemVariants}>
                                <Input
                                    type="text"
                                    name="productPrice"
                                    id="productPrice"
                                    label="Product Price" // Added label prop
                                    value={formData.productPrice}
                                    onValueChange={value => handleChange({ target: { name: 'productPrice', value, type: 'text' } } as React.ChangeEvent<HTMLInputElement>)} // Changed to onValueChange
                                    required
                                    className="w-full"
                                    variant="bordered"
                                    color="primary"
                                />
                            </motion.div>
                        </div>
                        <motion.div variants={formItemVariants}>
                            <Input
                                type="url"
                                name="urlProducto"
                                id="urlProducto"
                                label="Product URL" // Added label prop
                                value={formData.urlProducto}
                                onValueChange={value => handleChange({ target: { name: 'urlProducto', value, type: 'url' } } as React.ChangeEvent<HTMLInputElement>)} // Changed to onValueChange
                                required
                                className="w-full"
                                variant="bordered"
                                color="primary"
                            />
                        </motion.div>
                        <motion.div variants={formItemVariants}>
                            <label htmlFor="customerPains" className="block text-sm font-medium text-gray-700 mb-1">Customer Pains (comma-separated)</label>
                            <textarea
                                name="customerPains"
                                id="customerPains"
                                value={formData.customerPains}
                                onChange={handleChange}
                                rows={3}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                            ></textarea>
                        </motion.div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div variants={formItemVariants}>
                                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                                <select
                                    name="language"
                                    id="language"
                                    value={formData.language}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                                >
                                    <option value="es">Spanish</option>
                                    <option value="en">English</option>
                                </select>
                            </motion.div>
                            <motion.div variants={formItemVariants}>
                                <Input
                                    type="text"
                                    name="niche"
                                    id="niche"
                                    label="Niche" // Added label prop
                                    value={formData.niche}
                                    onValueChange={value => handleChange({ target: { name: 'niche', value, type: 'text' } } as React.ChangeEvent<HTMLInputElement>)} // Changed to onValueChange
                                    required
                                    className="w-full"
                                    variant="bordered"
                                    color="primary"
                                />
                            </motion.div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <motion.div variants={formItemVariants}>
                                <Input
                                    type="number"
                                    name="imageCount"
                                    id="imageCount"
                                    label="Number of Images" // Added label prop
                                    value={String(formData.imageCount)}
                                    onValueChange={value => handleChange({ target: { name: 'imageCount', value, type: 'number' } } as React.ChangeEvent<HTMLInputElement>)} // Changed to onValueChange
                                    min="0"
                                    className="w-full"
                                    variant="bordered"
                                    color="primary"
                                />
                            </motion.div>
                            <motion.div variants={formItemVariants}>
                                <Input
                                    type="number"
                                    name="videoCount"
                                    id="videoCount"
                                    label="Number of Videos" // Added label prop
                                    value={String(formData.videoCount)}
                                    onValueChange={value => handleChange({ target: { name: 'videoCount', value, type: 'number' } } as React.ChangeEvent<HTMLInputElement>)} // Changed to onValueChange
                                    min="0"
                                    className="w-full"
                                    variant="bordered"
                                    color="primary"
                                />
                            </motion.div>
                            <motion.div variants={formItemVariants}>
                                <Input
                                    type="text"
                                    name="templateId"
                                    id="templateId"
                                    label="Template ID" // Added label prop
                                    value={formData.templateId}
                                    onValueChange={value => handleChange({ target: { name: 'templateId', value, type: 'text' } } as React.ChangeEvent<HTMLInputElement>)} // Changed to onValueChange
                                    required
                                    className="w-full"
                                    variant="bordered"
                                    color="primary"
                                />
                            </motion.div>
                        </div>
                        <motion.div variants={formItemVariants}>
                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md">
                                Create Job
                            </Button>
                        </motion.div>
                    </form>
                </CardBody>
            </Card>
        </motion.div>
    </section>
  );
}