"use client";

import React, { useState } from "react";
import Image from "next/image";
import map from "@/public/Lageplan03.png";
import { useLevel } from "../context/LevelContext";
import { usePlayer } from "../context/PlayerContext";

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
  const [markerPosition, setMarkerPosition] = useState<MarkerPosition>({
    x: 0,
    y: 0,
    visible: false,
  });
  const [firstClick, setFirstClick] = useState(false);
  const {
    currentLevel,
    images,
    setDistance,
    setLevelCompleted,
    setLevelScore,
  } = useLevel();
  const { setScore } = usePlayer();

  // Function to update the coordinates in the global context
  function updateCoordinates(newX: number, newY: number) {
    setMarkerPosition({ x: newX, y: newY, visible: true });
  }

  // Function to calculate consistent coordinates across different screen sizes
  const calculateConsistentCoordinates = (
    x: number,
    y: number,
    bounds: DOMRect
  ) => {
    // Map's original size
    const originalWidth = 1920;
    const originalHeight = 1080;

    // Calculate consistent coordinates based on the map's original dimensions
    const consistentX = (x / bounds.width) * originalWidth;
    const consistentY = (y / bounds.height) * originalHeight;

    return { x: consistentX, y: consistentY };
  };

  // Handler for map clicks to set the marker position
  {
    /* Get the bounding box of the map (bounds).
Calculate the clicked coordinates relative to the bounding box.
Convert these coordinates to consistent coordinates using calculateConsistentCoordinates.
Update the marker position state. */
  }
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
  };

  const currentImage = images[currentLevel];

  const validateGuess = () => {
    if (!currentImage) return;
    console.log(
      "image coordinates :" + currentImage.x_coord + " " + currentImage.y_coord
    );
    console.log(
      "user coordinates :" + markerPosition.x + " " + markerPosition.y
    );
    const { x_coord, y_coord } = currentImage;
    const distance = calculateDistance(
      markerPosition.x,
      markerPosition.y,
      x_coord,
      y_coord
    );

    setDistance(distance);

    // Calculate score based on distance
    const score = calculateScore(distance);
    console.log(score);
    setScore((previousScore) => previousScore + score);
    setLevelScore(score);
    setLevelCompleted(true);
    setFirstClick(false);
  };

  {
    /* Calculate the difference in x (dx) and y (dy) coordinates.
Compute the Euclidean distance in pixels.
Convert the distance from pixels to meters using a pixelToMeterRatio*/
  }
  const calculateDistance = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): number => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distanceInPixels = Math.sqrt(dx * dx + dy * dy);

    // Adjust the pixel to meter ratio based on map scaling
    const pixelToMeterRatio = 1 / 10;
    return distanceInPixels * pixelToMeterRatio;
  };

  const calculateScore = (distance: number): number => {
    const maxScore = 100;
    const fullScoreDistance = 1;
    const score =
      distance <= fullScoreDistance
        ? maxScore
        : Math.floor(
            Math.max(0, maxScore - (distance - fullScoreDistance) * 10)
          );
    return score;
  };

  return (
    <div className="relative w-full h-full">
      {/* Show the "Guess!" button only after the first marker placement */}
      {firstClick && (
        <button
          onClick={validateGuess}
          className="absolute bottom-0 w-full bg-green-500 text-white px-4 py-2 rounded z-30"
        >
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
            left: `${((markerPosition.x - 5) / 1920) * 100}%`, // Offset slightly for centering
            top: `${((markerPosition.y - 5) / 1080) * 100}%`,
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
