// components/CanvasOverlay.tsx

import React, { useRef, useEffect, useState } from "react";

import "./style.css";
import { Image, Radio } from "antd";
import { url } from "inspector";

interface CanvasOverlayProps {
  imageUrl: string;
  width: number;
}

const CanvasOverlay: React.FC<CanvasOverlayProps> = ({
  imageUrl,
  width,
  height,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (context && canvas) {
      // Get mouse coordinates relative to the canvas
      const mouseX = event.nativeEvent.offsetX;
      const mouseY = event.nativeEvent.offsetY;
      context.clearRect(0, 0, canvas.width, canvas.height);
      // Draw a point at the clicked position
      const pointSize = 2;

      context.fillStyle = "red"; // Change the color if needed
      context.beginPath();
      //   alert(`${mouseX},${mouseY}`);
      context.arc(mouseX, mouseY, pointSize, 0, 2 * Math.PI);
      context.fill();
    }
  };

  return (
    <div className="m-2">
      <canvas
        ref={canvasRef}
        className="mt-2"
        onClick={handleCanvasClick}
        height={350}
        width={140}
        style={{
          position: "absolute",
          objectFit: "fill",
          left: 0,
          top: 220,
          zIndex: 1,
        }}
      />
      <div
        ref={overlayRef}
        className="flex flex-col m-2 rounded-lg"
        style={{
          position: "relative",
          top: 150,
          width: 126,
          height: 350,
          pointerEvents: "none",
        }}
      >
        <div className="flex flex-1 w-[20px] bg-black z-10   left-[70px] opacity-15  align-middle justify-center absolute border border-black border-1 h-[340px]"></div>
        <div className="w-full h-10 bg-[#FFF5C1] items-end flex justify-end p-2 border border-black border-b-1 border-t-0 border-r-0 border-l-0">
          <p className="text-left text-xs font-light">Yorker (2M)</p>
        </div>
        <div className="w-full h-14 bg-[#9CFFF6] items-end flex justify-end p-2">
          <p className="text-right text-xs font-light">Full (4M)</p>
        </div>
        <div className="w-full h-28 bg-[#CED1FF] items-end flex justify-end p-2 border border-black border-b-1 border-t-0 border-r-0 border-l-0">
          <p className="text-left text-xs font-light ">Good (8M)</p>
        </div>
        <div className="w-full h-16 bg-[#CED1FF] items-end flex justify-end p-2">
          <p className="text-left text-xs font-light">Good (8M)</p>
        </div>
        <div className="w-full h-52 bg-[#FCC7C7] items-end flex justify-end p-2">
          <p className="text-left text-xs font-light">Short</p>
        </div>
      </div>
      <Radio.Group
        style={{ top: 615, position: "absolute", marginLeft: 8 }}
        optionType="button"
        size="small"
        buttonStyle={"solid"}
        options={[
          {
            label: "WD",
            value: "wide",
          },
          {
            label: "NB",
            value: "noBall",
          },
          {
            label: "LB",
            value: "legBye",
          },
          {
            label: "B",
            value: "bye",
          },
        ]}
      />
    </div>
  );
};

export default CanvasOverlay;
