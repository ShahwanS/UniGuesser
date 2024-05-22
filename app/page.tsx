import Image from "next/image";
import mainImage from "@/public/MarburgLahnbergeMehrzweckgebaeude.jpg";
import Registration from "./components/registration";
import Leaderboard from "./components/Leaderboard";

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-gray-900">
      <Image
        src={mainImage}
        alt="University building"
        layout="fill"
        objectFit="cover"
        className="opacity-50 z-0"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-10">
        <div className="bg-white backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-6xl w-full space-y-8 lg:space-y-0 lg:space-x-8 lg:grid lg:grid-cols-2">
          <div className="space-y-8 lg:col-span-1">
            <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700 text-center lg:text-left">
              UniGuesser
            </h1>
            <p className="text-base md:text-lg text-gray-700 text-center lg:text-left">
              Test your knowledge of your university&apos;s buildings.
            </p>
            <hr className="border-gray-300" />
            <h2 className="text-xl md:text-2xl font-bold text-indigo-600 text-center lg:text-left">
              How it Works
            </h2>
            <ul className="list-disc pl-8 space-y-2 text-base md:text-lg text-gray-800">
              <li>View a random university building image.</li>
              <li>Guess the location on the map.</li>
              <li>Earn points based on accuracy.</li>
              <li>Compete on the leaderboard.</li>
            </ul>
            <hr className="border-gray-300" />
            <Registration />
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-inner lg:col-span-1">
            <Leaderboard />
          </div>
        </div>
      </div>
    </main>
  );
}
