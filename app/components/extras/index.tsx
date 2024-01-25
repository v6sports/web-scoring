import { Collapse } from "antd";
import React from "react";

const Extras = () => {
  return (
    <Collapse>
      <Collapse.Panel
        key={2}
        header={
          <div className="flex flex-row gap-2">
            <code className="text-xs font-bold">Extras</code>
            <code className="text-xs font-bold text-red-900">10</code>
          </div>
        }
        className="bg-red-100"
      >
        <div className="flex flex-col">
          <div className="flex flex-row gap-2">
            <code className="m-0 p-0  text-xs font-extralight  w-16">
              Wide{" "}
            </code>
            <code className="m-0 p-0  text-xs font-extrabold w-max"> 1</code>
          </div>

          <div className="flex flex-row gap-2">
            <code className="m-0 p-0  text-xs font-extralight  w-16">
              No Ball{" "}
            </code>
            <code className="m-0 p-0  text-xs font-extrabold"> 1</code>
          </div>
          <div className="flex flex-row gap-2">
            <code className="m-0 p-0  text-xs font-extralight  w-16">
              Bye Run{" "}
            </code>
            <code className="m-0 p-0  text-xs font-extrabold"> 1</code>
          </div>
          <div className="flex flex-row gap-2">
            <code className="m-0 p-0  text-xs font-extralight  w-16">
              Leg By{" "}
            </code>
            <code className="m-0 p-0  text-xs font-extrabold"> 1</code>
          </div>
        </div>
      </Collapse.Panel>
    </Collapse>
  );
};

export default Extras;
