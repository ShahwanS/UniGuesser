"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { usePlayer } from "../context/PlayerContext";

export default function Registration() {
  const router = useRouter(); // Hook to navigate programmatically
  const [loading, setLoading] = useState(false); // State for loading status
  const [error, setError] = useState(""); // State for error messages
  const { setUsername, setUserID } = usePlayer();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    setLoading(true); // Set loading to true while processing
    setError(""); // Reset any previous errors

    try {
      const response = await fetch("/api/register", {
        method: "POST", // Use POST method to register the user
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
        body: JSON.stringify({
          username: event.currentTarget.username.value, // Get username from form input
        }),
      });

      const result = await response.json(); // Parse JSON response

      if (!response.ok) {
        setError(result.error || "Failed to register"); // Set error message if registration fails
      } else {
        setUsername(result[0].username); // Set the username in the context
        setUserID(result[0].id); // Set the user ID in the context
        router.push(`/game/${result[0].id}`); // Navigate to the game page
      }
    } catch (error) {
      console.error("Fetch error:", error); // Log any fetch errors
      setError("Network error, please try again later."); // Set error message for network issues
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Username input field */}
      <div>
        <label
          htmlFor="username"
          className="block text-gray-700 text-lg font-medium text-center"
        >
          Enter Username:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
        />
      </div>
      {/* Loading message */}
      {loading && (
        <div className="text-center">
          <p className="text-lg text-gray-800">Loading...</p>
        </div>
      )}
      {/* Error message */}
      {error && (
        <div className="text-center text-red-600">
          <p className="text-lg">{error}</p>
        </div>
      )}
      {/* Submit button */}
      <button
        type="submit"
        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-semibold text-lg transition-colors"
        disabled={loading} // Disable button while loading
      >
        Start Guessing
      </button>
    </form>
  );
}
