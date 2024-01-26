import { useAppSelector } from "@/redux/store";
import React, { useEffect } from "react";

const PreviousOver = () => {
  const scoreBallByBallData = useAppSelector(
    (state) => state.scoreBallByBallSlice
  );
  useEffect(() => {
    // This function will be called whenever scoreBallByBallData changes
    // You can perform any update logic here

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
				{scoreBallByBallData.fullScore?.previousOver?.length > 0 &&
          scoreBallByBallData.fullScore?.previousOver?.map((ball) => {
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
                className={`rounded-sm ${circleColor} w-7 h-7 text-center items-center justify-center flex text-xs font-mono`}
              >
                {ball.run || 0}{circileSuffix}
              </code>
            );
          })}
      </div>
    </div>
  );
};

export default PreviousOver;
