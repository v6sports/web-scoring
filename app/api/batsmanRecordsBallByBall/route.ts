import { batsmanDetails, batter } from "@/app/interfaces/batter.interface";
import fsPromise from "fs/promises";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const batsmanScore: batter = await req.json();

  let { matchId, inningNumber, batsmanList } = batsmanScore;

  let folderName = `./data/${matchId}`;
  const folderForBatters = `${folderName}/${inningNumber}/batters`;

  // create batterfolder START
  await fsPromise
    .access(folderForBatters, fsPromise.constants.W_OK)
    .then(() => {
      console.log(
        "%croute.ts FOLDER ALREADY EXISTS line:42 folderForBatters",
        "color: #007acc;",
        folderForBatters
      );
    })
    .catch((e) => {
      console.log(
        `${folderForBatters} does'nt exists, now creating folder for the same`
      );
      fsPromise.mkdir(folderForBatters).catch((e) => {
        console.log(e, "ERROR IN CREATING FOLDER FOR BATSMAN");
        return NextResponse.json({
          status: false,
          msg: "Not able to create folder check Permission Please",
        });
      });
    });
  // create batterfolder END

  let { player_id } = batsmanList;
  let batterJsonFile = `${folderForBatters}/${player_id}`;

  //check for the batterFile and creating for the batter file START
  await fsPromise
    .access(`${batterJsonFile}`, fsPromise.constants.W_OK)
    .then(() => {})
    .catch(async (e) => {
      await fsPromise
        .writeFile(`${batterJsonFile}`, "[]", "utf-8")
        .then((e) => {
          console.log(
            "%croute.ts line:75 `${batterJsonFile} created`",
            "color: #007acc;",
            `${batterJsonFile} created`
          );
        })
        .catch((e) => {
          return NextResponse.json({
            status: false,
            message: `Error Creating file for ${batterJsonFile}`,
          });
        });
    });

  //check for the batterFile and creating for the batter file END

  // READ Players File START
  let batterRuns = await fsPromise.readFile(`${batterJsonFile}`, "utf-8");
  let arrayBatterRuns: batsmanDetails[] = JSON.parse(batterRuns);
  // READ Players File END

  if (batsmanList) arrayBatterRuns.push(batsmanList);

  // writing Players File Again START
  let writeBatterRuns = await fsPromise
    .writeFile(`${batterJsonFile}`, JSON.stringify(arrayBatterRuns), "utf-8")
    .catch((e) => {
      console.log(
        "%croute.ts line:101  error while writng batsmanList",
        "color: #007acc;",
        batsmanList
      );
      return NextResponse.json({
        status: false,
        msg: "error while writng batsmanList",
      });
    });
  // writing Players File Again START
  return NextResponse.json({
    status: true,
    arrayBatterRuns,
  });
  // const ballByBallFIlePath = `${currentInningPath}/ballByBall.json`;
}
