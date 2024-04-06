import React from "react";

import { Button, Form, Radio, Tabs, TabsProps } from "antd";
import ButtonGroup from "antd/es/button/button-group";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { updateBattingStyle, updateBattingType } from "@/redux/features/slices/updateEachBallSlice";
const batterShotsArray = [
  {
    label: "Left Alone",
    value: 2,
  },
  {
    label: "Cr. Drive",
    value: 6,
  },
  {
    label: "ST Drive",
    value: 3,
  },
  {
    label: "Sq Drive",
    value: 7,
  },
  {
    label: "Sq Cut",
    value: 8,
  },
  {
    label: "On Drive",
    value: 4,
  },
  {
    label: "Late Cut",
    value: 8,
  },
  {
    label: "Flick",
    value: 12,
  },
  {
    label: "Glance",
    value: 9,
  },
  {
    label: "Pull",
    value: 13,
  },
  {
    label: "Sweep",
    value: 11,
  },
  {
    label: "Reverse Sweep",
    value: 19,
  },
  
  {
    label: "Hook",
    value: 10,
  },
  {
    label: "Helicopter",
    value: 16,
  },
  {
    label: "Scoop",
    value: 15,
  },
  {
    label: "Step Out",
    value:17,
  },
  {
    label: "Loftead",
    value:20,
  },
  {
    label: "Others",
    value:21,
  },
];

// bating_type
// batting_Style
const options = [
  { label: "Front Foot", value: 1 },
  { label: "Back Foot", value: 2 },
];
const BatterShots = () => {

    // const battingStyle = useAppSelector((state) => state.updateEachBallSlice.batting_Style);
    const dispatcher = useDispatch();
    const captureShotPlaced = (e:any) => {
      if (typeof e.target.value == 'number') {
        dispatcher(updateBattingType(e.target.value));
      }
      // batting_type
    }
    const captureShotType = (e:any) => {
      if (typeof e.target.value == 'number') {
        dispatcher(updateBattingStyle(e.target.value));
      }
      // batting_style
    }
  return (
    <div className="gap-2">
      <Form  name="batsmanShot">
        <Form.Item name={"shotPlayedType"}>
          <Radio.Group
            options={options}
						onChange={captureShotPlaced}
            optionType="button"
            className="flex flex-1 justify-left"
            size="small"
            buttonStyle={"solid"}
          />
        </Form.Item>
        <Form.Item name={"shotType"}>
          <Radio.Group
					onChange={captureShotType}
						options={batterShotsArray}
            className="grid grid-cols-3 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2"
            optionType="button"
            size="small"
            buttonStyle={"solid"}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default BatterShots;
