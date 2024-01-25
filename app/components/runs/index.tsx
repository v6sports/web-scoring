import { updateMatchScoreBallByBall } from "@/redux/features/slices/ballByBallSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { Button, Input, InputNumber } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Runs = () => {
  const [selectedButton, setSelectedButton] = useState<string | number | null>(null);
	const dispacther = useDispatch<AppDispatch>();
	const selecter = useAppSelector(state => state.ballByBallSlice);
  const handleButtonClick = (value: string) => {
    if (selectedButton && parseInt(value) == selectedButton) {
      setSelectedButton(null);
      return;
    }

    setSelectedButton(parseInt(value));


  };

	const submitBallByBall = () => {

		let appendBall =
      selecter?.ball_number && selecter?.ball_number < 6
        ? selecter?.ball_number + 1
        : 0+1;
		let appendOver = appendBall == 1 ? selecter?.over || 0 + 1 : 0;
		dispacther(
      updateMatchScoreBallByBall({
        localId: 0,
        over: 0,
        over_number: appendOver,
        runs: selectedButton ? parseInt(selectedButton) : 0,
        ball_number: appendBall,
        extras: 0,
        is_out: 0,
        out_by: 0,
        user_id: "123",
        who_out: 0,
        boundary: 0,
        match_id: "30128",
        assist_by: 0,
        on_attack: 16254,
        on_strike: 17309,
        team_runs: 1,
        non_attack: 14415,
        non_strike: 17312,

        wicket_type: 0,
        next_batsman: 0,
        scoring_area: 0,
        inning_number: 1,
        bowling_length: 0,
        non_striker_out: 0,
        videoURL: "",
        isUndo: true,
        overMeta: {
          overNumber: appendOver,
          ballNumber: appendBall,
          isOverEnd: appendBall === 6 ? true : false,
        },
      })
    );
	}
  const handleWheel = (e:any) => {
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
              className={`flex ${
                selectedButton === 2 ? "bg-danger" : " primary-btn"
              } text-white  text-center items-center p-10 text-lg font-extrabold`}
              onClick={() => handleButtonClick("2")}
            >
              2
            </Button>
            <Button
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
              className={`flex ${
                selectedButton === 4 ? "bg-danger" : " primary-btn"
              } text-white  text-center items-center p-10 text-lg font-extrabold`}
              onClick={() => handleButtonClick("4")}
            >
              4
            </Button>
            <Button
              className={`flex ${
                selectedButton === 5 ? "bg-danger" : " primary-btn"
              } text-white  text-center items-center p-10 text-lg font-extrabold`}
              onClick={() => handleButtonClick("5")}
            >
              5
            </Button>
            <Button
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
      <div className="flex flex-row gap-4 mt-2">
        <Button
          key={"Value-1"}
          className={`flex-1 ${
            selectedButton == 44 ? "bg-danger" : " bg-yellow-200 text-black"
          }   text-center items-center p-10 text-lg font-extrabold`}
          onClick={() => handleButtonClick("44")}
        >
          4B
        </Button>
        <Button
          key={"Value-1"}
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
				onClick={()=> submitBallByBall()}
          className={`flex-1 ${"bg-green-600"} text-white  text-center items-center p-10 text-xl font-extrabold uppercase`}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default Runs;
