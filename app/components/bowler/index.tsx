import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { useAppSelector } from "@/redux/store";
import { Player } from "@/app/interfaces/matchScoreboard.interface";
import getPlayers from "@/app/Utils/playersUtils";

interface Bolwer {
  onStrikebowler: playingbowlerStats;
  offStrikebowler: playingbowlerStats;
  bowlerList: playingbowlerStats[];
}
interface playingbowlerStats {
  name: string;
  runs: string;
  boundaries: string;
  sixes: string;
}
const Bolwer = () => {


	const selector = useAppSelector((state) => state.matchSliceReducer);
  const [bowlingTeamPlayers, setBowlingTeamPlayer] = useState<Player[]>([]);

  useEffect(() => {
    const inningNumber = selector?.inning_number || 0;
    if (inningNumber > 0) {
      const bowlingTeam = getPlayers({
        //@ts-ignore
        currentInnings: inningNumber,
        key: "bowling",
        matchData: selector,
      });
      if (bowlingTeam && bowlingTeam?.length > 0) {
        setBowlingTeamPlayer(bowlingTeam);
      }
    }

    return () => setBowlingTeamPlayer([]);
  }, [selector?.inning_number && selector]);


  //   const { bowlerList = [], offStrikebowler, onStrikebowler } = props;
  return (
    <div className="flex flex-col gap-1  w-full justify-center items-center  rounded-lg border border-gray-200 border-1 bg-red-100">
      {/* <p className="uppercase text-xs font-bold underline">Bolwer</p> */}
      <div id="playerOnStrike " className="flex flex-row items-center  gap-4 w-max">
        <Select   key={"Shewag"} style={{ width: '150px' }}  popupMatchSelectWidth defaultValue={"Shewag"}>
					{
						bowlingTeamPlayers.flatMap(bowler =>{
								return (
                  <Select.Option key={bowler.player_id}>
                    {bowler.name}
                  </Select.Option>
                );
						})
					}

        </Select>

        <div className="flex flex-row gap-3">
          <div className="flex flex-col justify-center">
            <p className="text-center  font-extralight text-xs text-lightTextColor">
              O
            </p>
            <p className="text-center text-lightTextColor text-xs">10.4</p>
          </div>
          <div className="flex flex-col">
            <p className="text-center  font-extralight text-xs text-lightTextColor">
              R
            </p>
            <p className="text-center text-lightTextColor text-xs">20</p>
          </div>

          <div className="flex flex-col">
            <p className="text-center font-extralight text-xs text-lightTextColor">
              W
            </p>
            <p className="text-center text-lightTextColor text-xs">2</p>
          </div>
          <div className="flex flex-col">
            <p className="text-center  font-extralight text-xs text-lightTextColor">
              EC
            </p>
            <p className="text-center text-lightTextColor text-xs">4.2</p>
          </div>

          <div className="flex flex-col">
            <p className="text-center  font-extralight text-xs text-lightTextColor">
              EX
            </p>
            <p className="text-center text-lightTextColor text-xs">4</p>
          </div>
        </div>

        <Select   defaultValue={"rhb"}>
          <Select.Option key={"rhb"}>RHB</Select.Option>
          <Select.Option key={"lhb"}>LHB</Select.Option>
        </Select>
      </div>
      <div className="flex flex-row gap-1">
        <Select defaultValue={"around"}>
          <Select.Option key="around">Around WKT</Select.Option>
          <Select.Option key="over">over the WKT</Select.Option>
          <Select.Option key="diagonal">Digonal</Select.Option>
        </Select>

        <Select
          style={{ fontSize: 8 }}
          defaultValue={"pav"}
          className="text-xs"
        >
          <Select.Option key="pav">
            <p className="text-xs">Pav End</p>
          </Select.Option>
          <Select.Option key="far">far End</Select.Option>
        </Select>
      </div>
    </div>
  );
};

export default Bolwer;
