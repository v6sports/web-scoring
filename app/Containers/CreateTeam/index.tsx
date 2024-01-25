"use client";
import React, { useState } from "react";
import { Button, Form, Input, Select } from "antd";

const CreateTeam = () => {
	const [selectedPlayer,setSelectedPlayer] = useState<[]>([]);
	const selectPlayer = (item) => {

		if(item) {
			setSelectedPlayer([...selectedPlayer, item]);
		}

	}
  const [teamMeta, setTeamMeta] = useState({
    name: "Spartan",
    teamCode: "spartan",
  });
  return (
    <div className="flex flex-row gap-4 justify-around h-screen w-screen p-4">
      <div className="flex flex-col  justify-center p-4  w-full   ">
        <div className="flex flex-col justify-center align-middle self-center gap-4 shadow-xl shadow-slate-200 p-4">
          <h1 className="font-bold uppercase">Add New Team</h1>
          {/* <Form name="createTeam" className="flex flex-col flex-1">
        <Form.Item name={"teamName"} rules={[{required:true,message:"Name Required"}]}>
          <Input placeholder="Name" />
        </Form.Item>
        <Button
          size="large"
          type="primary"
					htmlType="submit"
          className="flex-1 primary-btn"
          title="Create Team"
        >
          Create Team{" "}
        </Button>
      </Form> */}

          <Form name="teamPlayer" className="flex flex-col gap-1">
            <div className="flex flex-row gap-1">
              <Form.Item name={"playerName"}>
                <Input placeholder="Player Name" />
              </Form.Item>
              <Form.Item name={"playerId"} rules={[{ required: true }]}>
                <Input placeholder="Enter Player Id" />
              </Form.Item>
            </div>
            <div className="flex flex-1 w-full">
              <Form.Item
                name={"playerEmail"}
                className="flex-1"
                initialValue={"@" + teamMeta.name + ".com"}
                key={"@" + teamMeta.name + ".com"}
              >
                <Input type="email" placeholder="Enter Email" />
              </Form.Item>
            </div>
            <div className="flex flex-row gap-2">
              <Form.Item className="flex-1" name="playerType">
                <Select key={"bowl"} className="flex-1">
                  <Select.Option key={"bat"}>Batsman</Select.Option>
                  <Select.Option key={"bowl"}>Bowler</Select.Option>
                  <Select.Option key={"all"}>All Rounder</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                initialValue={"player"}
                className="flex-1 w-full"
                name="playerStatus"
              >
                <Select className="flex-1">
                  <Select.Option key={"player"}>Player</Select.Option>
                  <Select.Option key={"wk"}>Wicket Keeper</Select.Option>
                  <Select.Option key={"cap"}>Captain</Select.Option>
                  <Select.Option key={"vc"}>V. Captain</Select.Option>
                </Select>
              </Form.Item>
            </div>

            <Button className="primary-btn text-white">Create</Button>
          </Form>
        </div>
      </div>
      <div className=" p-4 w-full ">
        <h1 className="font-bold uppercase text-center">Team Members</h1>
        <div className="grid grid-cols-3  gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].flatMap((item) => (
            <div
              onClick={() => selectPlayer(item)}
              className="flex flex-row gap-2  items-center shadow-md  shadow-slate-300 p-2 rounded-md h-24 bg-black "
            >
              <div className="flex rounded-full h-12 w-12 object-cover justify-center bg-white shadow-md items-center">
                <p className="text-center align-middle ">RK</p>
              </div>
              <div>
                <h3 className="uppercase text-white">Rahul Kumar</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
