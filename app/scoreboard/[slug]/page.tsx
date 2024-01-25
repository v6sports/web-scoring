"use client";
import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { AppDispatch, store, useAppSelector } from "@/redux/store";
import Bolwer from "@/app/components/bowler";
import PitchMap from "@/app/components/pitchmap";
import WagonWheel from "@/app/components/wagonWheel";
import BallLength from "@/app/components/ballLength";
import BatterShots from "@/app/components/shorts";
import Fielders from "@/app/components/fielders";
import { Radio } from "antd";
import Runs from "@/app/components/runs";
import LiveScore from "@/app/components/liveScore";
import CurrentOver from "@/app/components/currentOver";
import PreviousOver from "@/app/components/previousOver";
import Extras from "@/app/components/extras";
import Wicket from "@/app/components/wicket";
import Batsman from "@/app/components/batsman";
import Axios from "axios";
import { getMatchScoreboardInformation } from "@/redux/features/slices/matchSlice";

const Scorebard = ({ params }: { params: { slug: string } }) => {
  const dispatch = useDispatch<AppDispatch>();
	const selector = useAppSelector((state) => state.matchSliceReducer);
  const getMatchInfo = async () => {
    const fetchMatchById = await Axios({
      url: `/api/matchScoreboard?matchId=${params.slug}`,
    });

		dispatch(getMatchScoreboardInformation(fetchMatchById.data));
  };
  useEffect(() => {
    getMatchInfo();
  }, []);
  return (
    <React.Fragment>
      <div className="h-[60px] w-full rounded-md bg-gray-300">
        <div className="flex flex-row gap-2 ">
          <div className="flex flex-col gap-2 m-2">
            <div className="flex flex-row gap-2 ">
              <code className="text-xs font-extrabold">
                {selector.match_details?.tournament_name}
              </code>
            </div>
            <div className="flex flex-row gap-2 ">
              <code className="text-xs font-extrabold">
                {" "}
                {selector.match_details?.venue}
              </code>
            </div>
          </div>
          <div className="flex flex-col gap-2 m-2">
            <code className="text-xs font-extrabold">
              {selector.match_details?.toss_won_by_name} WON TOSS ELECTED TO{" "}
              {selector.match_details?.choose_to}
            </code>
            <code className="text-xs font-extrabold">Innings - {selector?.inning_number}</code>
          </div>
					<div className="flex flex-col gap-2 m-2">
            <code className="text-xs font-extrabold">
              {selector.match_details?.format}
            </code>
            <code className="text-xs font-extrabold">UK Trail by 243 Runs</code>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <div className="flex flex-row ">
          <div className="flex flex-col  w-[160px]">
            <div className="flex flex-col">
              <div className="flex flex-col gap-4">
                <div>
                  <WagonWheel />
                  <PitchMap />
                  <Wicket />
                </div>

                <div></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col  w-fit ">
            <div className="w-full  shadow-lg rounded-lg">
              <Batsman />
              <Bolwer />
            </div>

            <div className="w-fit   bg-slate-100 ">
              <div className="w-fit shadow-lg rounded-lg">
                <div className="w-fit min-h-48  overflow-y-hidden bg-red-200">
                  <code className="font-bold">Bolwing Length</code>
                  <BallLength />
                </div>
                <div className="min-h-48w-full overflow-y-hidden bg-green-200">
                  <code className="font-bold">Shot Type</code>
                  <BatterShots />
                </div>
                <Fielders />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col  gap-1 ">
          <LiveScore />
          <Extras />
          <CurrentOver />
          <PreviousOver />
          <Runs />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Scorebard;
