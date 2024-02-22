"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useSearchParams } from "next/navigation";
import Axios from "axios";
import { getMatchScoreboardInformation } from "@/redux/features/slices/matchSlice";
import { calculateStrikeRate, showAlert } from "@/app/Utils/utils";
import {
  setInningNumber,
  setMatchId,
} from "@/redux/features/slices/inningsTrackSlice";
import Loading from "@/app/components/loading";

const scorecard = ({ params }: { params: { slug: string } }) => {
  const searchParams = useSearchParams();

  let inningNumber = 0;
  inningNumber = parseInt(searchParams.get("inning") || "0", 10);
  let matchId = params.slug;

  useEffect(() => {
    fetchBatsmanStats();
  }, []);
  const [batsmanStats, setBatsmanStats] = useState([]);
  const [fullMatchScoreCard, setFullMatchScoreCard] = useState({});
	const [matchDetailsInfo, setMatchDetailsInfo] = useState<any>({});

  const fetchBatsmanStats = async () => {

		const matchDetails = await Axios.get(
      `/api/matchScoreboard?matchId=${matchId}&inning=${inningNumber}`
    ).then((res) => {
      setMatchDetailsInfo(res.data);
    });
    const matchScoreBoard = await Axios.post("/api/readScore", {
      match_id: matchId,
      inning_number: inningNumber,
    });

    if (matchScoreBoard.status === 200) {
      console.log(matchScoreBoard.data);
      setFullMatchScoreCard(matchScoreBoard.data);
    }

    const response = await Axios.post("/api/allBatsmanRuninInnings", {
      matchId,
      inningNumber,
    });
    if (response.status === 200) {
      setBatsmanStats(response.data);
      // fetchBatsmanStats();
    }
  };

  return (
    <div>
      <div className="bg-gray-100 h-screen flex flex-col items-center justify-center">
        <div className="mx-auto p-4 bg-white shadow-lg rounded-lg">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Team A</h2>
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-8 border">Player</th>
                  <th className="py-2 px-8 border"></th>
                  <th className="py-2 px-4 border">Runs</th>
                  <th className="py-2 px-4 border">Balls</th>
                  <th className="py-2 px-4 border">4s</th>
                  <th className="py-2 px-4 border">6s</th>
                  <th className="py-2 px-4 border">SR</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(batsmanStats)?.flatMap((player: any) => {
                  return (
                    <tr key={player.player_id}>
                      <td className="py-2 px-8 border">{player.playerName}</td>
                      <td className="py-2 px-8 border text-xs font-bold">
                        {player?.json?.is_out != -1
                          ? `${player?.json?.is_out[0]} ${player?.bolwer}`
                          : ""}
                      </td>
                      <td className="py-2 px-4 border">{player.runs}</td>
                      <td className="py-2 px-4 border">
                        {player.numberOfBallsPlayed}
                      </td>
                      <td className="py-2 px-4 border">
                        {player.boundariesInSix}
                      </td>
                      <td className="py-2 px-4 border">
                        {player.boundariesInFour}
                      </td>
                      <td className="py-2 px-4 border">
                        {calculateStrikeRate(
                          player.runs,
                          player.numberOfBallsPlayed
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="bottom-12 flex flex-row  absolute bg-orange w-full  ml-5 mr-5 justify-around">
        <div className="left-8 ml-3 ">
          <p>{`${
            matchDetailsInfo?.match_details?.team_a_new_det?.short_name || ""
          }`}</p>
        </div>
        <div className="right-2 mr-3">
          <p>{`${
            matchDetailsInfo?.match_details?.team_a_new_det?.short_name || ""
          }`}</p>
        </div>
      </div>
    </div>
  );
};

export default scorecard;
