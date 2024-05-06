"use client";

import Image from "next/image";
import map from "@/public/Lageplan03.png";
import dynamic from "next/dynamic";
import React from "react";
import { config } from "process";
import Map from "@/app/components/Map";

// Dynamically import ReactPannellum with SSR disabled
const ReactPannellum = dynamic(() => import("react-pannellum"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
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

      {/* Map Component  */}
      <div className="absolute bottom-4 right-4 w-[350px] h-[350px] sm:w-[250px] sm:h-[250px] md:w-[350px] md:h-[350px] sm:hover:w-[600px] sm:hover:h-[600px] z-20 transition-all duration-300 ease-in-out">
        <Map />
      </div>
    </div>
  );
}
