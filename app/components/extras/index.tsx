import { Collapse } from "antd";
import React from "react";

interface currentInningScore  {
	extrasFromScore: any;
}
const Extras:React.FC<currentInningScore> = (props) => {
let {extrasFromScore} = props;
	const total = extrasFromScore ? Object?.values(extrasFromScore).reduce(
    (acc, val) => acc + (typeof val === "number" ? val : 0),
    0
  ) : 0;
  return (
    <Collapse>
		{console.log('extras',props.extrasFromScore)}
      <Collapse.Panel
        key={2}
        header={
          <div className="flex flex-row gap-2">
            <code className="text-xs font-bold">Extras</code>
            <code className="text-xs font-bold text-red-900">{total || 0}</code>
          </div>
        }
        className="bg-red-100"
      >
        <div className="flex flex-col">
          <div className="flex flex-row gap-2">
            <code className="m-0 p-0  text-xs font-extralight  w-16">
              Wide{" "}
            </code>
            <code className="m-0 p-0  text-xs font-extrabold w-max"> {extrasFromScore?.wide || 0}</code>
          </div>

          <div className="flex flex-row gap-2">
            <code className="m-0 p-0  text-xs font-extralight  w-16">
              No Ball{" "}
            </code>
            <code className="m-0 p-0  text-xs font-extrabold"> {extrasFromScore?.noBall || 0}</code>
          </div>
          <div className="flex flex-row gap-2">
            <code className="m-0 p-0  text-xs font-extralight  w-16">
              Bye Run{" "}
            </code>
            <code className="m-0 p-0  text-xs font-extrabold">  {extrasFromScore?.bye || 0}</code>
          </div>
          <div className="flex flex-row gap-2">
            <code className="m-0 p-0  text-xs font-extralight  w-16">
              Leg By{" "}
            </code>
            <code className="m-0 p-0  text-xs font-extrabold">  {extrasFromScore?.legBye || 0}</code>
          </div>
        </div>
      </Collapse.Panel>
    </Collapse>
  );
};

export default Extras;
