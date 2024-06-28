// pages/game/[id].tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Map from "@/app/components/Map";
import Link from "next/link";
import { useLevel } from "@/app/context/LevelContext";
import { usePlayer } from "@/app/context/PlayerContext";
import dynamic from "next/dynamic";
import { updateScore } from "@/app/actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ViewerAPI } from "react-photo-sphere-viewer";
const ReactPhotoSphereViewer = dynamic(
  () =>
    import("react-photo-sphere-viewer").then(
      (mod) => mod.ReactPhotoSphereViewer
    ),
  {
    ssr: false,
  }
);
const GamePage = ({ params }: { params: { id: string; image: string } }) => {
  const {
    currentLevel,
    setCurrentLevel,
    images,
    distance,
    levelCompleted,
    setLevelCompleted,
    levelScore,
  } = useLevel();
  const router = useRouter();
  const { score, username } = usePlayer();
  const [isMapVisible, setIsMapVisible] = useState(false);
  // const [currentImage, setCurrentImage] = useState<string | null>(
  //   images[0]?.image_path
  // );
  const image = images.find((img) => img.x_coord === parseInt(params.image));
  const pSRef = useRef<ViewerAPI | null>(null);

  if (!username) {
    router.push("/");
  }

  useEffect(() => {
    // setCurrentImage(images[currentLevel]?.image_path);
    //get the image-x-coordinates from the url with params.image and find the image path that matches

    router.push(`/game/${params.id}/${images[currentLevel]?.x_coord}`);
  }, [currentLevel, images, params.id, router]);

  useEffect(() => {
    if (pSRef.current) {
      pSRef.current.destroy();
      console.log("destroyed");
    }
  }, [currentLevel]);

  // Function to advance to the next level
  const nextLevel = () => {
    setCurrentLevel((prevLevel) =>
      prevLevel < images.length - 1 ? prevLevel + 1 : prevLevel
    );
    // setCurrentImage(null);
    toggleMapVisibility();
    setLevelCompleted(false);
  };

  const handleGameEnd = async () => {
    const result = await updateScore({
      userId: params.id,
      score: score,
      username: username,
    });
    if (result.error) {
      toast.error("Error updating score:" + result.error);
      return;
    }
    router.push("/");
  };

  const toggleMapVisibility = () => {
    setIsMapVisible(!isMapVisible);
  };

  return (
    <div className="relative w-full h-screen flex justify-center items-center">
      <div className="absolute top-0 right-0 z-10 p-10 space-y-4">
        <div className="bg-gray-800 rounded-lg p-4 space-y-5">
          <p className="text-white text-lg">Total Score: {score}</p>
          <p className="text-white text-lg">Level: {currentLevel + 1}</p>
          <Link
            href="/"
            className="bg-gray-700 px-3 py-2 rounded-full text-white block text-center mt-4"
          >
            Exit game
          </Link>
        </div>
      </div>
      {/* Display the current level's 360° image */}
      {image && (
        <ReactPhotoSphereViewer
          ref={pSRef}
          src={image.image_path}
          height={"100vh"}
          width={"100%"}
        ></ReactPhotoSphereViewer>
      )}
      <div
        className={`absolute bottom-50 md:bottom-10 right-10 w-[350px] h-[350px] sm:w-[250px] sm:h-[250px] md:w-[350px] md:h-[350px] sm:hover:w-[600px] sm:hover:h-[600px] z-20 transition-all duration-300 ease-in-out ${
          isMapVisible ? "block" : "hidden"
        } sm:block`}
      >
        <Map />
      </div>
      <button
        onClick={toggleMapVisibility}
        className="w-full fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-3 rounded-md z-30 sm:hidden text-lg"
      >
        {isMapVisible ? "Hide Map" : "Show Map"}
      </button>

      {levelCompleted && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-11/12 max-w-lg text-black">
            <h2 className="text-2xl font-bold mb-4">Level Completed!</h2>
            <p className="text-lg mb-2">
              Distance to target: {distance?.toFixed(2)} meters
            </p>
            <p className="text-lg mb-2">Score: {levelScore}</p>
            <div className="w-full bg-gray-300 rounded-full h-6 mb-4">
              <div
                className="bg-blue-600 h-6 rounded-full"
                style={{ width: `${levelScore}%` }}
              ></div>
            </div>
            <div className="flex justify-around mt-4">
              {currentLevel < images.length - 1 && (
                <button
                  onClick={() => nextLevel()}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Next Level
                </button>
              )}
              <button
                onClick={handleGameEnd}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Finish Playing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePage;
