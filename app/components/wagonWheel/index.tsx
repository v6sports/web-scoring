// components/WagonWheel.tsx

import React, { useRef, useEffect, useState } from "react";

// import "./style.css";

interface WagonWheelProps {
  width: number;
  height: number;
}

const WagonWheel: React.FC<WagonWheelProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState<{
    width: number;
    height: number;
  }>({ width: 400, height: 140 });

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (context && canvas) {
      // Get mouse coordinates relative to the canvas
      const mouseX = event.nativeEvent.offsetX;
      const mouseY = event.nativeEvent.offsetY;
      // get center of the div
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      // Set line properties
      context.strokeStyle = "blue"; // Set line color
      context.lineWidth = 2; // Set line width

      context.clearRect(0, 0, canvas.width, canvas.height);
      // Draw a point at the clicked position

      //   alert(`${mouseX},${mouseY}`);
      context.beginPath();
      context.moveTo(centerX, centerY);
      context.lineTo(mouseX, mouseY); // Adjust the length as needed
      context.stroke();

      // Clean up
      context.closePath();
      context.fill();
    }
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        className="mt-2 rounded-full"
        onClick={handleCanvasClick}
        height={150}
        width={150}
        style={{
          position: "absolute",
          backgroundColor: "#79fb00c2",
          objectFit: "cover",
          left: 10,
          zIndex: 1,
        }}
      />
    </div>
  );
};

export default WagonWheel;
