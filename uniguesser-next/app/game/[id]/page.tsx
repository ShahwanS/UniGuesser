// pages/game/[id].tsx
"use client"; // This import is required to use the `client` object

import React, { useEffect, useState } from "react";
import Map from "@/app/components/Map";
import Link from "next/link";
import ReactPannellum from "react-pannellum";
import { useLevel } from "@/app/context/LevelContext";
import { usePlayer } from "@/app/context/PlayerContext";

export const dynamic = "force-dynamic"; // Forces Next.js to treat this page as a dynamic page

const GamePage = ({ params }: { params: { id: string } }) => {
  const {
    currentLevel,
    images,
    setImages,
    distance,
    setCurrentLevel,
    levelCompleted,
    setLevelCompleted,
    levelScore,
  } = useLevel(); // Use the game context to manage state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { score, username } = usePlayer();
  console.log(username);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/levels", {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setImages(data.images);
      } catch (error) {
        console.error("Failed to fetch images:", error);
        setError("Failed to load images"); // Set error message if fetching fails
      } finally {
        setLoading(false); // Set loading to false after fetch attempt
      }
    };

    fetchImages();
  }, [setImages]); // Dependency array includes setImages to refetch images if it changes

  if (loading) return <p>Loading...</p>; // Display loading message
  if (error) return <p>Error: {error}</p>; // Display error message

  const currentImage = images[currentLevel]; // Get the current image based on the current level

  // Function to advance to the next level
  const nextLevel = () => {
    setCurrentLevel((prevLevel) => {
      if (prevLevel < images.length - 1) {
        return prevLevel + 1; // Advance to the next level if not the last one
      }
      return prevLevel; // Stay on the current level if it is the last one
    });
    setLevelCompleted(false); // Reset the level completion status
  };

  const handleGameEnd = async () => {
    try {
      const response = await fetch("/api/sendScore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: params.id,
          username: username,
          score: score,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update score");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }

    // Redirect to the leaderboard page after updating the score
    window.location.href = "/";
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
      {currentImage && (
        <ReactPannellum
          key={currentLevel} // Add key to force re-render when level changes
          id="1"
          sceneId="firstScene"
          imageSource={currentImage.image_path}
          config={{
            autoLoad: true,
            showControls: true,
          }}
          style={{
            width: "100vw",
            height: "100vh",
          }}
        />
      )}
      {/* Map component for making guesses */}
      <div className="absolute bottom-4 right-4 w-[350px] h-[350px] sm:w-[250px] sm:h-[250px] md:w-[350px] md:h-[350px] sm:hover:w-[600px] sm:hover:h-[600px] z-20 transition-all duration-300 ease-in-out">
        <Map />
      </div>

      {levelCompleted && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-11/12 max-w-lg text-black">
            <h2 className="text-2xl font-bold mb-4">Level Completed!</h2>
            <p className="text-lg mb-2">
              Distance to target: {distance?.toFixed(2)} meters
            </p>
            <p className="text-lg mb-2">score : {levelScore}</p>
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
