// components/LazyImage.tsx
import React from "react";
import ReactPannellum from "react-pannellum";

interface LazyImageProps {
  src: string;
  currentLevel: number;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, currentLevel }) => {
  return (
    <ReactPannellum
      key={currentLevel}
      id="1"
      sceneId="firstScene"
      imageSource={src}
      config={{
        autoLoad: true,
        showControls: true,
      }}
      style={{
        width: "100vw",
        height: "100vh",
      }}
    />
  );
};

export default LazyImage;
