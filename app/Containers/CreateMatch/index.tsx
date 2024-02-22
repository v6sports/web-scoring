"use client";
import React from "react";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
// import { getMatch } from "@/redux/features/slices/matchSlice";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";

const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  // Can not select days before today and today
  return current < dayjs().startOf("day");
};

const CreateMatch = () => {

	const dispatch = useDispatch<AppDispatch>();
	const selector = useAppSelector(state=> state.matchSliceReducer.match_id)
  const selectMatchDay = (day: string) => {

    console.log(day);
  };
  const triggerCreateMatch = (values:any) => {
		// dispatch(getMatch('Apple'))
    // console.log(selector);
  };
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col justify-center">
        <h1 className="uppercase text-black font-extrabold text-center">

          Create New Match
        </h1>
        <div className="flex flex-col flex-1 ">
          <Form
            onFinish={(values) => triggerCreateMatch(values)}
            name="createMatch"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <Form.Item
                rules={[
                  {
                    required: true,
                    min: 5,
                    message: "Name Required greater then 5 character ",
                  },
                ]}
                className="flex-1 item-shadow"
                name={"matchName"}
              >
                <Input
                  size="large"
                  className="font-bold"
                  title="Match Name item-shadow"
                  placeholder="Enter Match Name"
                />
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    required: true,
                  },
                ]}
                className="flex-1"
                name={"matchType"}
              >
                <Select size="large" placeholder="T20, ODI, Test">
                  <Select.Option key={"t20"}>T20</Select.Option>
                  <Select.Option key={"odi"}>ODI</Select.Option>
                  <Select.Option key={"test"}>Test</Select.Option>
                </Select>
              </Form.Item>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Form.Item
                rules={[
                  {
                    required: true,
                  },
                ]}
                className="flex-1"
                name={"homeTeam"}
              >
                <Select placeholder="Select Home Team">
                  <Select.Option key={"ind"}>India</Select.Option>
                  <Select.Option key={"pak"}>Pakistan</Select.Option>
                  <Select.Option key={"aus"}>Australia</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    required: true,
                  },
                ]}
                className="flex-1"
                name={"awayTeam"}
              >
                <Select placeholder="Select Away Team">
                  <Select.Option key={"ind"}>India</Select.Option>
                  <Select.Option key={"pak"}>Pakistan</Select.Option>
                  <Select.Option key={"aus"}>Australia</Select.Option>
                </Select>
              </Form.Item>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Form.Item
                rules={[
                  {
                    required: true,
                  },
                ]}
                className="flex-1"
                name={"venue"}
              >
                <Select placeholder="Select Venue  Match" showSearch>
                  <Select.Option key={"hpca"}>HPCA</Select.Option>
                  <Select.Option key={"kullu"}>KULLU</Select.Option>
                  <Select.Option key={"bilaspur"}>Bilaspur</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please Select Date and Time",
                  },
                ]}
                className="flex-1 w-full"
                name={"matchDate"}
              >
                <DatePicker
                  showTime={{ format: "HH:mm" }}
                  className="w-full"
                  onChange={() => selectMatchDay}
                  disabledDate={disabledDate}
                  format={"DD-MM-YYYY HH:mm A"}
                />
              </Form.Item>
            </div>
            <Button
              size="large"
              htmlType="submit"
              className="flex-1 w-full primary-btn"
              type="primary"
            >
              Create Match
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateMatch;
