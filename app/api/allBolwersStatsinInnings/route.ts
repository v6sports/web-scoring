
import { NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";
import { promisify } from "util";
const readdirAsync = promisify(fs.readdir);
const readFileAsync = promisify(fs.readFile);
export async function POST(req: Request) {
  const bolwingSpell = await req.json();
  let { matchId, inningNumber } = bolwingSpell;
  let folderName = `./data/${matchId}`;
  const folderForBowlers = `${folderName}/${inningNumber}/bowlers`;

  try {
    let data = await readFilesInFolder(folderForBowlers);
    const playerStatsArray: any[] = [];

// Process each player's scorecard
data.forEach((playerScorecard:any) => {
  const playerStats: { [key: string]: any } = {
    player_id: '',
    total_runs: 0,
    total_wickets: 0,
    total_overs: 0,
    total_balls: 0,
  };

  // Process each ball in the player's scorecard
  playerScorecard?.length > 0 && playerScorecard.forEach((ball:any) => {
    const { player_id, runs, wickets, overNumber, ballNumber } = ball;

    // Initialize player's stats if not already present
    if (!playerStats.player_id) {
      playerStats.player_id = player_id;
    }

    // Update player's stats
    playerStats.total_runs += runs;
    if (wickets !== -1) {
      playerStats.total_wickets += 1;
    }

    // Update overs and balls
    playerStats.total_overs = Math.floor(playerScorecard.length / 6);
    playerStats.total_balls = ballNumber;
  });

  // Push player's stats to the array
  playerStatsArray.push(playerStats);
});

    return NextResponse.json(playerStatsArray);
  } catch (error) {}
}

interface playerInfo {
	"runs": string | number;
    "player_id": string | number;
    "ballNumber": string | number;
    "wickets": string | number;
    "overNumber": string | number;
    "timeStamp": string | number
}

async function readFilesInFolder(folderPath: string): Promise<playerInfo[]> {
  const filesArray: playerInfo[] = [];

  try {
    // Read files in the folder
    const files = await readdirAsync(folderPath);

    // Iterate through files
    for (const file of files) {
      const filePath = path.join(folderPath, file);

      // Read file data
      const data = await readFileAsync(filePath, "utf8");

      // Add file data to the array
      filesArray.push(JSON.parse(data));
    }

    // Log or return the array as needed
    //   console.log('All files read:', filesArray);
    return filesArray;
  } catch (err) {
    console.error("Error reading files:", err);
    throw err; // Propagate the error if needed
  }
}

// Call the function with your folder path
