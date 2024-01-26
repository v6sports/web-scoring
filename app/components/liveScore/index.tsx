import { inningsRunRate } from "@/app/Utils/utils";
import { useAppSelector } from "@/redux/store";
import { Collapse } from "antd";
import React, { useEffect } from "react";

const LiveScore = () => {
  const scoreBallByBallData = useAppSelector(
    (state) => state.scoreBallByBallSlice
  );
  useEffect(() => {
    // This function will be called whenever scoreBallByBallData changes
    // You can perform any update logic here

  }, [scoreBallByBallData]);
	const fullScoreBoard = scoreBallByBallData.fullScore;
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-2">
        <code className="text-lg font-light">IND</code>
        <code className="text-lg font-extrabold">
          {fullScoreBoard?.totalRuns}
        </code>
        <code className="text-lg font-light">
          ( {fullScoreBoard?.totalOvers})
        </code>
        <code className="text-xs font-light text-purple-600">
          CR{" "}
          {inningsRunRate(
            fullScoreBoard?.totalRuns ? fullScoreBoard?.totalRuns : 0,
            fullScoreBoard?.validBalls ? fullScoreBoard?.validBalls : 0
          )}
        </code>
      </div>
      <Collapse>
        <Collapse.Panel header="Scores" key="1" className="bg-green-200">
          <div className="flex flex-row items-center gap-2">
            <code className="text-xs font-extrabold">IND</code>
            <code className="text-xs font-extrabold">10/1</code>
            <code className="text-xs font-light">Ov. 134</code>
            <code className="text-xs font-extrabold">(INN-1 )</code>
          </div>
          <div className="flex flex-row items-center gap-2">
            <code className="text-xs font-extrabold">PAK</code>
            <code className="text-xs font-extrabold">10/1</code>
            <code className="text-xs font-light">Ov. 134</code>
            <code className="text-xs font-extrabold">(INN-2 )</code>
          </div>
          <div className="flex flex-row items-center gap-2">
            <code className="text-xs font-extrabold">PAK</code>
            <code className="text-xs font-extrabold">10/1</code>
            <code className="text-xs font-light">Ov. 134</code>
            <code className="text-xs font-extrabold">(INN-3 )</code>
          </div>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};

export default LiveScore;
