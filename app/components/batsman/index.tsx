"use client";
import React, { useEffect, useState } from "react";
import { Button, Select, message } from "antd";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { Player } from "@/app/interfaces/matchScoreboard.interface";
import getPlayers from "@/app/Utils/playersUtils";
import { IballByBall } from "@/app/interfaces/ballByBall.interface";
import { useDispatch } from "react-redux";
import ballByBallSlice, {
  setBatterNonStrike,
  setBatterOnStrike,
} from "@/redux/features/slices/ballByBallSlice";
import Axios from "axios";
import { batsmanDetails } from "@/app/interfaces/batter.interface";
import { calculateStrikeRate, checkNullfy } from "@/app/Utils/utils";
import { setBatsman } from "@/redux/features/slices/inningsTrackSlice";
import { setBattingPlayers } from "@/redux/features/slices/teams/battingTeamSlice";
import { setMatchSaveFalseStatus, setMatchSaveTrueStatus } from "@/redux/features/slices/matchSaveSlice";

const Batsman: React.FC<any> = (props) => {
  const selector = useAppSelector((state) => state.matchSliceReducer);
	const inningSelector = useAppSelector((state) => state.inningsTrackSlice);
	const ballByBallResponse:any = useAppSelector((state) => state.ballByBallSlice);
	const wicketsTracker = useAppSelector((state) => state.scoreBallByBallSlice);
  const [onStrikeStats, setOnStrikeStats] = useState<batsmanDetails>({
    boundariesInFour: 0,
    boundariesInSix: 0,
    runs: 0,
    numberOfBallsPlayed: 0,
    player_id: "",
  });
  const [nonStrikeStats, setNonStrikeStats] = useState<batsmanDetails>({
    boundariesInFour: 0,
    boundariesInSix: 0,
    runs: 0,
    numberOfBallsPlayed: 0,
    player_id: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const [battingTeamPlayers, setBattingTeamPlayer] = useState<Player[]>([]);

  useEffect(() => {
    const inningNumber = inningSelector.inning_number || 0;
	  if (Number(inningNumber) > 0) {

      const battingTeam:any = getPlayers({
        //@ts-ignore
        currentInnings: Number(inningNumber),
        key: "batting",
        matchData: selector,
      });
      if (battingTeam && battingTeam?.length > 0) {

				dispatch(setBattingPlayers([...battingTeam]));
        setBattingTeamPlayer(battingTeam);
      }
    }

		if (
      Number(ballByBallResponse.on_strike) < 0 ||
      Number(ballByBallResponse.non_strike) < 0
    ) {
      dispatch(setMatchSaveFalseStatus());
    }

    return () => setBattingTeamPlayer([]);
  }, [inningSelector?.inning_number && selector]);

  const battingStats = async (playerId:any) => {
    const fetchBattingStats = await Axios.request({
      url: "/api/batsmanRunsScoredInInnings",
      method: "POST",
      data: {
        matchId: selector.match_id,
        inningNumber: inningSelector?.inning_number,
        playerId: playerId,
      },
    });
    return fetchBattingStats.data;
  };

  useEffect(() => {
    if (ballByBallResponse.non_strike != -1 &&  ballByBallResponse.non_strike) {
      battingStats(ballByBallResponse.non_strike).then((res) => {
        setNonStrikeStats(res);
      });
    }
    if (ballByBallResponse.on_strike != -1 && ballByBallResponse.on_strike) {
			dispatch(setBatsman(ballByBallResponse.on_strike));
      battingStats(ballByBallResponse.on_strike).then((res) => {
        setOnStrikeStats(res);
      });
    }
  }, [JSON.stringify(ballByBallResponse)]);

  const strikerBatsman = (player: number) => {
		message.destroy();
		message.loading("Changing On Strike Batsman");
		if (
      Number(ballByBallResponse.on_strike) > 0 &&
      Number(ballByBallResponse.on_attack) > 0
    ) {
      dispatch(setMatchSaveTrueStatus());
    }

    dispatch(setBatterOnStrike(player));
		message.destroy();
		message.success("On Strike Batsman Changed");
  };
  const nonStrikerBatsman = (player: number) => {
		if (
      Number(ballByBallResponse.on_strike) > 0 &&
      Number(ballByBallResponse.on_attack) > 0
    ) {
      dispatch(setMatchSaveTrueStatus());
    }
    dispatch(setBatterNonStrike(player));
  };

	const swapBatsman = () => {
		let _onStrike = ballByBallResponse.on_strike;
		let _nonStrike = ballByBallResponse.non_strike;
		dispatch(setBatterOnStrike(_nonStrike));
		dispatch(setBatterNonStrike(_onStrike));
		console.log(ballByBallResponse)
	}
  return (
    <div className="flex flex-col rounded-lg w-full justify-center items-center bg-green-100">
      {/* <p className="uppercase text-xs font-bold underline">Batsman</p> */}

      <div
        id="playerOnStrike "
        className="flex-1 flex flex-row items-center  gap-4 w-full justify-center"
      >
				{battingTeamPlayers.length > 0 && (
          <Select
            key={parseInt(ballByBallResponse?.on_strike)}
            variant="filled"
						// disabled={wicketsTracker.fullScore?.wickets[0]}
            style={{ width: "150px" }}
            onSelect={strikerBatsman}
            defaultOpen={!checkNullfy(ballByBallResponse?.on_strike)}

            className="bg-green-300 rounded border-1 border-purple-800 w-36"
            defaultValue={ballByBallResponse?.on_strike}
          >
            {battingTeamPlayers?.flatMap((player) => {
						let isPlayerOut = 	wicketsTracker.fullScore?.wickets?.findIndex((e=> player.player_id == e.batsman_player_id))

							return isPlayerOut == -1 && ballByBallResponse?.non_strike != player.player_id ? (
                <Select.Option  key={player.player_id}>
                  {player.name}
                </Select.Option>
              ) : (
                <></>
              );
            })}
          </Select>
        )}

        <div className="flex flex-row gap-3 ">
          <div className="flex flex-col justify-center w-full">
            <p className="text-center  font-extralight text-sm">R</p>
            <p className="text-center text-xs">{onStrikeStats.runs || 0}</p>
          </div>
          <div className="flex flex-col justify-center w-full">
            <p className="text-center  font-extralight text-sm">B</p>
            <p className="text-center text-xs">
              {onStrikeStats.numberOfBallsPlayed || 0}
            </p>
          </div>
          <div className="flex flex-col justify-center w-full">
            <p className="text-center  font-extralight text-sm">4</p>
            <p className="text-center text-xs">
              {onStrikeStats.boundariesInFour || 0}
            </p>
          </div>
          <div className="flex flex-col justify-center w-full">
            <p className="text-center font-extralight text-sm">6</p>
            <p className="text-center text-xs">
              {onStrikeStats.boundariesInSix || 0}
            </p>
          </div>
          <div className="flex flex-col justify-center w-full">
            <p className="text-center  font-extralight text-sm">SR</p>
            <p className="text-center text-xs">
              {calculateStrikeRate(
                onStrikeStats.runs,
                onStrikeStats.numberOfBallsPlayed
              )}
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center w-fit p-2">
          <Select defaultValue={"rhb"}>
            <Select.Option key={"rhb"}>RHB</Select.Option>
            <Select.Option key={"lhb"}>LHB</Select.Option>
          </Select>
        </div>
      </div>
      <div id="playerNOnStrike " className="flex flex-row items-center  gap-4 w-full justify-center">
        <Select
          style={{ width: "150px" }}
          defaultOpen={!checkNullfy(ballByBallResponse?.non_strike)}
          onSelect={nonStrikerBatsman}
          key={parseInt(ballByBallResponse?.non_strike)}
          defaultValue={ballByBallResponse?.non_strike}
        >
          {battingTeamPlayers?.flatMap((player) => {
						let isPlayerOut = 	wicketsTracker.fullScore?.wickets?.findIndex((e=> player.player_id == e.batsman_player_id))

					return    isPlayerOut == -1 && ballByBallResponse?.on_strike != player.player_id ? (
              <Select.Option key={player.player_id}>
                {player.name}
              </Select.Option>
            ) : (
              <></>
            );
          })}
        </Select>

        <div className="flex flex-row gap-3">
          <div className="flex flex-col justify-center w-full">
            {/* <p className="text-center">R</p> */}
            <p className="text-center text-xs w-full">
              {nonStrikeStats.runs || 0}
            </p>
          </div>
          <div className="flex flex-col justify-center w-full">
            {/* <p className="text-center">B</p> */}
            <p className="text-center text-xs w-full">
              {nonStrikeStats.numberOfBallsPlayed || 0}
            </p>
          </div>
          <div className="flex flex-col justify-center w-full">
            {/* <p className="text-center">4'S</p> */}
            <p className="text-center text-xs w-full">
              {nonStrikeStats.boundariesInFour || 0}
            </p>
          </div>
          <div className="flex flex-col justify-center w-full">
            {/* <p className="text-center">6'S</p> */}
            <p className="text-center text-xs w-full">
              {nonStrikeStats.boundariesInSix || 0}
            </p>
          </div>
          <div className="flex flex-col justify-center w-full">
            {/* <p className="text-center">SR</p> */}
            <p className="text-center text-xs w-full">
              {calculateStrikeRate(
                nonStrikeStats.runs,
                nonStrikeStats.numberOfBallsPlayed
              )}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center w-fit p-2">
          <Select defaultValue={"rhb"}>
            <Select.Option key={"rhb"}>RHB</Select.Option>
            <Select.Option key={"lhb"}>LHB</Select.Option>
          </Select>
        </div>
      </div>
			<Button className="bg-red-900 text-white" onClick={swapBatsman}>Change Strike</Button>
    </div>
  );
};

export default Batsman;
