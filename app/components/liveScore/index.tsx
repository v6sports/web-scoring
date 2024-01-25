import { Collapse } from "antd";
import React from "react";

const LiveScore = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-2">
        <code className="text-lg font-light">IND</code>
        <code className="text-lg font-extrabold">10/1</code>
        <code className="text-lg font-light">(5.2)</code>
        <code className="text-xs font-light text-purple-600">CR 6.00</code>
      </div>
      <Collapse>
	  <Collapse.Panel header="Scores"  key="1" className="bg-green-200" >
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
