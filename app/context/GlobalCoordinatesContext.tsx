"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface Coordiantes {
  x: number | null;
  y: number | null;
}

interface GlobalCoordinatesContextType {
  coordinates: Coordiantes;
  setCoordinates: Dispatch<SetStateAction<Coordiantes>>;
  distance: number | null;
  setDistance: Dispatch<SetStateAction<number | null>>;
}

const GlobalCoordinatesContext = createContext<
  GlobalCoordinatesContextType | undefined
>(undefined);

export const useGlobalCoordinates = () => {
  const context = useContext(GlobalCoordinatesContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};

export const GlobalCoordinatesProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [coordinates, setCoordinates] = useState<Coordiantes>({
    x: null,
    y: null,
  }); // State for the global coordinates to enable verification of the guesses
  const [distance, setDistance] = useState<number | null>(null);

  return (
    <GlobalCoordinatesContext.Provider
      value={{ coordinates, setCoordinates, distance, setDistance }}
    >
      {children}
    </GlobalCoordinatesContext.Provider>
  );
};