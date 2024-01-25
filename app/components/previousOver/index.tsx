import { useAppSelector } from "@/redux/store";
import React, { useEffect } from "react";

const PreviousOver = () => {
  const scoreBallByBallData = useAppSelector(
    (state) => state.scoreBallByBallSlice
  );
  useEffect(() => {
    // This function will be called whenever scoreBallByBallData changes
    // You can perform any update logic here
    console.log("Redux state has been updated:", scoreBallByBallData);
  }, [scoreBallByBallData]);
  return (
    <div key="previous-over-dev">
      <div key="previous-over-container" className="flex flex-row gap-2">
        <code
          key="previous-over"
          className="flex-2 font-extralight text-xs justify-center items-center text-center mt-1"
        >
          {" "}
          Prev Ov.
        </code>
        {scoreBallByBallData.fullScore?.previousOver?.map((ball) => {
          return (
            <code
              key={`${ball.currentTimeStamp}-${ball.run}`}
              className="rounded-full bg-slate-300 w-6 h-6 text-center items-center justify-center flex"
            >
              {ball.run}
            </code>
          );
        })}
      </div>
    </div>
  );
};

export default PreviousOver;
