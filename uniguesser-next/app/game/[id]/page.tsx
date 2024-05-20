"use client";

import React, { useEffect, useState } from "react";
import Map from "@/app/components/Map";
import Link from "next/link";
import ReactPannellum from "react-pannellum";

export const dynamic = "force-dynamic";

export default function Page({ params }: { params: { id: string } }) {
  const [image, setImage] = useState<ImageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch("/api/randomImage", {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache", // Forces the request to bypass the cache
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setImage(data);
      } catch (error) {
        console.error("Failed to fetch image:", error);
        setError("Failed to load image");
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute top-0 right-0 z-10 p-10">
        <Link href="/" className="bg-gray-700 px-3 py-5 rounded-full">
          game id : {params.id}
          Exit game
        </Link>
      </div>
      {/* Fullscreen Pannellum Viewer */}
      <ReactPannellum
        id="1"
        sceneId="firstScene"
        imageSource="/IMG_20240506_111102_00_001.jpg"
        config={{
          autoLoad: true,
          showControls: true,
        }}
        style={{
          width: "100vw",
          height: "100vh",
        }}
      />
      <div className="absolute bottom-4 right-4 w-[350px] h-[350px] sm:w-[250px] sm:h-[250px] md:w-[350px] md:h-[350px] sm:hover:w-[600px] sm:hover:h-[600px] z-20 transition-all duration-300 ease-in-out">
        <Map />
      </div>
    </div>
  );
}
