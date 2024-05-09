"use client";

import dynamic from "next/dynamic";
import React from "react";
import Map from "../components/Map";
import Link from "next/link";
//todo: implement dynamic routing
//todo: usern will be displayed with the fetched image annd the map
//todo: when the user clicks on guess, he will be shown the

// Dynamically import ReactPannellum with SSR disabled
const ReactPannellum = dynamic(() => import("react-pannellum"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export default function page() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute top-0 right-0 z-10 p-10">
        <Link href="/" className="bg-gray-700 px-3 py-5 rounded-full">
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
