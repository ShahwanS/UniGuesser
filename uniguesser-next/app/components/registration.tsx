"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
export default function Registration() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: event.currentTarget.username.value,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Failed to register");
      } else {
        console.log(result[0].id);
        router.push(`/game/${result[0].id}`);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Network error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
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
      {loading && (
        <div className="text-center">
          <p className="text-lg text-gray-800">Loading...</p>
        </div>
      )}
      {error && (
        <div className="text-center text-red-600">
          <p className="text-lg">{error}</p>
        </div>
      )}
      <button
        type="submit"
        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-semibold text-lg transition-colors"
        disabled={loading}
      >
        Start Guessing
      </button>
    </form>
  );
}
