"use client";

import React, { useState } from "react";
import Image from "next/image";
import map from "@/public/Lageplan03.png";
import { useGlobalCoordinates } from "../context/GlobalCoordinatesContext";
// Define types for the coordinates and marker position
interface Coordinate {
  x: number;
  y: number;
}

interface MarkerPosition extends Coordinate {
  visible: boolean;
}

// The Map component handles displaying an interactive map and marker placement
const Map: React.FC = () => {
  // State for the marker position and visibility
  const [markerPosition, setMarkerPosition] = useState<MarkerPosition>({
    x: 0,
    y: 0,
    visible: false,
  });
  const { coordinates, setCoordinates } = useGlobalCoordinates();
  const [firstClick, setFirstClick] = useState(false);
  function updateCoordinates(newX: number, newY: number) {
    setCoordinates({ x: newX, y: newY });
  }

  // Function to calculate consistent coordinates across different screen sizes
  const calculateConsistentCoordinates = (
    x: number,
    y: number,
    bounds: DOMRect
  ) => {
    // Image original size
    const originalWidth = 1920;
    const originalHeight = 1080;

    // Calculate consistent coordinates based on the image's original dimensions
    const consistentX = (x / bounds.width) * originalWidth;
    const consistentY = (y / bounds.height) * originalHeight;

    return { x: consistentX, y: consistentY };
  };

  // Handler for map clicks to set the marker position
  const handleMapClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    // Calculate consistent coordinates and update the marker position
    const { x: consistentX, y: consistentY } = calculateConsistentCoordinates(
      x,
      y,
      bounds
    );
    setMarkerPosition({ x: consistentX, y: consistentY, visible: true });
    updateCoordinates(consistentX, consistentY);
    setFirstClick(true);

    console.log(`Clicked coordinates: X: ${consistentX}, Y: ${consistentY}`);
  };

  return (
    <div className="relative w-full h-full">
      {/* Show the "Guess!" button only after the first marker placement */}
      {firstClick && (
        <button className="absolute bottom-0 w-full bg-green-500 text-white px-4 py-2 rounded z-30">
          Guess!
        </button>
      )}

      {/* The map image where users can click to place a marker */}
      <Image
        src={map}
        alt="Campus Map"
        layout="fill"
        objectFit="cover"
        className="select-none cursor-pointer object-contain h-full w-full pb-10"
        onClick={handleMapClick}
      />

      {/* The marker indicating the guessed location */}
      {markerPosition.visible && (
        <div
          style={{
            position: "absolute",
            left: `${((markerPosition.x - 20) / 1920) * 100}%`, // Offset slightly for centering
            top: `${((markerPosition.y - 10) / 1080) * 100}%`,
            width: "10px",
            height: "10px",
            backgroundColor: "red",
            borderRadius: "50%",
          }}
        />
      )}
    </div>
  );
};

export default Map;
