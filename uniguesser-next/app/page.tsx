import Image from "next/image";
import mainImage from "@/public/MarburgLahnbergeMehrzweckgebaeude.jpg";
import Registration from "./components/registration";

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-gray-900">
      {/* Background image covering the entire screen with low opacity */}
      <Image
        src={mainImage} // Source of the background image
        alt="University building" // Alt text for the image
        layout="fill" // Fill the entire container
        objectFit="cover" // Ensure the image covers the container without distortion
        className="opacity-40 z-0" // Styling: set opacity and z-index
        priority // Load this image with high priority
      />
      {/* Overlay div to darken the background and center the content */}
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-4 z-10">
        {/* Container for the main content */}
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-lg space-y-6">
          {/* Main heading */}
          <h1 className="text-center text-4xl font-extrabold text-indigo-800">
            UniGuesser
          </h1>
          {/* Subheading */}
          <p className="text-center text-lg text-gray-800">
            Test your knowledge of your university&apos;s buildings.
          </p>
          {/* Horizontal line */}
          <hr className="border-t border-gray-300" />
          {/* Section heading */}
          <h2 className="text-center text-2xl text-indigo-700 font-bold">
            How it Works
          </h2>
          {/* Instructions list */}
          <ul className="list-disc pl-10 pr-10 space-y-2 text-lg text-black text-left">
            <li>View a random university building image.</li>
            <li>Guess the location on the map.</li>
            <li>Earn points based on accuracy.</li>
            <li>Compete on the leaderboard.</li>
          </ul>
          {/* Horizontal line */}
          <hr className="border-t border-gray-300" />
          {/* Registration component */}
          <Registration />
        </div>
      </div>
    </main>
  );
}
