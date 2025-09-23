"use client";

import { useState } from "react";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";

import { title, subtitle } from "@/components/primitives";

interface Scene {
  scene_number: number;
  hook?: string;
  problem?: string;
  solution?: string;
  demonstration?: string;
  benefits?: string;
  visuals: string;
  audio: string;
  duration: number;
  call_to_action?: string;
}

export default function Home() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("USD");
  const [numImages, setNumImages] = useState("");
  const [numVideos, setNumVideos] = useState("");
  const [figmaTemplate, setFigmaTemplate] = useState("");
  const [painPoints, setPainPoints] = useState("");
  const [generatedDesc, setGeneratedDesc] = useState("");
  const [seoKeywords, setSeoKeywords] = useState([]);
  const [videoScript, setVideoScript] = useState<Scene[] | string>([]);
  const [imagePrompts, setImagePrompts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const formData = {
      productName,
      productPrice,
      productUrl,
      language,
      currency,
      numImages,
      numVideos,
      figmaTemplate,
      painPoints,
    };

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();

        setGeneratedDesc(data.description);
        setSeoKeywords(data.seo_keywords);
        setVideoScript(data.video_script);
        setImagePrompts(data.image_prompts || []);
      } else {
        console.error("Error sending data");
        alert("Error sending data");
      }
    } catch (error) {
      console.error("Error sending data", error);
      alert("Error sending data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <h1 className={title()}>n8n Advanced Promoter</h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          Generate high-quality product listings for Shopify
        </h2>
      </div>

      <div className="flex flex-col items-center gap-4 w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <Input
            label="Product Name"
            placeholder="Enter product name"
            value={productName}
            onValueChange={setProductName}
          />
          <Input
            label="Product Price"
            placeholder="Enter product price"
            type="number"
            value={productPrice}
            onValueChange={setProductPrice}
          />
          <Input
            label="Product URL"
            placeholder="Enter product URL"
            value={productUrl}
            onValueChange={setProductUrl}
          />
          <div className="flex flex-col gap-2">
            <label htmlFor="language-select" className="text-sm font-medium">
              Language
            </label>
            <select
              id="language-select"
              className="bg-gray-100 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="currency-select" className="text-sm font-medium">
              Currency
            </label>
            <select
              id="currency-select"
              className="bg-gray-100 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="MXN">MXN</option>
              <option value="COP">COP</option>
            </select>
          </div>
          <Input
            label="Number of images to generate"
            placeholder="Enter number of images"
            type="number"
            value={numImages}
            onValueChange={setNumImages}
          />
          <Input
            label="Number of videos to generate"
            placeholder="Enter number of videos"
            type="number"
            value={numVideos}
            onValueChange={setNumVideos}
          />
          <Input
            label="Figma template"
            placeholder="Enter Figma template URL"
            value={figmaTemplate}
            onValueChange={setFigmaTemplate}
          />
        </div>
        <Textarea
          className="w-full"
          label="Pain Points"
          placeholder="Enter customer pain points, separated by commas or new lines"
          value={painPoints}
          onValueChange={setPainPoints}
        />
        <Button
          className="w-full"
          color="primary"
          disabled={loading}
          onClick={handleGenerate}
        >
          {loading ? "Generating..." : "Generate"}
        </Button>
      </div>

      {generatedDesc && (
        <div className="mt-8 w-full max-w-4xl">
          <h3 className={title({ size: "sm" })}>Generated Content:</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            {generatedDesc && (
              <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h4 className="font-bold text-lg mb-2">Description:</h4>
                <p className="text-gray-700">{generatedDesc}</p>
              </div>
            )}
            {seoKeywords.length > 0 && (
              <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h4 className="font-bold text-lg mb-2">SEO Keywords:</h4>
                <ul className="list-disc list-inside text-gray-700">
                  {seoKeywords.map((keyword, index) => (
                    <li key={index}>{keyword}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {videoScript.length > 0 && (
        <div className="mt-8 w-full max-w-4xl">
          <h3 className={title({ size: "sm" })}>Video Script:</h3>
          <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm p-4">
            {Array.isArray(videoScript) ? (
              videoScript.map((scene, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 border-b border-gray-200 last:border-b-0"
                >
                  <p className="font-bold">
                    Scene Number: {scene.scene_number}
                  </p>
                  {scene.hook && (
                    <p>
                      <span className="font-semibold">Hook:</span> {scene.hook}
                    </p>
                  )}
                  {scene.problem && (
                    <p>
                      <span className="font-semibold">Problem:</span>{" "}
                      {scene.problem}
                    </p>
                  )}
                  {scene.solution && (
                    <p>
                      <span className="font-semibold">Solution:</span>{" "}
                      {scene.solution}
                    </p>
                  )}
                  {scene.demonstration && (
                    <p>
                      <span className="font-semibold">Demonstration:</span>{" "}
                      {scene.demonstration}
                    </p>
                  )}
                  {scene.benefits && (
                    <p>
                      <span className="font-semibold">Benefits:</span>{" "}
                      {scene.benefits}
                    </p>
                  )}
                  <p>
                    <span className="font-semibold">Visuals:</span>{" "}
                    {scene.visuals}
                  </p>
                  <p>
                    <span className="font-semibold">Audio:</span> {scene.audio}
                  </p>
                  <p>
                    <span className="font-semibold">Duration:</span>{" "}
                    {scene.duration} seconds
                  </p>
                  {scene.call_to_action && (
                    <p>
                      <span className="font-semibold">Call to Action:</span>{" "}
                      {scene.call_to_action}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p>{videoScript.toString()}</p>
            )}
          </div>
        </div>
      )}

      {imagePrompts.length > 0 && (
        <div className="mt-8 w-full max-w-4xl">
          <h3 className={title({ size: "sm" })}>Image Prompts:</h3>
          <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <ul className="list-disc list-inside text-gray-700">
              {imagePrompts.map((prompt, index) => (
                <li key={index}>{prompt}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
