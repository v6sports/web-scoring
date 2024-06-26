import { batter } from "@/app/interfaces/batter.interface";
import { bowler } from "@/app/interfaces/bowler.interface";
import { IScoreBallByBall } from "@/app/interfaces/scoreBallByBall.interface";
import {
  emptyExtras,
  updateMatchScoreBallByBall,
} from "@/redux/features/slices/ballByBallSlice";
import { setScoreBallByBall } from "@/redux/features/slices/scoreBallByBallSlice";
import { AppDispatch, store, useAppSelector } from "@/redux/store";
import { Button, Image, Input, InputNumber, message } from "antd";
import Axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Wicket from "../wicket";
import {
  resetBatsman,
  resetBowler,
  resetOutMethod,
  setBallNumber,
  setBatsman,
  setBowler,
  setOverNumber,
} from "@/redux/features/slices/inningsTrackSlice";
import {
  setLoadingFalse,
  setLodingTrue,
} from "@/redux/features/slices/scoreboardProgressSlice";
import { resetAppeal } from "@/redux/features/slices/appealSlice";
import AppealExtras from "../appealExtras";
import { resetEachBall } from "@/redux/features/slices/updateEachBallSlice";

const Runs = () => {
  const [selectedButton, setSelectedButton] = useState<string | number | null>(
    null
  );
  const [isSaveButtonEnabled, setSaveButtonEnabled] = useState(false);
  const [disableSelfRecord, setDisableSelfRecord] = useState(false);
  const [selfRecordBall, setSelfRecordBall] = useState("");
  const dispacth = useDispatch<AppDispatch>();
  const [lastClickTime, setLastClickTime] = useState(0);
  const wicketSelecor = useAppSelector((state) => state.inningsTrackSlice);

  const appealSlice = useAppSelector((state) => state.appealSlice);
  const scoreBallByBallData = useAppSelector(
    (state) => state.scoreBallByBallSlice
  );
  let runTicket = useAppSelector((state) => state.ballByBallSlice);
  const handleButtonClick = (value: string) => {
    if (selectedButton && parseInt(value) == selectedButton) {
      setSelectedButton(null);
      return;
    }

    setSelectedButton(parseInt(value));
  };

  const fetchScoreBallByBall = async () => {
    let fetchScoreApi = await Axios.request({
      url: "/api/readScore",
      method: "post",
      data: {
        match_id: wicketSelecor.match_id,
        inning_number: wicketSelecor.inning_number,
      },
    });
    if (fetchScoreApi.data as IScoreBallByBall) {
      dispacth(setScoreBallByBall(fetchScoreApi.data));
      dispacth(
        updateMatchScoreBallByBall(
          fetchScoreApi.data?.fullScore?.lastBallOfOver
        )
      );
    }
    dispacth(emptyExtras());
  };
  useEffect(() => {
    fetchScoreBallByBall();
    isSaveEnabled();
  }, []);

  useEffect(() => {
    isSaveEnabled();
  }, [JSON.stringify(runTicket)]);
  const submitBallByBall = async (e: any) => {
    const ballBattingAndBowlingStats = store.getState().updateEachBallSlice;
    e.preventDefault();
    e.stopPropagation();
    try {
      //@ts-ignore
      let previiousBall = scoreBallByBallData.fullScore?.currentOver[scoreBallByBallData.fullScore?.currentOver?.length - 1] || -1;
      const currentTime = moment();
      //@ts-ignore
      const providedTime = moment(previiousBall?.currentTimeStamp, "HH:mm:ss");
      const timeGap = providedTime.diff(currentTime);
      if (moment.duration(timeGap).seconds() > 58) {
        message.destroy();
        message.error("Please wait 2 seconds before saving another ball");
        return;
      }
      // if (previiousBall?.currentTimeStamp.diff(moment(), "seconds") < 10) {
      //   message.error("Please wait 10 seconds before saving another ball");
      //   return;
      // }
    } catch (error) {
      console.log(error, ":ERROR");
    }
    // return;
    if (runTicket.on_attack === -1) {
      message.destroy();
      message.error("Please select a bowler");
      return;
    }

    if (runTicket.on_strike === -1) {
      message.destroy();
      message.error("Please select a Striker");
      return;
    }
    if (runTicket.non_strike === -1) {
      message.destroy();
      message.error("Please select a Non Striker");
      return;
    }
    message.destroy();
    message.loading("Please wait");
    dispacth(setLodingTrue());
    let _lastBall = scoreBallByBallData.fullScore?.lastBallOfOver;
    const overNumber =
      _lastBall?.nextBallNumber == 1
        ? runTicket.over_number + 1
        : runTicket.over_number || 0;
    const batsmanOnStrike = runTicket.on_strike;
    const ballNumber = _lastBall?.nextBallNumber || 1;
    /** LOGIC FOR WICKET WRITING HERE ONLY FOR NOW START */
    /**
     * Wicket will only get saved if out_method is not -1
     */

    let whoIsOut = wicketSelecor.out_method != -1 ? runTicket?.on_strike : -1;
    if (
      runTicket.on_strike &&
      runTicket.on_attack &&
      overNumber > -1 &&
      ballNumber &&
      wicketSelecor.out_method != -1
    ) {
      message.destroy();
      message.loading("Saving Wicket");

      dispacth(setBatsman(runTicket.on_strike));
      dispacth(setBowler(runTicket.on_attack));
      dispacth(setOverNumber(overNumber?.toString() ?? ""));
      dispacth(setBallNumber(ballNumber));
    }

    /** LOGIC FOR WICKET WRITING HERE ONLY FOR NOW END */
    let runsClicked: any = 0;

    let isBoundry = 0;
    if (selectedButton == "44") {
      runsClicked = 4;
      isBoundry = 1;
    } else if (selectedButton == "66") {
      runsClicked = 6;
      isBoundry = 1;
    } else {
      runsClicked = selectedButton;
      isBoundry = 0;
    }

    let {
      batsman_player_id = "",
      bolwer_player_id = "",
      out_method = "",
      fielder_player_id = 0,
      inning_number,
      match_id,
    } = wicketSelecor;

    if (out_method == -1) {
      batsman_player_id = -1;
    }

    let extraByeorLegBye = 0;
    if (runTicket.extra_type == "leg-bye" || runTicket.extra_type == "bye") {
      extraByeorLegBye = runsClicked;
      // runTicket['extras'] = runsClicked
    }

    let appealObj = {
      appeal_by: appealSlice?.appeal_by || -1,
      appeal_result: appealSlice?.appeal_result || -1,
      appeal_type: appealSlice?.appeal_type || -1,
      appeal_umpire_end: appealSlice?.appeal_umpire_end || -1,
    };


    let json: any = {
      localId: 0,
      over: overNumber,
      over_number: overNumber || 0,
      ball_number: ballNumber,
      runs:
        runTicket.extra_type == "leg-bye" || runTicket.extra_type == "bye"
          ? 0
          : runsClicked,
      ball_number_included_extra: _lastBall?.ball_number_included_extra,
      extra_type: runTicket?.extra_type || "",
      nextBallNumber: ballNumber,
      extras:
        Number(extraByeorLegBye) > 0 ? extraByeorLegBye : runTicket.extras,
      is_out: out_method.toString(),
      out_by: 0,
      user_id: "123",
      who_out: whoIsOut,
      boundary: (!runTicket?.extra_type || runTicket?.extra_type == 'no-ball') ? isBoundry : 0,
      match_id: match_id.toString(),
      assist_by: fielder_player_id.toString(),
      on_attack: runTicket?.on_attack,
      on_strike:
        runTicket?.on_strike == batsman_player_id ? -1 : runTicket?.on_strike,
      team_runs: 1,
      non_attack: runTicket?.non_attack,
      non_strike:
        runTicket?.non_strike == batsman_player_id ? -1 : runTicket?.non_strike,
      wicket_type: out_method.toString(),
      next_batsman: 0,
      scoring_area: 0,
      ...ballBattingAndBowlingStats,
      inning_number: inning_number,
      bowling_length: 0,
      non_striker_out: 0,
      ...appealObj,
      videoURL: "",
      isUndo: true,
      overMeta: {
        overNumber: overNumber || 0,
        ballNumber: ballNumber,
        isOverEnd: ballNumber == 6 ? true : false,
      },
      videourl: selfRecordBall,
    };

    // console.log(json, "APPLE");
    /**
     * SAVE WICKET IT ANY
     */
    if (wicketSelecor.out_method != 1) {
      Axios.request({
        url: "/api/inningTracker",
        data: wicketSelecor,
        method: "post",
      })
        .then(() => {
          extraByeorLegBye = 0;
          whoIsOut = 0;
          // dispacth(resetBatsman());
          // dispacth(resetBowler());
          // dispacth(resetOutMethod());
        })
        .catch((e) => {
          message.error("Something went wrong");
          dispacth(setLoadingFalse());
        });
    }

    /**
     * SAVE WICKET AND
     */

    if (true) {
      runTicket = json;
      let batterJson: batter = {
        matchId: match_id,
        inningNumber: inning_number,
        batsmanList: {
          boundariesInFour: selectedButton == "44" ? 1 : 0,
          boundariesInSix: selectedButton == "66" ? 1 : 0,
          runs: runsClicked ? runsClicked : 0,
          numberOfBallsPlayed: 1,
          player_id: batsmanOnStrike,
          ...json,
        },
      };
      if (json?.player_id != -1) {
        Axios.request({
          url: "/api/batsmanRecordsBallByBall",
          method: "post",
          data: JSON.stringify(batterJson),
        }).catch((e) => {
          console.log(e);
        });
      }
      dispacth(resetEachBall());

      let bolwerJson: bowler = {
        matchId: match_id,
        inningNumber: inning_number,
        playerId: runTicket?.on_attack,
        bowlerList: {
          runs: runsClicked ? runsClicked : 0,
          player_id: runTicket?.on_attack,
          ballNumber: ballNumber,
          wickets: wicketSelecor.out_method ? wicketSelecor.out_method : -1,
          overNumber: runTicket.over_number,
          timeStamp: moment().format("hh:mm:ss"),
        },
      };

      await Axios.request({
        url: "/api/bowlerRecordsBallByBall",
        method: "post",
        data: bolwerJson,
      }).catch((e) => {
        console.log(e);
      });
    }
    dispacth(resetAppeal());
    let fetchScoreApi = await Axios.request({
      url: "/api/ballByBall",
      method: "post",
      data: json,
    }).catch((e) => {
      message.error("Something went wrong");
      dispacth(setLoadingFalse());
    });
    if (fetchScoreApi?.data) {
      dispacth(updateMatchScoreBallByBall(fetchScoreApi.data?.balls));
      fetchScoreBallByBall();
    }

    dispacth(emptyExtras());

    dispacth(setLoadingFalse());
    await Promise.all([dispacth(emptyExtras())])
      .then((e) => {
        message.success("Run Saved");
        message.destroy();
      })
      .catch((e) => {
        console.log(e, "Something went wrong");
      });

    if (wicketSelecor.out_method != -1) {
      dispacth(resetBatsman());
      dispacth(resetBowler());
      dispacth(resetOutMethod());
    }
  };

  const isSaveEnabled = () => {
    let { on_strike = -1, non_strike = -1, on_attack = -1 } = runTicket;

    if (on_strike > 0 && non_strike > 0 && Number(on_attack) > 0) {
      setSaveButtonEnabled(true);
    }
  };
  const handleWheel = (e: any) => {
    e.preventDefault();
  };

  const recordBall = () => {
    const localIP = "localhost";
    const batsmanOnStrike = runTicket.on_strike;
    const matchID = wicketSelecor.match_id;
    // const inningId = moment().format("hh:mm:ss");  //wicketSelecor?.inning_id; // replace by timeToday in form of 1451
    const inningNumber = wicketSelecor.inning_number;
    const dateOfMatch = moment().format("DDMM"); // date in form of DDMM
    const ball_id = batsmanOnStrike;

    // const over_number
    // const ball_id
    // const ball_number
    // const extra_count

    const ballNumber =
      scoreBallByBallData.fullScore?.lastBallOfOver?.nextBallNumber || 1;
    const localId =
      scoreBallByBallData?.fullScore?.lastBallOfOver?.localId || 0;
    const overNumber =
      Math.floor(Number(scoreBallByBallData.fullScore?.totalOvers))

    const currentTime = moment().format("hhmmss");
    // /sendEvent?BallNo=BallNo=${match_id}_${inning_id}_${inning_number}_${over}_${over_number}_${ball_id}_${ball_number}_${extra_count}`
    // ${matchID}_${inningId}_${inningNumber}_${dateOfMatch}_${overNumber}_${ball_id}_${ballNumber || 1 }`
    const recordBallUrl = `sendEvent?BallNo=BallNo=${matchID}_${dateOfMatch}_${inningNumber}_${currentTime}_${overNumber}_${ball_id}_${ballNumber}_${localId}`;
    setSelfRecordBall(recordBallUrl);
    message.success("Ball Recorded");
    Axios.request({
      method: "post",
      baseURL: `http://${localIP}:3000`,
      url: recordBallUrl,
    }).catch((e) => {
      console.log(e, "ERROR");
    });
    setDisableSelfRecord(true);
    setTimeout(() => {
      setDisableSelfRecord(false);
    }, 2000);
  };

  return (
    isSaveButtonEnabled && <div>
      <div className="flex flex-row gap-4 mt-4 justify-center">
        <Button
          onClick={recordBall}
          disabled={disableSelfRecord}
          className="bg-green-800 h-10 text-white"

        >
          <div className="flex flex-row justify-start w-[160px]">
            <Image
              width={25}
              preview={false}
              className="w-28 h-28 rounded  "
              src={`/rec-button.png`}
            />
            <p className="ml-2 uppercase">Record Ball</p>
          </div>
        </Button>
      </div>
      <AppealExtras />
      <div className="flex flex-col m-2 w-[340px] border rounded justify-center items-center pb-1">
        <p className="text-red-600 uppercase text-sm font-bold text-center">
          Runs Scored
        </p>
        <hr className=" w-full mb-2" />
        <Button.Group key={"ButtonGroup"}>
          <div className=" justify-start  gap-1 border border-1">
            <div className="grid grid-cols-6 justify-start  gap-1 ">
              <Button
                key={"Value-1"}
                className={`flex ${selectedButton === 1 ? "bg-danger" : " primary-btn"
                  } text-white  text-center items-center p-4 text-lg font-extrabold`}
                onClick={() => handleButtonClick("1")}
              >
                1
              </Button>
              <Button
                key={"Value-2"}
                className={`flex ${selectedButton === 2 ? "bg-danger" : " primary-btn"
                  } text-white  text-center items-center p-4 text-lg font-extrabold`}
                onClick={() => handleButtonClick("2")}
              >
                2
              </Button>
              <Button
                key={"Value-3"}
                className={`flex ${selectedButton === 3 ? "bg-danger" : " primary-btn"
                  } text-white  text-center items-center p-4 text-lg font-extrabold`}
                onClick={() => handleButtonClick("3")}
              >
                3
              </Button>

              <Button
                key={"Value-4"}
                className={`flex ${selectedButton === 4 ? "bg-danger" : " primary-btn"
                  } text-white  text-center items-center p-4 text-lg font-extrabold`}
                onClick={() => handleButtonClick("4")}
              >
                4
              </Button>
              <Button
                key={"Value-5"}
                className={`flex ${selectedButton === 5 ? "bg-danger" : " primary-btn"
                  } text-white  text-center items-center p-4 text-lg font-extrabold`}
                onClick={() => handleButtonClick("5")}
              >
                5
              </Button>
              <Button
                key={"Value-6"}
                className={`flex ${selectedButton === 6 ? "bg-danger" : " primary-btn"
                  } text-white  text-center items-center p-4 text-lg font-extrabold`}
                onClick={() => handleButtonClick("6")}
              >
                6
              </Button>
            </div>
          </div>
        </Button.Group>
        <Button.Group key="save&wicket">
          <div className="flex flex-row mt-2 gap-2">
            <Button
              key={"Value-44"}
              className={`flex ${selectedButton == 44 ? "bg-danger" : " bg-yellow-200 text-black"
                }   text-center items-center p-6 text-lg font-extrabold`}
              onClick={() => handleButtonClick("44")}
            >
              4B
            </Button>
            <Button
              key={"Value-66"}
              className={`flex ${selectedButton == 66 ? "bg-danger" : " bg-yellow-500"
                } text-black  text-center items-center p-6 text-lg font-extrabold`}
              onClick={() => handleButtonClick("66")}
            >
              6B
            </Button>
            {selectedButton === null ? (
              <Input
                className=" w-10 h-12  font-extrabold text-center justify-center items-center"
                minLength={0}
                onWheel={handleWheel}
                maxLength={1}
                inputMode="numeric"
                placeholder="#"
              />
            ) : (
              ""
            )}

          </div>
        </Button.Group>
        <div className="flex flex-row gap-4 mt-4">
          {isSaveButtonEnabled && (
            <Button
              onClick={(e) => submitBallByBall(e)}
              className={`flex ${"bg-green-600"} text-white  text-center items-center p-6 text-xl font-extrabold uppercase`}
            >
              Save
            </Button>
          )}
          <Wicket />
        </div>
      </div>

    </div>
  );
};

export default Runs;
