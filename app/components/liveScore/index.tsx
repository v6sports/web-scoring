import getPlayers from "@/app/Utils/playersUtils";
import { fetchScoreApi, inningsRunRate } from "@/app/Utils/utils";
import { useAppSelector } from "@/redux/store";
import { Button, Collapse } from "antd";
import React, { useEffect } from "react";
import Extras from "../extras";

const LiveScore = () => {
  const selector: any = useAppSelector((state) => state.matchSliceReducer);
  const [teamsName, setTeamsName] = React.useState<any>({
    teamOne: "",
    teamTwo: "",
  });
  const [battingTeamNameInInnings, setBattingTeamNameInInnings] =
    React.useState<any>([]);
  const inningSelector = useAppSelector((state) => state.inningsTrackSlice);
  const scoreBallByBallData = useAppSelector(
    (state) => state.scoreBallByBallSlice
  );
  const init = async () => {
    const inningNumber = inningSelector.inning_number || 0;
    setTeamsName({
      teamOne: selector?.match_details?.team_a_new_det?.name || "",
      teamTwo: selector?.match_details?.team_b_new_det?.name || "",
    });

    let maxNumberOfInning = Number(inningNumber);
    const arrayForTeam = [];
    for (let i = 0; i <= maxNumberOfInning; i++) {
      if (i <= maxNumberOfInning && i > 0) {
        let teamName = getPlayers(
          {
            currentInnings: Number(inningNumber),
            key: "batting",
            matchData: selector,
          },
          "Name"
        );
        let teamScore: any = await fetchScoreApi(
          selector.match_id,
          i.toString()
        );
        console.log(teamScore);
        arrayForTeam.push({
          teamName,
          inningNumber: i,
          scoreBoard: teamScore?.data || [],
        });
      }
    }
    setBattingTeamNameInInnings(arrayForTeam);
  };
  useEffect(() => {
    init();
  }, []);

  const selectName = (name: string, inningNumber: number) => {


    return name;
  };
  const fullScoreBoard = scoreBallByBallData.fullScore;

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-2">
        <code className="text-lg font-light">
          {
            (selectName(
              battingTeamNameInInnings[Number(inningSelector.inning_number) - 1]
                ?.teamName, Number(inningSelector?.inning_number))
            )

          }
        </code>
        <code className="text-lg font-extrabold">
          {fullScoreBoard?.totalRuns}/{fullScoreBoard?.wickets?.length}
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
            battingTeamNameInInnings?.map((e: any,index:number) => {
              let scoreboardFull = e?.scoreBoard?.fullScore;
              return (
                <div className="flex flex-row items-center gap-2">
                  <code className="text-xs font-extrabold">
                    {"Inning "+(index+1)+" "}-
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
