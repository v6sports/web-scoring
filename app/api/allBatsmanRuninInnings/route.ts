import { batter } from "@/app/interfaces/batter.interface";
import { NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";
import { promisify } from 'util';
const readdirAsync = promisify(fs.readdir);
const readFileAsync = promisify(fs.readFile);
export async function POST(req: Request) {
  const batsmanScore: batter = await req.json();
  let { matchId, inningNumber } = batsmanScore;
  let folderName = `./data/${matchId}`;
  const folderForBatters = `${folderName}/${inningNumber}/batters`;
  const fileForBatter = `${folderName}/matchScoreboardUpdated.json`;
  const listOfPlayers:any = [];
  try {

	// Read the files in the folder
	readFileAsync(fileForBatter, 'utf8').then((data) => {
		const matchData = JSON.parse(data);
		listOfPlayers.push(
      ...matchData.match_details?.team_a_new_det?.players,
      ...matchData.match_details?.team_b_new_det?.players,
    );

	}).catch(err => {
		console.error('Error reading files:', err);
	});
	let data = await readFilesInFolder(folderForBatters);
	const playerSumMap = {};
	console.log(listOfPlayers,"LLL")
	data?.flat().forEach((stat) => {
		const playerId = stat.player_id;

		if (!playerSumMap[playerId]) {
		  playerSumMap[playerId] = {
        boundariesInFour: 0,
        boundariesInSix: 0,
        runs: 0,
        numberOfBallsPlayed: 0,
        player_id: playerId,
        playerName: listOfPlayers.find((player) => player.player_id == playerId)?.name || '',
		bolwer: listOfPlayers.find((player) => player.player_id == stat?.on_attack)?.name,
		fieldedBy: listOfPlayers.find((player) => player.player_id == stat?.assist_by)?.name,
      };
		}

		playerSumMap[playerId].boundariesInFour += stat.boundariesInFour;
		playerSumMap[playerId].boundariesInSix += stat.boundariesInSix;
		playerSumMap[playerId].runs += stat.runs;
		playerSumMap[playerId].numberOfBallsPlayed += stat.numberOfBallsPlayed;
		playerSumMap[playerId]['json'] = stat;

	  });

	return NextResponse.json(playerSumMap);
  } catch (error) {}
}

interface playerInfo {
  boundariesInFour: string | number;
  boundariesInSix: string | number;
  runs: string | number;
  numberOfBallsPlayed: string | number;
  player_id: string | number;
}

async function readFilesInFolder(folderPath: string): Promise<playerInfo[]> {
	const filesArray: playerInfo[] = [];

	try {
		// return [];
	  // Read files in the folder
	   await readdirAsync(folderPath).then(async files=>{
		for (const file of files) {
			const filePath = path.join(folderPath, file);

			// Read file data
			const data = await readFileAsync(filePath, 'utf8').then(data=>{
				filesArray.push(JSON.parse(data));

			  }).catch((err) => {
				console.log('Error reading files:', err);
			  });;

			// Add file data to the array

		  }
	  }).catch((err) => {
		console.log('Error reading files:', err);
	  });

	  // Iterate through files


	  // Log or return the array as needed
	  console.log('All files read:', filesArray);
	  return filesArray;
	} catch (err) {
	  console.error('Error reading files:', err);
	  throw err; // Propagate the error if needed
	}
  }

  // Call the function with your folder path

