/** this will calulate the score */
import fsPrmoise from "fs/promises";
import { IballByBall } from "@/app/interfaces/ballByBall.interface";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const ballScore: IballByBall = await req.json();
  const matchPath = `./data/${ballScore.match_id}`;

  fsPrmoise.access(`${matchPath}`).catch((e) => {
    console.log("No Match Found");
    return NextResponse.json({
      status: false,
      msg: "no match found",
    });
  });

  const readMatchCompleteData: [] = await fsPrmoise
    .readdir(matchPath, "utf-8")
    .catch((e) => {
      console.log("Over Not Present");
    });
		console.log(readMatchCompleteData,"MATCH")
	// return	NextResponse.json(readMatchCompleteData)
  let matchSocre = readMatchCompleteData.filter(
    (e) => ballScore.inning_number == e
  );

	console.log(matchSocre);

  // const readAllOvers = await fsPrmoise.readdir(`${matchPath}/${matchSocre[0]}`);
  const readAllOverbyOver = await fsPrmoise.readdir(
    `${matchPath}/${matchSocre[0]}/over`
  );

  // Getting last twoOver START
  let currentOver = [];
  let lastOver = [];
  try {
    const sortedFileNames = readAllOverbyOver?.sort((a, b) => {
      const numberA = parseInt(a.match(/\d+/)?.[0], 10) || 0;
      const numberB = parseInt(b.match(/\d+/)?.[0], 10) || 0;
      return numberA - numberB;
    });
    let lastTwoBiggestValues = sortedFileNames.slice(-2);
    lastTwoBiggestValues = lastTwoBiggestValues.reverse();

    try {
      currentOver = await fsPrmoise.readFile(
        `${matchPath}/${matchSocre[0]}/over/${lastTwoBiggestValues[0]}`,
        "utf-8"
      );
      currentOver = JSON.parse(currentOver);
    } catch (error) {
      console.log("ERROR while getting last over");
    }
    try {
      lastOver = await fsPrmoise.readFile(
        `${matchPath}/${matchSocre[0]}/over/${lastTwoBiggestValues[1]}`,
        "utf-8"
      );
      lastOver = JSON.parse(lastOver);
    } catch (error) {
      console.log("ERROR while getting last over");
    }
  } catch (error) {
    console.log("%croute.ts line:54 object", "color: #007acc;", error);
  }
  // Getting last twoOver END

  let readAllOversData: [] = await fsPrmoise.readFile(
    `${matchPath}/${matchSocre[0]}/ballByBall.json`,
    "utf-8"
  );
  let totalRuns = 0;
  let validBalls = 0;
  let totalOvers = 0;
  if (readAllOversData.length > 0) {
    readAllOversData = JSON.parse(readAllOversData);

    const oversData = readAllOversData;

    oversData.forEach((over) => {
      //   console.log(over);
      totalRuns += over.runs;
      if (over.extra_type != "no-ball" && over.extra_type != "wide") {
        validBalls += 1;
      }
    });
    // validBalls = validBalls - 1;
    // Calculate total overs
    totalOvers = Math.floor(validBalls / 6) + (validBalls % 6) / 10;
  }

  return NextResponse.json({
    // overByOver: readAllOversData,
    fullScore: {
      currentOver: currentOver,
      previousOver: lastOver,
      lastBallOfOver: readAllOversData[readAllOversData.length - 1],
      validBalls: validBalls,
      totalOvers,
      totalRuns,
    },
  });
}
