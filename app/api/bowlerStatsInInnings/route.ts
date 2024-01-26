import { batsmanDetails, batter } from "@/app/interfaces/batter.interface";
import { bowlerDetails } from "@/app/interfaces/bowler.interface";
import fsPromise from "fs/promises";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const bowlersStats: batter = await req.json(); // batter interface because we only need matchId, inningNumber and playerId

  let { matchId, inningNumber, playerId } = bowlersStats;
  let folderName = `./data/${matchId}`;

  const folderForBatters = `${folderName}/${inningNumber}/bowlers`;

  try {
    let playersInfo: bowlerDetails[] | any = await fsPromise
      .readFile(`${folderForBatters}/${playerId}`, "utf-8")
      .catch((e) => {
        return NextResponse.json({
          status: false,
          msg: "Player Not Found",
        });
      });
    playersInfo = JSON.parse(playersInfo);

    const playerSums: bowlerDetails = {
      player_id: -1,
      runs: 0,
    };


	let totalRuns = 0;
	let totalWickets = 0;
	let overs = 0;
	let currentBall = 0;
	const uniqueOverNumbers = new Set();
    // Iterate through each object in the array
    playersInfo.forEach((item: bowlerDetails) => {
		if (item.overNumber !== null) {
      uniqueOverNumbers.add(item.overNumber);
    }

	totalRuns += item.runs;
	totalWickets =  item.wickets != -1 ? totalWickets + 1: totalWickets;
	currentBall = item.ballNumber;
    });

    return NextResponse.json({ totalRuns, totalWickets, overs:uniqueOverNumbers.size, currentBall });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: false,
      msg: "Player Not Found",
      e: error,
    });
  }
}
