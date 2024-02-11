import { useAppSelector } from "@/redux/store";
import { Tooltip } from "antd";
import React, { useEffect } from "react";

const CurrentOver = () => {
  const scoreBallByBallData = useAppSelector(
    (state) => state.scoreBallByBallSlice
  );
	const selector = useAppSelector((state) => state.matchSliceReducer);
	const teamPlayers = useAppSelector((state) => state.battingPlayerSlice) || [];
	// const [currentOver, setCurrentOver] = useState<bowlerDetails[]>([]);
	useEffect(() => {
    // This function will be called whenever scoreBallByBallData changes
    // You can perform any update logic here

  }, [scoreBallByBallData.fullScore?.currentOver,teamPlayers]);
  return (
   <div key="Current-over-div">
      <div key="Current-over-container" className="flex flex-row gap-2">
        <code
          key="Current-over"
          className="flex-2 font-extralight text-xs justify-center items-center text-center mt-1"
        >

          Curr Ov.
        </code>
        {scoreBallByBallData?.fullScore?.currentOver?.length > 0 &&
          scoreBallByBallData.fullScore?.currentOver?.flatMap((ball) => {
						console.log(ball?.is_out,"BALLBYBALL-CURENT")
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
						if (ball?.boundary == 1) {
              circleColor = ball?.runs === 4 ? "bg-yellow-400" : "bg-green-400";
              // circileSuffix = "B";
							let nameOfPlayer =  ''

							completeMessage = ball?.runs === 4 ? `${nameOfPlayer} 4 Boundary` : `${nameOfPlayer} 6 Boundary`
            }

						if (ball?.extra?.type == "wide") {
              circleColor = "bg-purple-300";
              circileSuffix = "WD";
							completeMessage = 'Wide Ball'
            }
								console.log(ball?.extra?.type,"BALLBYBALL")
            return (

              <code
                key={`${ball.currentTimeStamp}-${ball.run}`}
                className={`rounded-sm ${circleColor} w-7 h-7 text-center items-center justify-center flex text-xs font-extrabold`}
              >
								<Tooltip  title={completeMessage || `${ball.run || '0'} run scored`}>
                {ball.run || '0'}{circileSuffix}
								</Tooltip>
              </code>
            );
          })}
      </div>
    </div>
  );
};

export default CurrentOver;
