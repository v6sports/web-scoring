import { Tabs, TabsProps } from "antd";
import React from "react";

const MatchVideo = () => {
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

export default MatchVideo;
