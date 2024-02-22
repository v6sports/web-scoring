import getPlayers from "@/app/Utils/playersUtils";
import { fetchScoreApi, inningsRunRate } from "@/app/Utils/utils";
import { useAppSelector } from "@/redux/store";
import { Collapse } from "antd";
import React, { useEffect } from "react";
import Extras from "../extras";

const LiveScore = () => {
	const selector:any = useAppSelector((state) => state.matchSliceReducer);

	const [battingTeamNameInInnings, setBattingTeamNameInInnings] =
    React.useState<any>([]);
	const inningSelector = useAppSelector((state) => state.inningsTrackSlice);
  const scoreBallByBallData = useAppSelector(
    (state) => state.scoreBallByBallSlice
  );
	const init = async () => {
		const inningNumber = inningSelector.inning_number || 0;
		let maxNumberOfInning = Number(inningNumber);
		const arrayForTeam = [];
		for (let i = 0; i <= maxNumberOfInning; i++) {
      if (i <= maxNumberOfInning && i > 0) {
        let teamName = getPlayers(
          {
            currentInnings: Number(i + 1),
            key: "batting",
            matchData: selector,
          },

        );
        let teamScore:any = await fetchScoreApi(selector.match_id, i.toString());
        console.log(teamScore?.data, "teamScore");
        arrayForTeam.push({
          teamName,
          inningNumber: i,
          scoreBoard: teamScore?.data || [],
        });
      }
    }
	setBattingTeamNameInInnings(arrayForTeam);
	console.log(arrayForTeam,"arrayForTeam")
}
  useEffect(() => {
	init()
  }, []);
	const fullScoreBoard = scoreBallByBallData.fullScore;

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-2">
        <code className="text-lg font-light">IND</code>
        <code className="text-lg font-extrabold">
          {fullScoreBoard?.totalRuns} / {fullScoreBoard?.wickets?.length}
        </code>
        <code className="text-lg font-light">
          ( {fullScoreBoard?.totalOvers})
        </code>
        <code className="text-xs font-light text-purple-600">
          CR{" "}
          {inningsRunRate(
            fullScoreBoard?.totalRuns ? fullScoreBoard?.totalRuns : 0,
            fullScoreBoard?.validBalls ? fullScoreBoard?.validBalls : 0
          )}
        </code>
      </div>
      <Collapse>

        <Collapse.Panel header="Scores" key="1" className="bg-green-200">
          {battingTeamNameInInnings?.length > 0 &&
            battingTeamNameInInnings?.map((e:any) => {
              let scoreboardFull = e?.scoreBoard?.fullScore;
              return (
                <div className="flex flex-row items-center gap-2">
                  <code className="text-xs font-extrabold">
                    {e.teamName || ""}
                  </code>
                  <code className="text-xs font-extrabold">
                    {scoreboardFull?.totalRuns || 0}/
                    {scoreboardFull?.wickets.length || 0}
                  </code>
                  <code className="text-xs font-light">
                    Ov. {scoreboardFull?.totalOvers || "0.0"}
                  </code>
                  <code className="text-xs font-extrabold">
                    (INN-{e?.inningNumber || ""} )
                  </code>
                </div>
              );
            })}
        </Collapse.Panel>
      </Collapse>
      <div className="mt-4">
        <Extras
          extrasFromScore={
            battingTeamNameInInnings[battingTeamNameInInnings.length - 1]
              ?.scoreBoard?.fullScore?.extraRuns
          }
        />
      </div>
    </div>
  );
};

export default LiveScore;
