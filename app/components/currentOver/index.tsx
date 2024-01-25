import { useAppSelector } from "@/redux/store";
import React, { useEffect } from "react";

const CurrentOver = () => {
  const scoreBallByBallData = useAppSelector(
    (state) => state.scoreBallByBallSlice
  );
	useEffect(() => {
    // This function will be called whenever scoreBallByBallData changes
    // You can perform any update logic here
    console.log("Redux state has been updated:", scoreBallByBallData);
  }, [scoreBallByBallData]);
  return (
    <div key="Current-over-div">
      <div key="Current-over-container" className="flex flex-row gap-2">
        <code
          key="Current-over"
          className="flex-2 font-extralight text-xs justify-center items-center text-center mt-1"
        >
          {" "}
          Curr Ov.
        </code>
        {scoreBallByBallData.fullScore?.currentOver?.length > 0 &&
          scoreBallByBallData.fullScore?.currentOver?.map((ball) => {
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

export default CurrentOver;
