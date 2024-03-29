import { NextResponse } from "next/server";

import fs from "fs";
import fsPrmoise from "fs/promises";

import moment from "moment";
import { IballByBall } from "@/app/interfaces/ballByBall.interface";
import {
  IcurrentOver,
  IballsOfOver,
} from "@/app/interfaces/currentOver.interface";
import { overBalls } from "@/app/Utils/overBalls.utils";
import { strikeConfirm } from "@/app/Utils/playersUtils";

export async function POST(req: Request) {
  const ballScore: any = await req.json();
  const overJson: IcurrentOver = {};
  if (!ballScore.match_id) {
    return NextResponse.json({
      key: "No MatchID Passed",
    });
  }

  // return NextResponse.json({
  // 	ballScore
  // })
  // check for the matchID
  const matchPath = `./data/${ballScore.match_id}`;
  const currentInningPath = `${matchPath}/${ballScore.inning_number}`;
  const ballByBallFIlePath = `${currentInningPath}/ballByBall.json`;
  const currentOverFolder = `${currentInningPath}/over`;
  const currentOverFile = `${currentInningPath}/over/${ballScore?.over_number}.json`;
  const previousOverFile = `${currentInningPath}/over/${
    ballScore?.over_number - 1 || 0
  }.json`;

  let folderName = `./data/${ballScore.match_id}`;
  let getUpdatedFileName = `${folderName}/matchScoreboardUpdated.json`;
  const readUpdatedScore = await fsPrmoise.readFile(
    getUpdatedFileName,
    "utf-8"
  );
  const updatedScoreParsed = await JSON.parse(readUpdatedScore);
  if (!fs.existsSync(matchPath)) {
    return NextResponse.json({
      key: "Match Does not Exists",
    });
  }

  if (!fs.existsSync(currentInningPath)) {
    const createFile = await fsPrmoise.mkdir(currentInningPath);
    await fsPrmoise.writeFile(ballByBallFIlePath, "[]", "utf-8");
  }

  // First Read the Data from the File
  /**TO OVER MAGIC START */
  if (!fs.existsSync(currentOverFolder)) {
    const createFile = await fsPrmoise.mkdir(currentOverFolder).catch((e) => {

    });
    await fsPrmoise.writeFile(currentOverFile, "[]", "utf-8").catch((e) => {

    });
  }

  if (!fs.existsSync(currentOverFile)) {
    await fsPrmoise.writeFile(currentOverFile, "[]", "utf-8");
  }

  // Read Over and BallBy Ball Data

  const getAllBalls = await fsPrmoise.readFile(ballByBallFIlePath, "utf-8");
  const allBallScore: IballByBall[] = JSON.parse(getAllBalls);
  const currentOverUnparsedData = await fsPrmoise.readFile(
    currentOverFile,
    "utf-8"
  );
  const currentOverParsedData: IballsOfOver[] = JSON.parse(
    currentOverUnparsedData
  );

  const previousOverUnparsedData =
    ballScore.over_number > 0 &&
    (await fsPrmoise.readFile(previousOverFile, "utf-8").catch((e) => {
      console.log("Over Not Present");
    }));

  const previousParsedData: IballsOfOver[] = previousOverUnparsedData
    ? JSON.parse(previousOverUnparsedData)
    : [];

  // write OverLogic
  let overBallbyBallData:any = overBalls(
    updatedScoreParsed,
    ballScore,
    ballScore?.inning_number
  );
	console.log(ballScore.on_strike,"BEFORE---");

  let rrr = strikeConfirm(ballScore);
  // console.log(rrr);
  const cloneNextBallNumber = overBallbyBallData?.ballByBall.ball_number;
  const cloneCurrentBallNumber =
    overBallbyBallData?.ballByBall.ball_number - 1 == -1
      ? 6
      : overBallbyBallData?.ballByBall.ball_number - 1;
  currentOverParsedData.push({
    currentOverNumber:
      cloneCurrentBallNumber == 6
        ? overBallbyBallData.ballByBall.over_number
        : overBallbyBallData.ballByBall.over_number,
    ballNumber: cloneCurrentBallNumber,
    nextBallNumber: cloneNextBallNumber,
    bolwerId: ballScore.on_attack,
		batsmanId: ballScore.on_strike,
    run: ballScore.runs,
		...ballScore,
    currentTimeStamp: moment().format("hh:mm:ss"),
    extra: {
      extraRun: ballScore.extras,
      isBallNotCount:
        ballScore.extra_type == "wide" || ballScore.extra_type == "no-ball"
          ? true
          : false,
      isExtra: ballScore.extra_type ? true : false,
      type: ballScore.extra_type,
    },
  });
  const writeOverData = await fsPrmoise.writeFile(
    currentOverFile,
    JSON.stringify(currentOverParsedData),
    "utf-8"
  );
  /**TO OVER MAGIC END */

  const lastBall = allBallScore[allBallScore.length - 1];
  if (lastBall?.localId) ballScore["localId"] = lastBall?.localId + 1;
  else ballScore["localId"] = 1;

  ballScore["currentTimeStamp"] = moment().format("hh:mm:ss");
  ballScore["over_number"] =
    cloneCurrentBallNumber == 6
      ? overBallbyBallData.ballByBall.over_number
      : overBallbyBallData.ballByBall.over_number;
  ballScore["nextBallNumber"] = cloneNextBallNumber;
  ballScore["ball_number"] = cloneCurrentBallNumber;
  ballScore["ball_number_included_extra"] =
    overBallbyBallData.ballByBall.ball_number_included_extra;
  allBallScore.push(ballScore);
  const writeData = await fsPrmoise.writeFile(
    ballByBallFIlePath,
    JSON.stringify(allBallScore),
    "utf-8"
  );

  // Change Strike Post saving the data of currentBall START
  ballScore["on_strike"] = rrr.onStrikeBatsman;
  ballScore["non_strike"] = rrr.nonStrikeBatsman;

	console.log(`${JSON.stringify(rrr)}`,"GET COOL PEOPLE")
  // Change Strike Post saving the data of currentBall START
  return NextResponse.json({
    balls: ballScore,
    currentOver: currentOverParsedData,
    previousParsedData: previousParsedData,
  });
}
