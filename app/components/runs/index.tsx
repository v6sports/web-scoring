import { IballByBall } from "@/app/interfaces/ballByBall.interface";
import { batter } from "@/app/interfaces/batter.interface";
import { bowler } from "@/app/interfaces/bowler.interface";
import { IScoreBallByBall } from "@/app/interfaces/scoreBallByBall.interface";
import {
  emptyExtras,
  updateMatchScoreBallByBall,
} from "@/redux/features/slices/ballByBallSlice";
import { setScoreBallByBall } from "@/redux/features/slices/scoreBallByBallSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { Button, Input, InputNumber, message } from "antd";
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

const Runs = () => {
  const [selectedButton, setSelectedButton] = useState<string | number | null>(
    null
  );
  const [isSaveButtonEnabled, setSaveButtonEnabled] = useState(false);
	const [disableSelfRecord, setDisableSelfRecord] = useState(false);
	const [selfRecordBall, setSelfRecordBall] = useState('');
  const dispacth = useDispatch<AppDispatch>();
  const wicketSelecor = useAppSelector((state) => state.inningsTrackSlice);
  const matchSaveStatus = useAppSelector((state) => state.matchSaveSlice);
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
  const submitBallByBall = async () => {
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
    const overNumber = runTicket.over_number || 0;
    const batsmanOnStrike = runTicket.on_strike;
    const ballNumber = _lastBall?.nextBallNumber || 1;
    /** LOGIC FOR WICKET WRITING HERE ONLY FOR NOW START */
    /**
     * Wicket will only get saved if out_method is not -1
     */

    if (
      runTicket.on_strike &&
      runTicket.on_attack &&
      overNumber > -1 &&
      ballNumber &&
      wicketSelecor.out_method != -1
    ) {
      message.destroy();
      message.loading("Saving Wicket");
      console.log(runTicket.on_strike, "GET ACTIVE PACE");
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
    console.log(runTicket);

    let json: any = {
      localId: 0,
      over: overNumber,
      over_number: overNumber || 0,
      ball_number: ballNumber,
      runs: runsClicked,
      ball_number_included_extra: _lastBall?.ball_number_included_extra,
      extra_type: runTicket?.extra_type || "",
      nextBallNumber: ballNumber,
      extras: runTicket.extras,
      is_out: out_method.toString(),
      out_by: 0,
      user_id: "123",
      who_out: 0,
      boundary: isBoundry,
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
      inning_number: inning_number,
      bowling_length: 0,
      non_striker_out: 0,
      videoURL: "",
      isUndo: true,
      overMeta: {
        overNumber: 1,
        ballNumber: 1,
        isOverEnd: false,
      },
      videourl: selfRecordBall,
    };

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
    console.log(JSON.stringify(runTicket), "GET ACTIVE PACE-practival");
    if (on_strike > 0 && non_strike > 0 && Number(on_attack) > 0) {
      setSaveButtonEnabled(true);
    }
  };
  const handleWheel = (e: any) => {
    e.preventDefault();
  };

	const recordBall = () => {
		const localIP = "http://192.168.1.100";
		const batsmanOnStrike = runTicket.on_strike;
		const matchID = wicketSelecor.match_id;
		const inningNumber = wicketSelecor.inning_number;
		const ballNumber = scoreBallByBallData.fullScore?.lastBallOfOver?.nextBallNumber;
		const overNumber = scoreBallByBallData.fullScore?.currentOver?.length;
		const currentTime = moment().format('hh:mm:ss');
		const recordBallUrl = `sendEvent?BallNo=BallNo=${matchID}-${inningNumber}-${batsmanOnStrike}-${overNumber}-${ballNumber}-${currentTime}`;
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


	}

  return (
    <div>
      <Button.Group key={"ButtonGroup"}>
        <div className=" justify-start  gap-1 border border-1">
          <div className="grid grid-cols-3 justify-start  gap-1 border border-1">
            <Button
              key={"Value-1"}
              className={`flex ${
                selectedButton === 1 ? "bg-danger" : " primary-btn"
              } text-white  text-center items-center p-10 text-lg font-extrabold`}
              onClick={() => handleButtonClick("1")}
            >
              1
            </Button>
            <Button
              key={"Value-2"}
              className={`flex ${
                selectedButton === 2 ? "bg-danger" : " primary-btn"
              } text-white  text-center items-center p-10 text-lg font-extrabold`}
              onClick={() => handleButtonClick("2")}
            >
              2
            </Button>
            <Button
              key={"Value-3"}
              className={`flex ${
                selectedButton === 3 ? "bg-danger" : " primary-btn"
              } text-white  text-center items-center p-10 text-lg font-extrabold`}
              onClick={() => handleButtonClick("3")}
            >
              3
            </Button>
          </div>
          <div className="grid grid-cols-3 justify-start  gap-1 border border-1">
            <Button
              key={"Value-4"}
              className={`flex ${
                selectedButton === 4 ? "bg-danger" : " primary-btn"
              } text-white  text-center items-center p-10 text-lg font-extrabold`}
              onClick={() => handleButtonClick("4")}
            >
              4
            </Button>
            <Button
              key={"Value-5"}
              className={`flex ${
                selectedButton === 5 ? "bg-danger" : " primary-btn"
              } text-white  text-center items-center p-10 text-lg font-extrabold`}
              onClick={() => handleButtonClick("5")}
            >
              5
            </Button>
            <Button
              key={"Value-6"}
              className={`flex ${
                selectedButton === 6 ? "bg-danger" : " primary-btn"
              } text-white  text-center items-center p-10 text-lg font-extrabold`}
              onClick={() => handleButtonClick("6")}
            >
              6
            </Button>
          </div>
        </div>
      </Button.Group>
      <div className="flex flex-1"></div>
      <div className="flex flex-row gap-4 mt-2">
        <Button
          key={"Value-44"}
          className={`flex-1 ${
            selectedButton == 44 ? "bg-danger" : " bg-yellow-200 text-black"
          }   text-center items-center p-10 text-lg font-extrabold`}
          onClick={() => handleButtonClick("44")}
        >
          4B
        </Button>
        <Button
          key={"Value-66"}
          className={`flex-1 ${
            selectedButton == 66 ? "bg-danger" : " bg-yellow-500"
          } text-black  text-center items-center p-10 text-lg font-extrabold`}
          onClick={() => handleButtonClick("66")}
        >
          6B
        </Button>
      </div>
      <div className="flex flex-row gap-4 mt-4">
        {selectedButton === null ? (
          <Input
            className="flex-1 w-20 h-20 text-2xl font-extrabold text-center justify-center items-center"
            minLength={0}
            onWheel={handleWheel}
            maxLength={1}
            inputMode="numeric"
            placeholder="#"
          />
        ) : (
          ""
        )}

        {isSaveButtonEnabled && (
          <Button
            onClick={() => submitBallByBall()}
            className={`flex-1 ${"bg-green-600"} text-white  text-center items-center p-10 text-xl font-extrabold uppercase`}
          >
            Save
          </Button>
        )}
        <Wicket />
      </div>
			<div className="flex flex-row gap-4 mt-4">
			<Button onClick={recordBall} disabled={disableSelfRecord}  className="bg-red-900 text-white" block> Record Ball</Button>
			</div>
    </div>
  );
};

export default Runs;
