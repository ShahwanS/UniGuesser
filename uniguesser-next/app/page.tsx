import Image from "next/image";
import mainImage from "@/public/MarburgLahnbergeMehrzweckgebaeude.jpg";
import Registration from "./components/registration";
export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-gray-900">
      <Image
        src={mainImage}
        alt="University building"
        layout="fill"
        objectFit="cover"
        className="opacity-40 z-0"
        priority
      />
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-4 z-10">
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-lg space-y-6">
          <h1 className="text-center text-4xl font-extrabold text-indigo-800">
            UniGuesser
          </h1>
          <p className="text-center text-lg text-gray-800">
            Test your knowledge of your university&apos;s buildings.
          </p>
          <hr className="border-t border-gray-300" />
          <h2 className="text-center text-2xl text-indigo-700 font-bold">
            How it Works
          </h2>
          <ul className="list-disc  pl-10 pr-10 space-y-2 text-lg text-black text-left">
            <li>View a random university building image.</li>
            <li>Guess the location on the map.</li>
            <li>Earn points based on accuracy.</li>
            <li>Compete on the leaderboard.</li>
          </ul>
          <hr className="border-t border-gray-300" />
          <Registration />
        </div>
      </div>
    </main>
  );
}
