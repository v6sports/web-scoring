import { IinningTracker } from "@/app/interfaces/inningsTracker.interface";
import { NextResponse } from "next/server";
import fsPromise from "fs/promises";
/**
 *
 * @param req
 * @returns
 */

export async function POST(req: Request) {
  const bowlerStats: IinningTracker = await req.json();

  const { inning_number = -1, match_id = -1, isRead = false } = bowlerStats;

  // if Match_id or inning_number is not present throw Error
  if (inning_number == -1 || match_id == -1) {
    return NextResponse.json({
      status: false,
      mesg: "Please pass MatchId and Inning Number Please",
    });
  }
  // if Match_id or inning_number is not present throw Error

  let folderName = `./data/${match_id}`;
  const fileForInningTracker = `${folderName}/${inning_number}/inningsTracker.json`;

  if (isRead == false) {
    try {
      await fsPromise.access(fileForInningTracker);
    } catch (error) {
      await fsPromise
        .writeFile(fileForInningTracker, "[]", "utf-8")
        .catch((e) => {
          console.log(
            "%croute.ts line:24 Error in file creating fileForInningTracker",
            "color: #007acc;",
            e
          );
        });
    }
  }

  let readInningTrackerFile: [] = await fsPromise.readFile(
    fileForInningTracker,
    "utf-8"
  );
  readInningTrackerFile = JSON.parse(readInningTrackerFile);

  // New data will be not pushed if read Flag is False
  if (isRead === false) {
    readInningTrackerFile.push(bowlerStats);
    await fsPromise
      .writeFile(
        fileForInningTracker,
        JSON.stringify(readInningTrackerFile),
        "utf-8"
      )
      .catch((e) => {
        console.log("writing failed");
      });
  }

  return NextResponse.json({
    readInningTrackerFile,
  });
}
