import {
  setAppealBy,
  setAppealResult,
  setAppealType,
  setAppealUmpireEnd,
} from "@/redux/features/slices/appealSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { Select } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import ButtonGroup from "../buttonGroup";
const { Option } = Select;
const appealOptions = [
  { label: "LBW", value: "2" },
  { label: "Catch", value: "3" },
  { label: "Runout", value: "4" },
  { label: "short run", value: "5" },
  { label: "Stumping", value: "6" },
  { label: "Wide Ball", value: "7" },
  { label: "NoBall", value: "8" },
  { label: "Hit Wicket", value: "9" },
  { label: "Handled the Ball", value: "10" },
  { label: "Timeout", value: "11" },
  { label: "Hitting Twice", value: "12" },
  { label: "Distracting Fielder", value: "13" },
  { label: "Others", value: "14" },
];

const Appeal = () => {
  const store = useAppSelector((state) => state.appealSlice);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div>
      <h1>Appeal</h1>
      <div className="flex flex-col justify-around">
        <div className="justify-center mb-2">
          <p className="text-red-800 uppercase font-bold">Select Team</p>
          <ButtonGroup
            handleButtonClick={(value: string | null) =>
              dispatch(setAppealBy(value))
            }
            buttons={[
              { key: 1, label: "Batting Team", value: "battingType" },
              { key: 2, label: "Fielding Team", value: "fieldingType" },
            ]}
          />
          <hr className="mt-1" />
        </div>
        <div className="justify-center mb-2">
          <p className="text-red-800 uppercase font-bold">Select Appeal Type</p>
          <ButtonGroup
            handleButtonClick={(value: string | null) =>
              dispatch(setAppealType(value))
            }
            buttons={appealOptions}
          />
          <hr className="mt-1" />
        </div>
        <div className="justify-center mb-2">
          <p className="text-red-800 uppercase font-bold">Select Umpire End</p>
          <ButtonGroup
            handleButtonClick={(value: string | null) =>
              dispatch(setAppealUmpireEnd(value))
            }
            buttons={[
              { key: 1, label: "Near End", value: "nearEndUmpire" },
              { key: 2, label: "Far End", value: "farEndUmpire" },
            ]}
          />
          <hr className="mt-1" />
        </div>

        <div className="justify-center mb-2">
          <p className="text-red-800 uppercase font-bold">Appeal Result</p>
          <ButtonGroup
            handleButtonClick={(value: string | null) =>
              dispatch(setAppealResult(value))
            }
            buttons={[
              { key: 1, label: "Appeal Pass", value: "true" },
              { key: 2, label: "Appeal Failed", value: "false" },
            ]}
          />

        </div>
      </div>
    </div>
  );
};

export default Appeal;
