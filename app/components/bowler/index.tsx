import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { AppDispatch, useAppSelector } from "@/redux/store";
import {
  Bowling,
  BowlingStats,
  Player,
} from "@/app/interfaces/matchScoreboard.interface";
import getPlayers from "@/app/Utils/playersUtils";
import { bowlerDetails } from "@/app/interfaces/bowler.interface";
import Axios from "axios";
import { useDispatch } from "react-redux";
import {
  setBowlerEmpty,
  setBowlerOnAttack,
} from "@/redux/features/slices/ballByBallSlice";
import { setBowler } from "@/redux/features/slices/inningsTrackSlice";
import { setLastOverBolwedBy } from "@/redux/features/slices/matchSlice";
import { setBowlingPlayers } from "@/redux/features/slices/teams/bowlingTeamSlice";
import { setMatchSaveFalseStatus, setMatchSaveTrueStatus } from "@/redux/features/slices/matchSaveSlice";

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
  const ballByBallResponse = useAppSelector((state) => state.ballByBallSlice);
  const inningsSlice = useAppSelector((state) => state.inningsTrackSlice);
  const [isBolwerSelected, setIsBolwerSelected] = useState(false);

  const scoreBallByBallData = useAppSelector(
    (state) => state.scoreBallByBallSlice
  );
  const [playerBowlerStats, setPlayerBowlerStats] = useState<bowlerDetails>({
    runs: 0,
    player_id: "",
    ballNumber: 0,
    wickets: 0,
    overNumber: 0,
  });
  const dispatch = useDispatch<AppDispatch>();
  const selector = useAppSelector((state) => state.matchSliceReducer);
	const inningSelector = useAppSelector((state) => state.inningsTrackSlice);
  const [bowlingTeamPlayers, setBowlingTeamPlayer] = useState<Player[]>([]);

  const [onAttackStats, setOnAttackStats] = useState<bowlerDetails>({
    wickets: 0,
    ballNumber: 0,
    runs: 0,
    side: "around",
    bowlingHand: "rhb",
    player_id: "",
  });

  useEffect(() => {
    const inningNumber = Number(inningsSlice.inning_number) || 0;
    if (inningNumber > 0) {

      const bowlingTeam = getPlayers({
        //@ts-ignore
        currentInnings: inningNumber,
        key: "bowling",
        matchData: selector,
      });
      console.log(bowlingTeam, "BOWLING TEAM");
      if (bowlingTeam && bowlingTeam?.length > 0) {
        dispatch(setBowlingPlayers([...bowlingTeam]));
        let bowlersListInReverseOrder = [...bowlingTeam];
        setBowlingTeamPlayer(bowlersListInReverseOrder.reverse());
      }
    }

    // return () => setBowlingTeamPlayer([]);
  }, [inningSelector?.inning_number && selector]);

  const bowlingStats = async (playerId) => {
    if (playerId) {
      bowlerStats(playerId);
      const fetchBattingStats = await Axios.request({
        url: "/api/bowlerRecordsBallByBall",
        method: "POST",
        data: {
          matchId: selector.match_id,
          inningNumber: inningSelector?.inning_number,
          playerId: playerId,
        },
      });
      return fetchBattingStats.data;
    }
  };

  const bowlerStats = async (playerId) => {
    if (playerId) {
      const fetchBattingStats = await Axios.request({
        url: "/api/bowlerStatsInInnings",
        method: "POST",
        data: {
          matchId: inningSelector.match_id,
          inningNumber: inningSelector?.inning_number,
          playerId: playerId,
        },
      });
      setPlayerBowlerStats(fetchBattingStats.data);
      // return fetchBattingStats.data;
    }
  };

  useEffect(() => {
    console.log(ballByBallResponse, "CHECK FOR BALL NUMBER PLEASE");
    if (ballByBallResponse.ball_number == 6 && isBolwerSelected === false) {
      dispatch(setBowlerEmpty());
    }
    if (ballByBallResponse.ball_number == 1) {
      setIsBolwerSelected(false);
    }
		if (Number(ballByBallResponse?.on_attack) < 0) {
      dispatch(setMatchSaveFalseStatus());
    }
    if (ballByBallResponse.on_attack) {
      dispatch(setBowler(ballByBallResponse.on_attack));
      bowlingStats(ballByBallResponse.on_attack).then((res) => {
        setOnAttackStats(res);
      });
    }
  }, [JSON.stringify(ballByBallResponse)]);

  const strikerBowler = (player: number) => {
    setIsBolwerSelected(true);
		if (
      Number(ballByBallResponse.on_strike) > 0 &&
      Number(ballByBallResponse.non_strike) > 0
    ) {
      dispatch(setMatchSaveTrueStatus());
    }
    dispatch(setBowlerOnAttack(player));
  };
  const {
    runs = 0,
    wickets = 0,
    overNumber = 0,
    ballNumber = 0,
    player_id = -1,
    side = "around",
    bowlingHand = "rhb",
    name,
  } = onAttackStats;

  let calulateEconomy = (runs / ((overNumber - 1) * 6 + ballNumber)) * 6;
  return (
    <div className="flex flex-col gap-1  w-full justify-center items-center  rounded-lg border border-gray-200 border-1 bg-red-100">
      {/* <p className="uppercase text-xs font-bold underline">Bolwer</p> */}
      <div
        id="playerOnStrike "
        className="flex-1 flex flex-row items-center  gap-4 w-full justify-center"
      >
        <Select
          // open={ballByBallResponse?.on_attack !=-1 ? false : true}
          key={parseInt(ballByBallResponse?.on_attack)}
          onSelect={strikerBowler}
          style={{ width: "150px" }}
          popupMatchSelectWidth
          defaultValue={ballByBallResponse?.on_attack}
        >
					{console.log(bowlingTeamPlayers, "BOWLING TEAM PLAYERS")}
          {bowlingTeamPlayers.length > 1 &&
            bowlingTeamPlayers.flatMap((bowler) => {
              console.log(
                scoreBallByBallData?.fullScore?.previousOver,
                "GET LAST OVER"
              );
              if (
                scoreBallByBallData?.fullScore?.currentOver[5]?.bolwerId !=
                bowler.player_id
              ) {
                return (
                  <Select.Option key={bowler.player_id}>
                    {bowler.name}
                  </Select.Option>
                );
              }
            })}
        </Select>

        <div className="flex flex-row gap-3">
          <div className="flex flex-col justify-center w-full">
            <p className="text-center  font-extralight text-xs text-lightTextColor">
              O
            </p>
            <p className="text-center text-lightTextColor text-xs">
              {playerBowlerStats.overs - 1}.{playerBowlerStats.currentBall}
            </p>
          </div>
          <div className="flex flex-col justify-center w-full">
            <p className="text-center  font-extralight text-xs text-lightTextColor">
              R
            </p>
            <p className="text-center text-lightTextColor text-xs">
              {playerBowlerStats?.totalRuns}
            </p>
          </div>

          <div className="flex flex-col justify-center w-full">
            <p className="text-center text-red-800 font-bold text-xs">W</p>
            <p className="text-center text-red-800 font-bold text-xs">
              {playerBowlerStats?.totalWickets || 0}
            </p>
          </div>
          <div className="flex flex-col justify-center w-full">
            <p className="text-center  font-extralight text-xs text-lightTextColor">
              EC
            </p>
            <p className="text-center text-lightTextColor text-xs">
              {calulateEconomy || 0}
            </p>
          </div>

          <div className="flex flex-col justify-center w-full">
            <p className="text-center  font-extralight text-xs text-lightTextColor">
              EX
            </p>
            <p className="text-center text-lightTextColor text-xs">4</p>
          </div>
        </div>

        <Select defaultValue={bowlingHand} className="m-2">
          <Select.Option key={"rhb"}>RHB</Select.Option>
          <Select.Option key={"lhb"}>LHB</Select.Option>
        </Select>
      </div>
      <div className="flex flex-row gap-1">
        <Select defaultValue={side}>
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
