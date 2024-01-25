import { IballByBall } from "../interfaces/ballByBall.interface";
import { Iscoreboard } from "../interfaces/matchScoreboard.interface";

const overBalls = (
  updatedScore: Iscoreboard,
  ballByBall: IballByBall,
  inningNumber: number
) => {
  let scoreToUpdate = updatedScore.innings?.[inningNumber];

  let currentBall = ballByBall["ball_number"];
  let countAllBallsInOver =
    ballByBall["ball_number_included_extra"] < ballByBall["ball_number"]
      ? ballByBall["ball_number"]
      : ballByBall["ball_number_included_extra"];

			console.log(currentBall,countAllBallsInOver,"nextJKS")
  if (ballByBall.extra_type == "wide" || ballByBall.extra_type == "no-ball") {
    //@ts-ignore
    countAllBallsInOver = countAllBallsInOver + 1;
	ballByBall["ball_number"] = currentBall;
	ballByBall["ball_number_included_extra"] = countAllBallsInOver
    return { updatedScore, ballByBall };
  } else {
    if (currentBall && currentBall < 6) {
      //@ts-ignore
      countAllBallsInOver = countAllBallsInOver + 1;
      //@ts-ignore
      currentBall = currentBall + 1; // increase ball by 1 if ball < 6
      // scoreToUpdate["curr_over_ball"] = currentBall || 0;
	  	ballByBall["ball_number"] = currentBall;
	  	ballByBall["ball_number_included_extra"] = countAllBallsInOver
      return { updatedScore, ballByBall };
    }
    if (currentBall === 6) {
      console.log(currentBall, "FIFIIF=6");

      ballByBall["over_number"] = ballByBall["over_number"] + 1; // increase Over by 1 if ball is 6th of the over
      countAllBallsInOver = 0;
      currentBall = 0;
      // scoreToUpdate["curr_over_ball"] = 0;
      // scoreToUpdate["over_number"] = ballByBall["over_number"];
	  ballByBall["ball_number"] = currentBall;
	  ballByBall["ball_number_included_extra"] = countAllBallsInOver
      return { updatedScore, ballByBall };
    }
  }

  // updatedScore.innings?.[1]?.curr_over_ball
};

export { overBalls };
