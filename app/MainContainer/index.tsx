import Head from "next/head";
import React from "react";
import CreateMatch from "../Containers/CreateMatch";
import { ConfigProvider } from "antd";
import themeJSON from "../appStyles/theme.json";
const MainContainer = () => {
  return (
    <ConfigProvider theme={themeJSON}>
      <CreateMatch />
    </ConfigProvider>
  );
};

export default MainContainer;
