import { IballByBall } from "@/app/interfaces/ballByBall.interface";
import { batter } from "@/app/interfaces/batter.interface";
import { bowler } from "@/app/interfaces/bowler.interface";
import { IScoreBallByBall } from "@/app/interfaces/scoreBallByBall.interface";
import { emptyExtras, updateMatchScoreBallByBall } from "@/redux/features/slices/ballByBallSlice";
import { setScoreBallByBall } from "@/redux/features/slices/scoreBallByBallSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { Button, Input, InputNumber, message } from "antd";
import Axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Wicket from "../wicket";
import { resetBatsman, resetBowler, resetOutMethod, setBallNumber, setBatsman, setBowler, setOverNumber } from "@/redux/features/slices/inningsTrackSlice";

const Runs = () => {
  const [selectedButton, setSelectedButton] = useState<string | number | null>(
    null
  );
  const dispacth = useDispatch<AppDispatch>();
	const wicketSelecor = useAppSelector((state) => state.inningsTrackSlice);
  const scoreBallByBallData = useAppSelector(
    (state) => state.scoreBallByBallSlice
  );
  const runTicket = useAppSelector((state) => state.ballByBallSlice);
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
        match_id: "30128",
        inning_number: 1,
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
		dispacth(emptyExtras())
  };
  useEffect(() => {
    fetchScoreBallByBall();
  }, []);

  const submitBallByBall = async () => {

		message.destroy();
		message.loading("Please wait");

		let _lastBall = scoreBallByBallData.fullScore?.lastBallOfOver;
		const overNumber = runTicket.over_number;
		const ballNumber = _lastBall?.nextBallNumber || 1;
		/** LOGIC FOR WICKET WRITING HERE ONLY FOR NOW START */
		/**
		 * Wicket will only get saved if out_method is not -1
		 */

		if(runTicket.on_strike && runTicket.on_attack && overNumber > -1  && ballNumber && wicketSelecor.out_method != -1)
		{

			message.destroy();
			message.loading("Saving Wicket");
				dispacth(setBatsman(runTicket.on_strike));
				dispacth(setBowler(runTicket.on_attack));
				dispacth(setOverNumber(overNumber));
				dispacth(setBallNumber(ballNumber));

		}

		/** LOGIC FOR WICKET WRITING HERE ONLY FOR NOW END */
    let runsClicked = 0;
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
      batsman_player_id = '',
      bolwer_player_id = '',
      out_method = '',
      fielder_player_id = 0,
			inning_number,
			match_id
    } = wicketSelecor;
		if (out_method == -1) {
      batsman_player_id = -1;
    }
		let json: IballByBall = {
      localId: 0,
      over: overNumber,
      over_number: overNumber || 0,
      ball_number: ballNumber,
      runs: runsClicked,
      ball_number_included_extra: _lastBall?.ball_number_included_extra,
      extra_type: runTicket?.extra_type || "",
      nextBallNumber: ballNumber,
      extras: runTicket.extras,
      is_out: out_method ,
      out_by: 0,
      user_id: "123",
      who_out: 0,
      boundary: isBoundry,
      match_id: match_id,
      assist_by: fielder_player_id,
      on_attack: runTicket?.on_attack,
      on_strike: runTicket?.on_strike == batsman_player_id ? -1 : runTicket?.on_strike,
      team_runs: 1,
      non_attack: runTicket?.non_attack ,
      non_strike: runTicket?.non_strike == batsman_player_id ? -1 : runTicket?.non_strike,
      wicket_type: out_method,
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
    };


		/**
		 * SAVE WICKET IT ANY
		 */
		if (wicketSelecor.out_method != 1) {
      Axios.request({
        url: "/api/inningTracker",
        data: wicketSelecor,
        method: "post",
      }).then(() => {

        // dispacth(resetBatsman());
        // dispacth(resetBowler());
        // dispacth(resetOutMethod());
      });
    }

		/**
		 * SAVE WICKET AND
		 */

		if (runTicket?.on_strike) {
      let batterJson: batter = {
        matchId: match_id,
        inningNumber: inning_number,
        batsmanList: {
          boundariesInFour: selectedButton == "44" ? 1 : 0,
          boundariesInSix: selectedButton == "66" ? 1 : 0,
          runs: runsClicked,
          numberOfBallsPlayed: 1,
          player_id: runTicket?.on_strike,
        },
      };
			Axios.request({
				url: "/api/batsmanRecordsBallByBall",
				method: "post",
				data: batterJson,
			}).catch(e=>{
				console.log(e)
			});

			let bolwerJson: bowler = {
        matchId: match_id,
        inningNumber: inning_number,
				"playerId":  runTicket?.on_attack,
        bowlerList: {
          runs: runsClicked,
          player_id: runTicket?.on_attack,
          ballNumber: ballNumber,
          wickets: runTicket.is_out,
					overNumber:runTicket.over_number,
					timeStamp: moment().format("hh:mm:ss")
        },
      };

			await Axios.request({
				url: "/api/bowlerRecordsBallByBall",
				method: "post",
				data: bolwerJson,
			}).catch(e=>{
				console.log(e)
			});
    }



    let fetchScoreApi = await Axios.request({
      url: "/api/ballByBall",
      method: "post",
      data: json,
    });
    if (fetchScoreApi.data) {
      dispacth(updateMatchScoreBallByBall(fetchScoreApi.data?.balls));
      fetchScoreBallByBall();
    }

		dispacth(emptyExtras())
		await Promise.all([dispacth(emptyExtras())]).then(e=> {
			message.success("Run Saved");
			message.destroy();
		}).catch(e=>{
			console.log(e,"Something went wrong");
		})

		if (wicketSelecor.out_method != -1) {
      dispacth(resetBatsman());
      dispacth(resetBowler());
      dispacth(resetOutMethod());
    }

  };
  const handleWheel = (e: any) => {
    e.preventDefault();
  };

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
      <div className="flex flex-1">

      </div>
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

        <Button
          onClick={() => submitBallByBall()}
          className={`flex-1 ${"bg-green-600"} text-white  text-center items-center p-10 text-xl font-extrabold uppercase`}
        >
          Save
        </Button>
				<Wicket />
      </div>
    </div>
  );
};

export default Runs;
