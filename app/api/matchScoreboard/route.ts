import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

import fsPromises from "fs/promises";
import fs from "fs";
import path from "path";
import { readFileSync } from "fs";
import moment from "moment";
type ResponseData = {
  message: string;
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const matchId = searchParams.get("matchId");
	const inningNumber =  searchParams.get('inning')
	console.log("APPLE IS GREEN",inningNumber)
  if (!matchId) {
    return NextResponse.json({
      status: false,
      errorCode: 1,
      message: "MatchId Not Passed",
    });
  }
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEyNDAsImlzcyI6Imh0dHBzOi8vZnVubmdhZ2UuY29tL2FwaS92MS9sb2dpbiIsImlhdCI6MTY5NDkzMjAwNywiZXhwIjoxNzAwOTMxOTQ3LCJuYmYiOjE2OTQ5MzIwMDcsImp0aSI6ImNXUUhydVJvVFowQWpkNkcifQ.WratTivVrDLqTTMDxthfjgZ0r4SQv4y31J0F3tqyXqk"
  );

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  const today = moment();

  let folderName = `./data/${matchId}`;
  let getFileName = `${folderName}/matchScoreboard.json`;
	const currentInningPath = `${folderName}/${inningNumber}`;
	const ballByBallFIlePath = `${currentInningPath}/ballByBall.json`;
	const currentOverFolder = `${currentInningPath}/over`;
	const currentOverFile = `${currentInningPath}/over/${0}.json`;
  // let getInitialFileName = `${folderName}/matchScoreboardInitial.json`; // only update from the server response
  let getUpdatedFileName = `${folderName}/matchScoreboardUpdated.json`; // update by localResponse As Well

	try {
		let savedData =await readFileSync(currentInningPath,'utf-8');
		if(savedData){
			return NextResponse.json(JSON.parse(savedData));
		}
	} catch (error) {
		console.log(error);
	}

	let data = await fetch(
    `http://127.0.0.1/api/v1/fullscoreboard?match_id=${matchId}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => result)
    .catch((error) => console.log("error", error));

  try {
		console.log(folderName,"FOLDER NAME")
    await fsPromises.mkdir(folderName);
  } catch (error) {
    console.log("MATCH ALREADY EXISITS");
  }

try {
	if (!fs.existsSync(currentInningPath)){
		await fsPromises.mkdir(currentInningPath).catch(e=>{
			console.log('%croute.ts line:60 e', 'color: #007acc;', e);
		});;
	}
	if (!fs.existsSync(ballByBallFIlePath)){
		await fsPromises.writeFile(ballByBallFIlePath,"[]",'utf-8').catch(e=>{
		console.log('%croute.ts line:65 e', 'color: #007acc;', e);
		});;
	}
	if (!fs.existsSync(currentOverFolder)){
		await fsPromises.mkdir(currentOverFolder).catch(e=>{
			console.log('%croute.ts line:70 e', 'color: #007acc;', e);
		});
	}
	if (!fs.existsSync(currentOverFile)){
		await fsPromises.writeFile(currentOverFile,"[]",'utf-8').catch(e=>{
			console.log('%croute.ts line:75 e', 'color: #007acc;', e);
		});;
	}
} catch (error) {
console.log('EROOR', error);
}

  if (data) {
    fsPromises.writeFile(getFileName, JSON.stringify(data), "utf-8");
    fsPromises.writeFile(getUpdatedFileName, data, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } else return NextResponse.json({});
}
