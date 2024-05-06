"use client";

import React, { useState } from "react";
import Image from "next/image";
import map from "@/public/Lageplan03.png";

// Define types for the coordinates and marker position
interface Coordinate {
  x: number;
  y: number;
}

interface MarkerPosition extends Coordinate {
  visible: boolean;
}

//images and their coordinates
const images = [
  {
    id: 1,
    src: "/IMG_20240506_111102_00_001.jpg",
    coordinates: {
      pitch: 14.1,
      yaw: 3.77,
    },
  },
  {
    id: 2,
    src: "/IMG_20240506_111102_00_002.jpg",
    coordinates: {
      pitch: 14.1,
      yaw: 3.77,
    },
  },
  {
    id: 3,
    src: "/IMG_20240506_111102_00_003.jpg",
    coordinates: {
      pitch: 14.1,
      yaw: 3.77,
    },
  },
  {
    id: 4,
    src: "/IMG_20240506_111102_00_004.jpg",
    coordinates: {
      pitch: 14.1,
      yaw: 3.77,
    },
  },
  {
    id: 5,
    src: "/IMG_20240506_111102_00_005.jpg",
    coordinates: {
      pitch: 14.1,
      yaw: 3.77,
    },
  },
  {
    id: 6,
    src: "/IMG_20240506_111102_00_006.jpg",
    coordinates: {
      pitch: 14.1,
      yaw: 3.77,
    },
  },
  {
    id: 7,
    src: "/IMG_20240506_111102_00_007.jpg",
    coordinates: {
      pitch: 14.1,
      yaw: 3.77,
    },
  },
  {
    id: 8,
    src: "/IMG_20240506_111102_00_008.jpg",
    coordinates: {
      pitch: 14.1,
      yaw: 3.77,
    },
  },
  {
    id: 9,
    src: "/IMG_20240506_111102_00_009.jpg",
    coordinates: {
      pitch: 14.1,
      yaw: 3.77,
    },
  },
  {
    id: 10,
    src: "/IMG_20240506_111102_00_010.jpg",
    coordinates: {
      pitch: 14.1,
      yaw: 3.77,
    },
  },
  {
    id: 11,
    src: "/IMG_20240506_111102_00_011.jpg",
    coordinates: {
      pitch: 14.1,
      yaw: 3.77,
    },
  },
  {
    id: 12,
    src: "/IMG_20240506_111102_00_012.jpg",
    coordinates: {
      pitch: 14.1,
      yaw: 3.77,
    },
  },
  {
    id: 13,
    src: "/IMG_20240506_111102_00_013.jpg",
    coordinates: {
      pitch: 14.1,
      yaw: 3.77,
    },
  },
  {
    id: 14,
    src: "/IMG_20240506_111102_00_014.jpg",
    coordinates: {
      pitch: 14.1,
      yaw: 3.77,
    },
  },
  {
    id: 15,
    src: "/IMG_20240506_111102_00_015.jpg",
    coordinates: {
      pitch: 14.1,
      yaw: 3.77,
    },
  },
];

// The Map component handles displaying an interactive map and marker placement
const Map: React.FC = () => {
  // State for the marker position and visibility
  const [markerPosition, setMarkerPosition] = useState<MarkerPosition>({
    x: 0,
    y: 0,
    visible: false,
  });

  // State to manage if the first click has occurred in order to show the "Guess" button
  const [firstClick, setFirstClick] = useState(false);

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

  // this method is to have the dot follow on hover but the positioning is currently incorrect
  //   const handleMouseMove = (
  //     event: React.MouseEvent<HTMLDivElement, MouseEvent>
  //   ) => {
  //     if (firstClick) return; // Do not update the marker on mouse move after the first click

  //     const bounds = event.currentTarget.getBoundingClientRect();
  //     const x = event.clientX - bounds.left;
  //     const y = event.clientY - bounds.top;

  //     setMarkerPosition({ x, y, visible: true });
  //   };

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
