import React from "react";

import { Button, Radio, Tabs, TabsProps } from "antd";
import ButtonGroup from "antd/es/button/button-group";
const bowlingStylesFast = [
  // fasts
  { value: "full", label: "Full-length", bowlerType: "fast" },
  { value: "goodLength", label: "Gd-length", bowlerType: "fast" },
  { value: "short", label: "St-length", bowlerType: "fast" },
  { value: "yorker", label: "Yorker", bowlerType: "fast" },
  { value: "bouncer", label: "Bouncer", bowlerType: "fast" },
  { value: "inSwinger", label: "In-swing", bowlerType: "fast" },
  { value: "outSwinger", label: "Out-swing", bowlerType: "fast" },
  { value: "reverseSwing", label: "Reverse swing", bowlerType: "fast" },
  { value: "offCutter", label: "Off-cutter", bowlerType: "fast" },
  { value: "legCutter", label: "Leg-cutter", bowlerType: "fast" },
  { value: "straight", label: "Straight delivery", bowlerType: "fast" },
  { value: "slowerBall", label: "Slower ball", bowlerType: "fast" },
  { value: "knuckleBall", label: "Knuckle", bowlerType: "fast" },
  { value: "slowBouncer", label: "Sl bouncer", bowlerType: "fast" },
  { value: "fullToss", label: "Full toss", bowlerType: "fast" },
  { value: "beamer", label: "Beamer", bowlerType: "fast" },

  // mediums
  { value: "lengthBall", label: "Length-ball", bowlerType: "medium" },
  { value: "goodLengthM", label: "Gd-length", bowlerType: "medium" },
  { value: "shortM", label: "Srt-length", bowlerType: "medium" },
  { value: "offCutterM", label: "Off-cutter", bowlerType: "medium" },
  { value: "legCutterM", label: "Leg-cutter", bowlerType: "medium" },
  { value: "slowerBallM", label: "Slower", bowlerType: "medium" },
  { value: "knuckleBallM", label: "Knuckle", bowlerType: "medium" },

  // spinners
  { value: "offSpin", label: "Off-spin", bowlerType: "spinner" },
  { value: "legSpin", label: "Leg-spin", bowlerType: "spinner" },
  { value: "googly", label: "Googly", bowlerType: "spinner" },
  { value: "topSpin", label: "Top spin", bowlerType: "spinner" },
  { value: "slider", label: "Slider", bowlerType: "spinner" },
  { value: "armBall", label: "Arm ball", bowlerType: "spinner" },
  { value: "doosra", label: "Doosra", bowlerType: "spinner" },
  { value: "carromBall", label: "Carrom ball", bowlerType: "spinner" },
  { value: "legCutterS", label: "Leg-cutter", bowlerType: "spinner" },
  { value: "offCutterS", label: "Off-cutter", bowlerType: "spinner" },
  // Add more types as needed
];

const bowlingTypesButtons = (types: [], bolwerType = "") => {
  return (
    <Radio.Group
      options={types.filter((types) => types.bowlerType == bolwerType)}
      className="grid grid-cols-3 sm:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 md:grid-cols-2 mt-0"
      optionType="button"
      size="small"
      buttonStyle={"solid"}
    />
  );
};

const items: TabsProps["items"] = [
  {
    key: "fast",
    label: "Fast",
    children: bowlingTypesButtons(bowlingStylesFast, "fast"),
  },
  {
    key: "spin",
    label: "Spin",
    children: bowlingTypesButtons(bowlingStylesFast, "spinner"),
  },
  {
    key: "medium",
    label: "Medium",
    children: bowlingTypesButtons(bowlingStylesFast, "medium"),
  },
];

const onChange = (key: string) => {
  console.log(key);
};

const BallLength = () => {
  return (
    <Tabs
      type="card"
      size="small"
      animated={true}
      defaultActiveKey="1"
      items={items}
      onChange={onChange}
    />
  );
};

export default BallLength;
