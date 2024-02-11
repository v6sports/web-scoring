import { IballByBall } from "./ballByBall.interface";
import { IballsOfOver, IcurrentOver } from "./currentOver.interface";
import { IinningTracker } from "./inningsTracker.interface";

export interface IScoreBallByBall {
  overByOver?: IballByBall[];
  fullScore?: detailedScored;


}

export interface detailedScored {
  lastBallOfOver?: IballByBall;
  validBalls?: number;
  totalOvers?: number;
  totalRuns?: number;
	wickets?:IinningTracker[];
  currentOver?: IballsOfOver[];
  previousOver?: IballsOfOver[];
}
