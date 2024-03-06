import getPlayers from "@/app/Utils/playersUtils";
import { Player } from "@/app/interfaces/matchScoreboard.interface";
import { useAppSelector } from "@/redux/store";
import { Select } from "antd";
import React, { useEffect, useState } from "react";

const fieldingOption = [
  { label: "Bad Anticipation", value: "Bad Anticipation" },
  { label: "Brilliant Chase", value: "Brilliant Chase" },
  { label: "Byes Given", value: "Byes Given" },
  { label: "Catch Dropped", value: "Catch Dropped" },
  { label: "Catch Taken", value: "Catch Taken" },
  { label: "Caught and Bowled", value: "Caught and Bowled" },
  { label: "Direct Hit", value: "Direct Hit" },
  { label: "Dive and Miss", value: "Dive and Miss" },
  { label: "Good Anticipation", value: "Good Anticipation" },
  { label: "Run Out", value: "Run Out" },
  { label: "Stumping", value: "Stumping" },
  { label: "Boundary Save", value: "Boundary Save" },
  { label: "Six Save", value: "Six Save" },
  { label: "Overthrow", value: "Overthrow" },
  // Add more events as needed
];
const Fielders = () => {

	const selector = useAppSelector((state) => state.matchSliceReducer);
  const [bowlingTeamPlayer, setBowlingTeamPlayer] = useState<Player[]>([]);

  useEffect(() => {
    const inningNumber = selector?.inning_number || 0;

    if (inningNumber > 0) {
      const battingTeam: any = getPlayers({
        //@ts-ignore
        currentInnings: Number(inningNumber),
        key: "bowling",
        matchData: selector,
      }).then((battingTeam: any) => {
        if (battingTeam && battingTeam?.length > 0) {
          setBowlingTeamPlayer(battingTeam);
        }
      });
    }

    return () => setBowlingTeamPlayer([]);
  }, [selector?.inning_number && selector]);
  return (
    <div className="flex flex-row gap-2">
      <Select  key={"Shewag"} defaultValue={"sachin"}>
				{
					bowlingTeamPlayer.map(fielder=> {
					return	<Select.Option key={fielder.player_id}>{fielder.name}</Select.Option>
					})
				}

      </Select>

      <Select key={"Shewag"} defaultValue={fieldingOption[0].value}>
        {fieldingOption.map((item) => {
          return <Select.Option key={item.value}>{item.label}</Select.Option>;
        })}
      </Select>
    </div>
  );
};

export default Fielders;
