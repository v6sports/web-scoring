import React from "react";
import Image from "next/image";
import ImageWithPoint from "../ImageWithPoints";

const PitchMap = () => {
  return (
    <div className="flex flex-1">
      <ImageWithPoint
        imageUrl="https://projectasset.s3.ap-south-1.amazonaws.com/pitchMap.svg"
        width={200}

      />
    </div>
  );
};

export default PitchMap;
