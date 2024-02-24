
import fs from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const matchId = searchParams.get("matchId");
  const inningNumber: any = searchParams.get("inning");

  const folderName = `./data/${matchId}`;
  const currentInningPath = path.join(folderName, inningNumber);
  const ballByBallFilePath = path.join(currentInningPath, "ballByBall.json");

  try {
    // Read the content of the JSON file
    const jsonContent = await fs.readFile(ballByBallFilePath, "utf-8");

    // Parse the JSON content
    const jsonData = JSON.parse(jsonContent);

    // Return the parsed JSON
    return NextResponse.json(jsonData);
  } catch (error) {
	console.log(error)
    // Handle errors (e.g., file not found, JSON parsing error)
    return NextResponse.json({
      status: 500,
      body: { error: "Internal Server Error" },
    });
  }
}
