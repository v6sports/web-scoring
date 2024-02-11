import { useAppSelector } from "@/redux/store";
import { Tooltip } from "antd";
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
						let completeMessage = ''
						console.log(ball,"GET BALL");
						if (ball?.extra?.type == "leg-bye") {
              // circleColor = "bg-orange";
              circileSuffix = "LB";
							completeMessage = 'Leg Bye'
            }
						if (ball?.extra?.type == "bye") {
              circleColor = "bg-red";
              circileSuffix = "B";
							completeMessage = 'Bye'
            }
						if (ball?.extra?.type == "no-ball") {
              circleColor = "bg-red-300";
              circileSuffix = "NB";
							completeMessage = 'No Ball'
            }
						if (ball?.is_out != -1) {
              circleColor = "bg-blue-400";
              circileSuffix = "W";
							completeMessage = 'Wicket'
            }

						if (ball?.extra?.type == "wide") {
              circleColor = "bg-purple-300";
              circileSuffix = "WD";
							completeMessage = 'Wide Ball'
            }

            return (
              <code
                key={`${ball.currentTimeStamp}-${ball.run}`}
                className={`rounded-sm ${circleColor} w-7 h-7 text-center items-center justify-center flex text-xs font-mono`}
              >
              <Tooltip title={completeMessage || `${ball.run || '0'} run scored`}>
                {ball.run || '0'}{circileSuffix}
								</Tooltip>
              </code>
            );
          })}
      </div>
    </div>
  );
};

export default PreviousOver;
