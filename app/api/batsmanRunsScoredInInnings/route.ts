import { batsmanDetails, batter } from "@/app/interfaces/batter.interface";
import fsPromise from "fs/promises";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const batsmanScore: batter = await req.json();
  let { matchId, inningNumber, batsmanList, playerId } = batsmanScore;
  let folderName = `./data/${matchId}`;
  const folderForBatters = `${folderName}/${inningNumber}/batters`;

  try {
    let playersInfo:any = await fsPromise.readFile(
      `${folderForBatters}/${playerId}`,
      "utf-8"
    ).catch(e=>{
			return NextResponse.json({
				status: false,
				msg: "Player Not Found",
			});
		});
    playersInfo = JSON.parse(playersInfo);

    const playerSums = {};

    // Iterate through each object in the array
    playersInfo.forEach((item:batsmanDetails) => {
      const playerId = item.player_id;

      // If the player is not in the sums object, initialize their values to 0
      if (!playerSums[playerId]) {
        playerSums[playerId] = {
          boundariesInFour: 0,
          boundariesInSix: 0,
          runs: 0,
          numberOfBallsPlayed: 0,
        };
      }

      // Add the values to the sums object
      playerSums[playerId].boundariesInFour += item.boundariesInFour;
      playerSums[playerId].boundariesInSix += item.boundariesInSix;
      playerSums[playerId].runs += item.runs;
      playerSums[playerId].numberOfBallsPlayed += item.numberOfBallsPlayed;
    });

    return NextResponse.json({...playerSums[playerId]});
  } catch (error) {
		console.log(error)
    return NextResponse.json({
      status: false,
      msg: "Player Not Found",
			e:error
    });
  }
}
