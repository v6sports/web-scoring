import { NextResponse } from "next/server";
import path from 'path';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from "next";
/**
 *
 * 	delete last entry from data/100003/1/over/1.json
 *  delete last entry from data/100003/1/batter/baterId.json
 *  delete last entry from data/100003/1/bowlers/bolwerId.json
 * 	delete last entry from data/100003/1/ballbyBall.json
 * 	delete last entry from data/100003/1/inningsTracker.json
 *
 * @returns
 */
export async function POST(req: Request, res: NextApiResponse) {
	try {
		const { over=-1, batterId=0, bowlerId=0,matchId=0,inningNumber=0,ballNumber=0 } = await req.json();;

    if (over == -1 || batterId  == 0 || bowlerId   == 0|| matchId == 0 || inningNumber == 0 || ballNumber == 0) {
      return NextResponse.json({
          error: "Over, batterId, and bowlerId are required parameters.",
        });
    }

		const matchPath = `./data/${matchId}`;
    const currentInningPath = `${matchPath}/${inningNumber}`;
    const ballByBallFIlePath = `${currentInningPath}/ballByBall.json`;
		// data/100003/1/inningsTracker.json
		const inningsTrackerFIlePath = `${currentInningPath}/inningsTracker.json`;
    const currentOverFolder = `${currentInningPath}/over`;
    const currentOverFile = `${currentInningPath}/over/${over}.json`;
		const batterFile = `${currentInningPath}/batters/${batterId}.json`;
		const bowlerFile = `${currentInningPath}/bowlers/${bowlerId}.json`;
    const previousOverFile = `${currentInningPath}/over/${
			ballNumber || 0
    }.json`;


		console.log('matchPath',matchPath,currentInningPath,ballByBallFIlePath,currentOverFolder,currentOverFile,previousOverFile,"Match Paths");
    // Replace the file paths with your actual paths
    const filePaths = [
      currentOverFile,
      batterFile,
      bowlerFile,
      ballByBallFIlePath,
      inningsTrackerFIlePath,
    ];

    filePaths.forEach((filePath) => deleteLastEntry(filePath));

		NextResponse.json({ message: 'Entries deleted successfully.' });
  } catch (error) {
    console.error('Error deleting entries:', error);
    NextResponse.json({ error: 'Internal Server Error' });
  }

  return NextResponse.json({
    status: false,
    msg: "no match found",
  });
}


const deleteLastEntry = (file_path: string) => {
  if (fs.existsSync(file_path)) {
		console.log(file_path)
    const data = JSON.parse(fs.readFileSync(file_path, 'utf-8'));

    if (Array.isArray(data) && data.length > 0) {
      data.pop(); // Remove the last entry

      fs.writeFileSync(file_path, JSON.stringify(data, null, 2));

      console.log(`Last entry deleted from ${file_path}`);
    } else {
      console.log(`No entries to delete in ${file_path}`);
    }
  } else {
    console.log(`File ${file_path} does not exist.`);
  }
};
