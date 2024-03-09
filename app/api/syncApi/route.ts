import fs from "fs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const ballScore = await req.json();
  const matchPath = `./data/${ballScore.match_id}`;
let resultResponse:any = {
	matchStatus: "success",
	matchResponseData:[],
	inningData:[],
	inningStatus:[]
};
  // Read the JSON file
  try {
    const data = fs.readFileSync(`${matchPath}/matchScoreboard.json`, "utf8");
    const postUrl = `https://una.v6sports.com/api/match/create-match`;

    const response = await fetch(postUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    if (response.ok) {
	  const result = await response.json();
	  resultResponse.matchResponseData = result
	  resultResponse.matchStatus = "success";
    //   NextResponse.json(result);
      // Handle the response data
      // ...
    } else {
    //   NextResponse.json({ status: false, msg: "Error in posting data" });
      console.error("Error:", response.status);
      // Handle the error case
      // ...
    }
  } catch (error) {
    // Handle the case when the file is not present
    console.error("Error reading JSON file:", error);
    // You can choose to handle the error in a specific way or throw it further
    throw error;
  }

  try {

	const matchId = ballScore.match_id;
	const matchFolders = fs.readdirSync(matchPath);
	for (const folder of matchFolders) {
		if (fs.statSync(`${matchPath}/${folder}`).isDirectory()) {
			const postUrl = `https://una.v6sports.com/api/ballByBall/create-multiple-records`;

			const ballByBallData = fs.readFileSync(`${matchPath}/${folder}/ballByBall.json`, "utf8");

			const response = await fetch(postUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: ballByBallData,
			});
			if (response.ok) {
				const result = await response.json();

				resultResponse.inningData.push(result);
        		resultResponse.inningStatus.push({ folder, status: "success" });
				// Handle the response data
				// ...
			} else {
				console.error("Error:", response.status);
				// Handle the error case
				// ...
			}
		}
	}
  } catch (error) {

  }


  return NextResponse.json(resultResponse);

  // Use the jsonData as needed
  // ...

  // Continue with the rest of your code
  // ...
}
