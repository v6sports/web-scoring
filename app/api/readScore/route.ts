/** this will calulate the score */
import fsPrmoise from "fs/promises";
import { IballByBall } from "@/app/interfaces/ballByBall.interface";
import { NextResponse } from "next/server";
import { strikeConfirm } from "@/app/Utils/playersUtils";
import { IinningTracker } from "@/app/interfaces/inningsTracker.interface";

export async function POST(req: Request) {
  const ballScore: IballByBall = await req.json();
  const matchPath = `./data/${ballScore.match_id}`;
	const inningsTracker = `./data/${ballScore.match_id}/${ballScore.inning_number}/inningsTracker.json`;

	fsPrmoise.access(`${matchPath}`).catch((e) => {
    console.log("No Match Found");
    return NextResponse.json({
      status: false,
      msg: "no match found",
    });
  });

  const readMatchCompleteData: any = await fsPrmoise
    .readdir(matchPath, "utf-8")
    .catch((e) => {
      console.log("Over Not Present");
    });
		console.log(readMatchCompleteData,"MATCH");
	// return	NextResponse.json(readMatchCompleteData)
  let matchSocre = readMatchCompleteData.filter(
    (e:any) => ballScore.inning_number == e
  );

	console.log(matchSocre);

  // const readAllOvers = await fsPrmoise.readdir(`${matchPath}/${matchSocre[0]}`);
  const readAllOverbyOver = await fsPrmoise.readdir(
    `${matchPath}/${matchSocre[0]}/over`
  );

  // Getting last twoOver START
  let currentOver:any = [];
  let lastOver:any = [];
  try {
    const sortedFileNames = readAllOverbyOver?.sort((a, b) => {
			//@ts-ignore
      const numberA = parseInt(a.match(/\d+/)?.[0], 10) || 0;
				//@ts-ignore
      const numberB = parseInt(b.match(/\d+/)?.[0], 10) || 0;
      return numberA - numberB;
    });
    let lastTwoBiggestValues = sortedFileNames.slice(-2);
    lastTwoBiggestValues = lastTwoBiggestValues.reverse();

    try {
				//@ts-ignore
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

  let readAllOversData: any = await fsPrmoise.readFile(
    `${matchPath}/${matchSocre[0]}/ballByBall.json`,
    "utf-8"
  );
  let totalRuns = 0;
  let validBalls = 0;
	let extraRuns = {
		wide:0,
		noBall:0,
		legBye:0,
		bye:0
	};
  let totalOvers = 0;
  if (readAllOversData.length > 0) {
    readAllOversData = JSON.parse(readAllOversData);

    const oversData = readAllOversData;

    oversData.forEach((over:any) => {

			if (!over.extra_type) {
        totalRuns += over.runs;
        validBalls += 1;
      }

      if ( over.extra_type == "wide") {
        let extraRunsWide = extraRuns.wide + 1;
        if (over?.runs && over?.runs > 0)
          extraRunsWide = extraRunsWide + over.runs;
        extraRuns["wide"] = extraRunsWide;
      }

      if (over.extra_type == "no-ball") {
        let extraRunsWide = extraRuns.noBall + 1;
        if (over?.runs && over?.runs > 0) {
          totalRuns += over.runs;
        }
        extraRuns["noBall"] = extraRunsWide;
      }

			if (over.extra_type == "leg-bye") {
        let extraRunsWide = extraRuns.legBye + over?.extras || 0;
        extraRuns["legBye"] = extraRunsWide;
				validBalls += 1;
      }
			if (over.extra_type == "bye") {
        let extraRunsWide = extraRuns.bye + over?.extras || 0;
        extraRuns["bye"] = extraRunsWide;
				validBalls += 1;
      }

    });
    // validBalls = validBalls - 1;
    // Calculate total overs
    totalOvers = Math.floor(validBalls / 6) + (validBalls % 6) / 10;
  }
	const sumOfExtras = Object.values(extraRuns).reduce((total, value) => total + value, 0);

	let lastBallOfOver : IballByBall = readAllOversData[readAllOversData.length - 1];
	let rrr = strikeConfirm(lastBallOfOver);

	try {
		lastBallOfOver['on_strike'] = rrr.onStrikeBatsman;
		lastBallOfOver['non_strike'] = rrr.nonStrikeBatsman;
	} catch (error) {

	}


	// calculate the wickets in the innings

	let wickets: any[] = [];


	try {

		await fsPrmoise.readFile(inningsTracker,"utf-8").then((data:any) => {
			data = JSON.parse(data);

			data.forEach((e:any) => {
				if (e?.out_method != -1) {
					wickets.push(e);
				}
			})
		})
	} catch (error) {

	}

  return NextResponse.json({
    // overByOver: readAllOversData,
    fullScore: {
      currentOver: currentOver,
      previousOver: lastOver,
			wickets:wickets,
      lastBallOfOver:{
				...lastBallOfOver
			},
      validBalls: validBalls,
			extraRuns,
      totalOvers,
      totalRuns:totalRuns+sumOfExtras,
    },
  });
}
