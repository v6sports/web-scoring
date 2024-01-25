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
						let circleColor = 'bg-slate-300';
						let circileSuffix = ''
						if (ball?.extra?.type == "leg-bye") {
              // circleColor = "bg-orange";
              circileSuffix = "LB";
            }
						if (ball?.extra?.type == "bye") {
              circleColor = "bg-red";
              circileSuffix = "B";
            }
						if (ball?.extra?.type == "no-ball") {
              circleColor = "bg-red-300";
              circileSuffix = "NB";
            }

						if (ball?.extra?.type == "wide") {
              circleColor = "bg-purple-300";
              circileSuffix = "WD";
            }
								console.log(ball?.extra?.type,"BALLBYBALL")
            return (
              <code
                key={`${ball.currentTimeStamp}-${ball.run}`}
                className={`rounded-sm ${circleColor} w-7 h-7 text-center items-center justify-center flex text-xs font-extrabold`}
              >
                {ball.run}{circileSuffix}
              </code>
            );
          })}
      </div>
    </div>
  );
};

export default CurrentOver;
