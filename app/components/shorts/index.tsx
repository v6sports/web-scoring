import React from "react";

import { Button, Form, Radio, Tabs, TabsProps } from "antd";
import ButtonGroup from "antd/es/button/button-group";
const batterShotsArray = [
  {
    label: "Left Alone",
    value: "Defensive",
  },
  {
    label: "Cr. Drive",
    value: "CoverDrive",
  },
  {
    label: "ST Drive",
    value: "STDrive",
  },
  {
    label: "Sq Drive",
    value: "SquareDrive",
  },
  {
    label: "Sq Cut",
    value: "Cut",
  },
  {
    label: "On Drive",
    value: "Drive",
  },
  {
    label: "Late Cut",
    value: "Late Shot",
  },
  {
    label: "Flick",
    value: "Flick",
  },
  {
    label: "Glance",
    value: "Glance",
  },
  {
    label: "Push",
    value: "Push",
  },
  {
    label: "Punch",
    value: "Punch",
  },
  {
    label: "Pull",
    value: "Pull",
  },
  {
    label: "Sweep",
    value: "Sweep",
  },
  {
    label: "Paddle Sweep",
    value: "PaddleSweep",
  },
  {
    label: "Slog Sweep",
    value: "SlogSweep",
  },
  {
    label: "Hook",
    value: "Cross-Bat",
  },
  {
    label: "Steer",
    value: "Steer-Cross-Bat",
  },
  {
    label: "Scoop",
    value: "Scoop-Cross-Bat",
  },
  {
    label: "Inside Out",
    value: "Inside-Cross-Bat",
  },
];

const options = [
  { label: "Front Foot", value: "front" },
  { label: "Back Foot", value: "back" },
];
const BatterShots = () => {
  return (
    <div className="gap-2">
      <Form name="batsmanShot">
        <Form.Item name={"shotPlayedType"}>
          <Radio.Group
            options={options}
            optionType="button"
            className="flex flex-1 justify-left"
            size="small"
            buttonStyle={"solid"}
          />
        </Form.Item>
        <Form.Item name={"shotType"}>
          <Radio.Group
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
