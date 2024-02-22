import getPlayers from "@/app/Utils/playersUtils";
import { Player } from "@/app/interfaces/matchScoreboard.interface";
import { setFielder } from "@/redux/features/slices/inningsTrackSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Players = () => {
  const selector = useAppSelector((state) => state.matchSliceReducer);
  const wicketSelector = useAppSelector((state) => state.inningsTrackSlice);
  const dispatch = useDispatch<AppDispatch>();
  const [bowlingTeamPlayers, setBowlingTeamPlayer] = useState<Player[]>([]);
  const [selectFielder, setSelectFielder] = useState<Player>({});
  useEffect(() => {
    const inningNumber = selector?.inning_number || 0;
    if (inningNumber > 0) {
      const bowlingTeam:any = getPlayers({
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

  const selectPlayer = (player: Player) => {
    if (player.player_id) {
      dispatch(setFielder(player?.player_id));
      setSelectFielder(player);
      console.log(player);
    }
  };
  return (
    <div className="grid grid-cols-3  gap-4">
      {bowlingTeamPlayers.flatMap((item: Player) => {
        const nameParts:any = item.name?.split(" ");
        const firstNameInitials =
          nameParts?.length > 0 ? nameParts[0]?.substring(0, 1) : "";
        const lastNameInitials =
          nameParts?.length > 1 ? nameParts[1]?.substring(0, 1) : "";
        return (
          <div
            onClick={() => selectPlayer(item)}
            className={`flex flex-row gap-2 hover:cursor-pointer  items-center shadow-md  shadow-slate-300 p-2 rounded-md h-12 ${
              item.player_id === wicketSelector.fielder_player_id
                ? "bg-red-700"
                : "bg-black"
            } `}
          >
            <div className="flex rounded-full h-8 w-8 object-cover justify-center bg-white shadow-md items-center">
              <p className="text-center align-middle ">
                {firstNameInitials}
                {lastNameInitials}
              </p>
            </div>
            <div>
              <h4 className="uppercase text-white">
                {item.name?.split(" ")[0]}
              </h4>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Players;
