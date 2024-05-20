"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface Player {
  score: number;
  setScore: Dispatch<SetStateAction<number>>;
  username: string | null;
  setUsername: Dispatch<SetStateAction<string | null>>;
  userID: string | null;
  setUserID: Dispatch<SetStateAction<string | null>>;
  completedLevels: number;
  setCompletedLevels: Dispatch<SetStateAction<number>>;
}

const PlayerContext = createContext<Player | undefined>(undefined);

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [score, setScore] = useState<number>(0);
  const [username, setUsername] = useState<string | null>(null);
  const [completedLevels, setCompletedLevels] = useState<number>(0);
  const [userID, setUserID] = useState<string | null>(null);

  return (
    <PlayerContext.Provider
      value={{
        username,
        setUsername,
        userID,
        setUserID,
        score,
        setScore,
        completedLevels,
        setCompletedLevels,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
