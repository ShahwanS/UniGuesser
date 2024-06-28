// context/LevelContext.tsx
"use client";
import React, { createContext, useContext, useState } from "react";

interface ImageData {
  image_path: string;
  x_coord: number;
  y_coord: number;
}

interface LevelState {
  images: ImageData[];
  setImages: React.Dispatch<React.SetStateAction<ImageData[]>>; // Function to set the images array
  distance: number | null;
  setDistance: React.Dispatch<React.SetStateAction<number | null>>;
  levelCompleted: boolean;
  setLevelCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  levelScore: number;
  setLevelScore: React.Dispatch<React.SetStateAction<number>>;
}

const LevelContext = createContext<LevelState | undefined>(undefined);

export const LevelProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [images, setImages] = useState<ImageData[]>([]); // State for the images array
  const [distance, setDistance] = useState<number | null>(null);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const [levelScore, setLevelScore] = useState(0);

  return (
    <LevelContext.Provider
      value={{
        images,
        setImages,
        distance,
        setDistance,
        levelCompleted,
        setLevelCompleted,
        levelScore,
        setLevelScore,
      }}
    >
      {children} {/* Provide the Level state to children components */}
    </LevelContext.Provider>
  );
};

export const useLevel = () => {
  const context = useContext(LevelContext);
  if (!context) {
    throw new Error("useLevel must be used within a LevelProvider"); // Throw an error if used outside a LevelProvider
  }
  return context; // Return the Level state context
};
