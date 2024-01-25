"use client";
import Image from "next/image";
import MainContainer from "./MainContainer";
import CreateTeam from "./Containers/CreateTeam";
import { ReduxProvider } from "@/redux/provider";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <MainContainer />

      {/* <CreateTeam /> */}
    </div>
  );
}
