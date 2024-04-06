import React from "react";

import { Button, Radio, Tabs, TabsProps } from "antd";
import ButtonGroup from "antd/es/button/button-group";
import { useDispatch } from "react-redux";
import { updateBowlingStyle, updateBowlingType } from "@/redux/features/slices/updateEachBallSlice";

//bowling_style
const bowlingStylesFast = [
  // fasts
  { value: 25, label: "Full", bowlerType: "fast" },
  { value: 26, label: "Good", bowlerType: "fast" },
  { value: 27, label: "sort", bowlerType: "fast" },
  { value: 28, label: "Off-cutter", bowlerType: "fast" },
  { value: 29, label: "Knuckle", bowlerType: "fast" },
  { value: 30, label: "Full toss", bowlerType: "fast" },
  { value: 31, label: "Beamer", bowlerType: "fast" },
  { value: 6, label: "Yorker", bowlerType: "fast" },
  { value: 1, label: "Bouncer", bowlerType: "fast" },
  { value: 3, label: "In-swing", bowlerType: "fast" },
  { value: 2, label: "Out-swing", bowlerType: "fast" },
  { value: 4, label: "Reverse swing", bowlerType: "fast" },
  { value: "offCutter", label: "Off-cutter", bowlerType: "fast" },
  { value: 5, label: "Leg-cutter", bowlerType: "fast" },
  { value: 22, label: "Straight delivery", bowlerType: "fast" },
  { value: 7, label: "Slower ball", bowlerType: "fast" },

  { value: 23, label: "Sl bouncer", bowlerType: "fast" },


  // spinners
  { value: 17, label: "Off-spin", bowlerType: "spinner" },
  { value: 18, label: "Leg-spin", bowlerType: "spinner" },
  { value: 22, label: "Straight delivery", bowlerType: "spinner" },
  { value: 9, label: "Googly", bowlerType: "spinner" },
  { value: 32, label: "Top spin", bowlerType: "spinner" },
  { value: 33, label: "Slider", bowlerType: "spinner" },
  { value: 34, label: "Arm ball", bowlerType: "spinner" },
  { value: 35, label: "Off-cutter", bowlerType: "spinner" },
  { value: 10, label: "Doosra", bowlerType: "spinner" },
  { value: 12, label: "Carrom ball", bowlerType: "spinner" },
  { value: 5, label: "Leg-cutter", bowlerType: "spinner" },
  // Add more types as needed
];


// bowling_postion - {
//     Pav_End: 1,
//     Far_End: 2
// }



// {
// 	'1' => 'Full length delivery',
// 	'2' => 'Yorker length delivery',
// 	'3' => 'Full toss delivery',
// 	'4' => 'Pitched on good length area',
// 	'5' => 'A shorter length delivery'
// }





const BallLength = () => {
  const dispatcher = useDispatch();
  
  const bowlingTypesButtons = (types: { value: string | number, label: string, bowlerType: string }[], bolwerType = "") => {

    const dispatcher = useDispatch();
    const updateBowlingStyleFn = (value: any) => {
      dispatcher(updateBowlingStyle(value.target.value));
    }
  
    return (
      <div className="flex flex-col w-full">
        <Radio.Group
          options={types.filter((types) => types.bowlerType === bolwerType)}
          className="grid grid-cols-4"
          optionType="button"
          size="small"
       
          buttonStyle={"solid"}
          onChange={updateBowlingStyleFn}
        />
      </div>
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
  ];
  const onChange = (key: string) => {
    if (key === "fast") {
      dispatcher(updateBowlingType(1));
    }
    if (key === "spin") {
      dispatcher(updateBowlingType(2));
    }

  };
  return (
    <div className="flex flex-col w-full">
      <Tabs
        type="card"
        size="middle"
        animated={true}
        defaultActiveKey="2"
        items={items}
        onChange={onChange}
      />
    </div>
  );
};

export default BallLength;
