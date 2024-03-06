import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import moment from "moment";

const getPlayersByTeam = (
  matchId: string,
  teamId: string
): { [team: string]: string[] } => {
  const filePath = path.join(
    process.cwd(),
    "data",
    matchId,
    "matchScoreboardUpdated.json"
  );

  const additionalPlayersFilePath = path.join(
    process.cwd(),
    "data",
    matchId,
    "additionalPlayers.json"
  );
  let existingPlayers: any = [];
  try {
    if (fs.existsSync(additionalPlayersFilePath)) {
      const additionalPlayersData = fs.readFileSync(
        additionalPlayersFilePath,
        "utf-8"
      );
      existingPlayers = JSON.parse(additionalPlayersData);
    }
  } catch (error) {
	// offcourse we can log the error here, ignoring to save time
  }
  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, "utf-8");
    const scoreboard = JSON.parse(fileData);

    try {
      const matchDetails = scoreboard.match_details;
      // select team here which team
      /**
       * here we will check if the team id is equal to team_a_new_det.team_id then we will return team_a_new_det.players
       * if else we will check if the team id is equal to team_b_new_det.team_id then we will return team_b_new_det.players
       * else we will return null
       */

      let teamPlayersList = null; // because we are not sure about the team_id
      if (matchDetails.team_a_new_det.team_id == teamId)
        teamPlayersList = matchDetails.team_a_new_det?.players;
      else if (matchDetails.team_b_new_det.team_id == teamId)
        teamPlayersList = matchDetails.team_b_new_det?.players;
      return { players: [...existingPlayers?.filter((player: any) =>  player.teamId == teamId), ...teamPlayersList] };
    } catch (error) {
      return { players: [] };
    }
  }

  return {};
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const matchId = searchParams.get("matchId");
  const teamId = searchParams.get("teamId");

  if (matchId) {
    const playersByTeam = getPlayersByTeam(matchId, teamId as string);
    return NextResponse.json(playersByTeam);
  } else {
    return NextResponse.json({ error: "Invalid matchId" });
  }
}

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const matchId = searchParams.get("matchId");
  const teamId = searchParams.get("teamId");
  const playerData = await req.json();
  if (!matchId || !teamId) {
    return NextResponse.json({ error: "Invalid matchId or teamId" });
  }

  // Read the existing match scoreboard file
  const filePath = path.join(
    process.cwd(),
    "data",
    matchId,
    "matchScoreboard.json"
  );
  const playerListPath = path.join(
    process.cwd(),
    "data",
    matchId,
    "additionalPlayers.json"
  );
  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, "utf-8");
    const scoreboard = JSON.parse(fileData);

    try {
      const matchDetails = scoreboard.match_details;
      let teamPlayersList = null;
      let additionalPlayers = [];

      // Check if additionalPlayers.json exists
      if (fs.existsSync(playerListPath)) {
        const additionalPlayersData = fs.readFileSync(playerListPath, "utf-8");
        additionalPlayers = JSON.parse(additionalPlayersData);
      }
	  const getCurrentTime= moment().format("YYYYMMDDHHmmss");
	  const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
		playerData["teamId"] = teamId;
		playerData["player_id"] =getCurrentTime;
		playerData["user_id"] =getCurrentTime;
		playerData["createdAt"] = createdAt;

      if (matchDetails.team_a_new_det.team_id == teamId) {
        teamPlayersList = matchDetails.team_a_new_det?.players;
        let isPlayerPresent = [
          ...teamPlayersList,
          ...additionalPlayers?.filter((player: any) =>  player.teamId == teamId),
        ].findIndex((player: any) => {
          return (
            player.name.toLowerCase().trim() ==
            playerData.name.toLowerCase().trim()
          );
        });
		if(isPlayerPresent < 0) additionalPlayers.push(playerData);
        if (isPlayerPresent > 0) {
          return NextResponse.json({ error: "Player already exists" });
        }


      } else if (matchDetails.team_b_new_det.team_id == teamId) {
        teamPlayersList = matchDetails.team_b_new_det?.players;
        let isPlayerPresent = [
          ...teamPlayersList,
          ...additionalPlayers?.filter((player: any) =>  player.teamId == teamId)
        ].findIndex((player: any) => {
			return (
            player.name.toLowerCase().trim() ==
            playerData.name.toLowerCase().trim()
          );
        });
		if(isPlayerPresent < 0) additionalPlayers.push(playerData);
        if (isPlayerPresent > 0) {
          return NextResponse.json({ error: "Player already exists" });
        }

        // additionalPlayers.push(playerData);
      }

      // Update the match scoreboard file with the new player data
      fs.writeFileSync(
        playerListPath,
        JSON.stringify(additionalPlayers, null, 2)
      );

      return NextResponse.json({ success: true });
    } catch (error) {
      return NextResponse.json({ error: "Failed to add player" });
    }
  } else {
    return NextResponse.json({ error: "Match scoreboard file not found" });
  }
}
