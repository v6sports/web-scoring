import { bowler, bowlerDetails } from "@/app/interfaces/bowler.interface";
import fsPromise from "fs/promises";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const bowlerStats: bowler = await req.json();

	console.log(bowlerStats);
  let { matchId, inningNumber, bowlerList,playerId } = bowlerStats;

	if(!playerId) {
		return NextResponse.json({
			status: false,
			msg: "playerId not passed"+playerId,
		});
	}
  let folderName = `./data/${matchId}`;
  const folderForBowlers = `${folderName}/${inningNumber}/bowlers`;

  // create folderForBowlers START
  await fsPromise
    .access(folderForBowlers, fsPromise.constants.W_OK)
    .then(() => {
      console.log(
        "%croute.ts FOLDER ALREADY EXISTS line:42 folderForbowlers",
        "color: #007acc;",
        folderForBowlers
      );
    })
    .catch((e) => {
      console.log(
        `${folderForBowlers} does'nt exists, now creating folder for the same`
      );
      fsPromise.mkdir(folderForBowlers).catch((e) => {
        console.log(e, "ERROR IN CREATING FOLDER FOR Bwoler");
        return NextResponse.json({
          status: false,
          msg: "Not able to create folder check Permission Please",
        });
      });
    });
  // create folderForBowlers END

  // let { player_id = -1 } = bowlerList;
  let bowlerJsonFile = `${folderForBowlers}/${playerId}.json`;

  //check for the bowlerFile and creating for the bowler file START
	try {
		await fsPromise
    .access(`${bowlerJsonFile}`, fsPromise.constants.W_OK).catch(async (e) => {
      await fsPromise
        .writeFile(`${bowlerJsonFile}`, "[]", "utf-8").catch((e) => {
          return NextResponse.json({
            status: false,
            message: `Error Creating file for ${bowlerJsonFile}`,
          });
        });
    });
	} catch (error) {

	}


  //check for the bowlerFile and creating for the bowler file END

  // READ Players File START
  let populateBowlerStats = await fsPromise.readFile(`${bowlerJsonFile}`, "utf-8");
  let arraypopulateBowlerStats: bowlerDetails[] = JSON.parse(populateBowlerStats);
  // READ Players File END

  if (bowlerList) arraypopulateBowlerStats.push(bowlerList);

  // writing Players File Again START
  let writepopulateBowlerStats = await fsPromise
    .writeFile(`${bowlerJsonFile}`, JSON.stringify(arraypopulateBowlerStats), "utf-8")
    .catch((e) => {
      console.log(
        "%croute.ts line:101  error while writng bowlerList",
        "color: #007acc;",
        bowlerList
      );
      return NextResponse.json({
        status: false,
        msg: "error while writng bowlerList",
      });
    });
  // writing Players File Again START
  return NextResponse.json({
    status: true,
    arraypopulateBowlerStats,
  });
  // const ballByBallFIlePath = `${currentInningPath}/ballByBall.json`;
}
