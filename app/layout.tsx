import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { LevelProvider } from "./context/LevelContext";
import { PlayerProvider } from "./context/PlayerContext";
import { ToastProvider } from "@/app/components/providers/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UniGuesser",
  description:
    "Test your knowledge by guessing university campuses from around the world. Explore photos, clues, and challenge yourself in this fun, educational game!",
  openGraph: {
    title: "UniGuesser",
    description:
      "Test your knowledge by guessing university campuses from around the world. Explore photos, clues, and challenge yourself in this fun, educational game!",
    type: "website",
    url: "https://www.uniguesser.com",
    images: [
      {
        url: "https://kwphjqoddaujvahppwmj.supabase.co/storage/v1/object/public/images/Screenshot%202024-05-22%20124412.png",
        width: 1200,
        height: 630,
        alt: "UniGuesser",
      },
    ],
  },
  twitter: {
    images: [
      {
        url: "https://kwphjqoddaujvahppwmj.supabase.co/storage/v1/object/public/images/Screenshot%202024-05-22%20124412.png",
        alt: "UniGuesser",
      },
    ],
    card: "summary_large_image",
    title: "UniGuesser",
    description:
      "Test your knowledge by guessing university campuses from around the world. Explore photos, clues, and challenge yourself in this fun, educational game!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta property="og:title" content="UniGuesser" />
        <meta
          property="og:description"
          content="Test your knowledge by guessing university campuses from around the world. Explore photos, clues, and challenge yourself in this fun, educational game!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.uniguesser.com" />
        <meta
          property="og:image"
          content="https://www.uniguesser.com/og-image.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="UniGuesser" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="UniGuesser" />
        <meta
          name="twitter:description"
          content="Test your knowledge by guessing university campuses from around the world. Explore photos, clues, and challenge yourself in this fun, educational game!"
        />
        <meta
          name="twitter:image"
          content="https://www.uniguesser.com/twitter-image.jpg"
        />
        <meta name="twitter:image:alt" content="UniGuesser" />
      </head>
      <body className={inter.className}>
        <LevelProvider>
          <PlayerProvider>
            <ToastProvider />
            <main>{children}</main>
          </PlayerProvider>
        </LevelProvider>
        <Script
        async
        src={process.env.UMAMI_SCRIPT_URL}
        data-website-id={process.env.UMAMI_DATA_WEBSITE_ID}
      />
      </body>
    </html>
  );
}
