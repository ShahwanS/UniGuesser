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
  });

  return (
    <GlobalCoordinatesContext.Provider value={{ coordinates, setCoordinates }}>
      {children}
    </GlobalCoordinatesContext.Provider>
  );
};
