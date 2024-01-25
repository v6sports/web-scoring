"use client";
import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { useAppSelector } from "@/redux/store";
import { Player } from "@/app/interfaces/matchScoreboard.interface";
import getPlayers from "@/app/Utils/playersUtils";

const Batsman: React.FC<any> = (props) => {
  const selector = useAppSelector((state) => state.matchSliceReducer);
  const [battingTeamPlayers, setBattingTeamPlayer] = useState<Player[]>([]);

  useEffect(() => {
    const inningNumber = selector?.inning_number || 0;
    if (inningNumber > 0) {
      const battingTeam = getPlayers({
        //@ts-ignore
        currentInnings: inningNumber,
        key: "batting",
        matchData: selector,
      });
      if (battingTeam && battingTeam?.length > 0) {
        setBattingTeamPlayer(battingTeam);
      }
    }

    return () => setBattingTeamPlayer([]);
  }, [selector?.inning_number && selector]);

  return (
    <div className="flex flex-col rounded-lg w-full justify-center items-center bg-green-100">
      {/* <p className="uppercase text-xs font-bold underline">Batsman</p> */}
      <div
        id="playerOnStrike "
        className="flex-1 flex flex-row items-center  gap-4"
      >
        <Select
          key={"Shewag"}
          variant="filled"
					style={{ width: '150px' }}
          className="bg-green-300 rounded border-1 border-purple-800 w-36"
          defaultValue={"sachin"}
        >
          {battingTeamPlayers?.flatMap((player) => {
            return (
              <Select.Option key={player.player_id}>
                {player.name}
              </Select.Option>
            );
          })}
        </Select>

        <div className="flex flex-row gap-3">
          <div className="flex flex-col justify-center">
            <p className="text-center  font-extralight text-sm">R</p>
            <p className="text-center text-xs">100</p>
          </div>
          <div className="flex flex-col">
            <p className="text-center  font-extralight text-sm">B</p>
            <p className="text-center text-xs">100</p>
          </div>
          <div className="flex flex-col">
            <p className="text-center  font-extralight text-sm">4</p>
            <p className="text-center text-xs">10</p>
          </div>
          <div className="flex flex-col">
            <p className="text-center font-extralight text-sm">6</p>
            <p className="text-center text-xs">6</p>
          </div>
          <div className="flex flex-col">
            <p className="text-center  font-extralight text-sm">SR</p>
            <p className="text-center text-xs">100</p>
          </div>
        </div>

        <div>
          <Select defaultValue={"rhb"}>
            <Select.Option key={"rhb"}>RHB</Select.Option>
            <Select.Option key={"lhb"}>LHB</Select.Option>
          </Select>
        </div>
      </div>
      <div id="playerNOnStrike " className="flex flex-row items-center  gap-4">
        <Select style={{ width: '150px' }} key={"Shewag"} defaultValue={"Shewag"}>
          {battingTeamPlayers?.flatMap((player) => {
            return (
              <Select.Option key={player.player_id}>
                {player.name}
              </Select.Option>
            );
          })}
        </Select>

        <div className="flex flex-row gap-3">
          <div className="flex flex-col w-full">
            {/* <p className="text-center">R</p> */}
            <p className="text-center text-xs w-full">100</p>
          </div>
          <div className="flex flex-col w-full">
            {/* <p className="text-center">B</p> */}
            <p className="text-center text-xs w-full">100</p>
          </div>
          <div className="flex flex-col w-full">
            {/* <p className="text-center">4'S</p> */}
            <p className="text-center text-xs w-full">10</p>
          </div>
          <div className="flex flex-col w-full">
            {/* <p className="text-center">6'S</p> */}
            <p className="text-center text-xs w-full">6</p>
          </div>
          <div className="flex flex-col w-full">
            {/* <p className="text-center">SR</p> */}
            <p className="text-center text-xs w-full">100</p>
          </div>
        </div>
        <div>
          <Select defaultValue={"rhb"}>
            <Select.Option key={"rhb"}>RHB</Select.Option>
            <Select.Option key={"lhb"}>LHB</Select.Option>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Batsman;
