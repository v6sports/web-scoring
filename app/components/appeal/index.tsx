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
const { Option } = Select;
const appealOptions = [
  { value: "LBW", key: "2" },
  { value: "Catch", key: "3" },
  { value: "Runout", key: "4" },
  { value: "short run", key: "5" },
  { value: "Stumping", key: "6" },
  { value: "Wide Ball", key: "7" },
  { value: "NoBall", key: "8" },
  { value: "Hit Wicket", key: "9" },
  { value: "Handled the Ball", key: "10" },
  { value: "Timeout", key: "11" },
  { value: "Hitting Twice", key: "12" },
  { value: "Distracting Fielder", key: "13" },
  { value: "Others", key: "14" },
];

const Appeal = () => {
  const store = useAppSelector((state) => state.appealSlice);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div>
      <h1>Appeal</h1>
      <div className="flex flex-row justify-around">
        <Select
          key="fieldingType"
          onSelect={(e: string) => dispatch(setAppealBy(e))}
          placeholder="select Team"
        >
          <Option key="fieldingType">Fielding Team</Option>
          <Option key="battingType">Batting Team</Option>
        </Select>

        <Select
          onSelect={(e: string) => dispatch(setAppealType(e))}
          placeholder="Select Apeal Type"
        >
          {appealOptions.flatMap((appeal) => {
            return <Option key={appeal.key}>{appeal.value}</Option>;
          })}
        </Select>

        <Select
          placeholder="Select End"
          key={"farEndUmpire"}
          onSelect={(e: string) => dispatch(setAppealUmpireEnd(e))}
        >
          <Option key={"farEndUmpire"}>Far End Umpire</Option>
          <Option key={"nearEndUmpire"}>Near End Umpire</Option>
        </Select>

        <Select
          placeholder="Select End"
          key={"appealpass-true"}
          onSelect={(e: string) => dispatch(setAppealResult(e))}
        >
          <Option key={"true"}>Appeal Pass</Option>
          <Option key={"false"}>Appeal Failed</Option>
        </Select>
      </div>
    </div>
  );
};

export default Appeal;
