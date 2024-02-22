import { Table, Tooltip } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
interface iProps {
	refetchParent:()=>void,
	matchId:string|number,
	currentInning:string|number
}
const EditBalls:React.FC<iProps> = (props) => {
	let { refetchParent,matchId,currentInning } = props;
  const [data, setData] = useState([]);
  const fetchDataFromAPI = async () => {
    try {

      const response = await Axios.post("/api/readScore", {
        match_id: matchId,
        inning_number:currentInning,
      });
      setData(response.data?.fullScore?.currentOver);
    } catch (error) {
      console.error("Error fetching data from API", error);
    }
  };
  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  const handleDelete = async (key:any) => {

    let { over, on_strike, on_attack, match_id, ballNumber, inning_number } =
      key;
    await Axios.post("/api/undoBall", {
      over: over,
      batterId: on_strike,
      bowlerId: on_attack,
      inningNumber: inning_number,
      matchId: match_id,
      ballNumber: ballNumber,
    }).then(res=>{

			refetchParent();

		});
  };

  const columns = [
    { title: "Ball Number", dataIndex: "ballNumber", key: "ballNumber" },
    { title: "Run", dataIndex: "run", key: "run" },
    { title: "Bowler ID", dataIndex: "bolwerId", key: "bolwerId" },
    {
      title: "Action",
      key: "action",
      render: (text:any, record:any, index:any) =>
        index === data.length - 1 && (
          <Tooltip title={`You can only delete the last ball of over ${record.over}.${record.ballNumber}`}>
            <button
              className="bg-red-600 text-white p-2 rounded-lg"
              onClick={() => handleDelete(record)}
            >
              Delete
            </button>
          </Tooltip>
        ),
    },
    // Add more columns as needed
  ];

  return (
    <>
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        bordered
        size="small"
      />
    </>
  );
};

export default EditBalls;
