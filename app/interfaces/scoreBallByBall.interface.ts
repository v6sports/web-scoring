import { IballByBall } from "./ballByBall.interface";
import { IballsOfOver, IcurrentOver } from "./currentOver.interface";

export interface IScoreBallByBall {
  overByOver?: IballByBall[];
  fullScore?: detailedScored;

}

export interface detailedScored {
  lastBallOfOver?: IballByBall;
  validBalls?: number;
  totalOvers?: number;
  totalRuns?: number;
  currentOver?: IballsOfOver[];
  previousOver?: IballsOfOver[];
}
