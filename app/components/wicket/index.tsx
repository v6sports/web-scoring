import { Button, Image, Modal, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import Players from "../players";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { resetFielder, resetOutMethod, setOutMethod } from "@/redux/features/slices/inningsTrackSlice";
import CustomModal from "../modal";

const allWickets = [
  {
    key: "bowled",
    label: "Bowled",
		icon:'bowled.png',
    description:
      "Bowler dismisses the batsman by hitting the stumps with the ball.",
  },
  {
    key: "caught",
    label: "Caught",
		icon:'catch.png',
    description:
      "Batsman hits the ball, and it is caught by a fielder or wicketkeeper before it touches the ground.",
  },
  {
    key: "lbw",
    label: "LBW",
		icon:'lbw.png',
    description:
      "Batsman is out leg before wicket, meaning the ball would have hit the stumps but hits the leg first.",
  },
  {
    key: "run_out",
    label: "Run Out",
		icon:'run-out.png',

    description:
      "Batsman is dismissed while attempting a run, and the fielding side successfully breaks the stumps before the batsman reaches the crease.",
  },
  {
    key: "stumped",
    label: "Stumped",
		icon:'keeper.png',
    description:
      "Batsman is out of the crease, and the wicketkeeper breaks the stumps with the ball in hand.",
  },
  {
    key: "hit_wicket",
    label: "Hit Wicket",
		icon:'hit_wicket.png',
    description:
      "Batsman hits his own stumps with the bat or any part of his person while the ball is in play.",
  },
  {
    key: "retired_hurt",
		icon:'retired_out.png',
    label: "Retired Hurt",
    description:
      "Batsman leaves the field due to injury or illness during his innings.",
  },
  {
    key: "timed_out",
    label: "Timed Out",
		icon:'timed-out.png',
    description:
      "Batsman takes more than a specified time to come out to the field after the fall of the previous wicket.",
  },
  {
    key: "hit_the_ball_twice",
    label: "Hit the Ball Twice",
    description: "Batsman deliberately hits the ball twice, not in defense.",
  },
  {
    key: "retired_out",
    label: "Retired Out",
		icon:'retired_out.png',
    description:
      "Batsman leaves the field voluntarily without the umpire's consent but is considered out for that innings.",
  },
  {
    key: "handled_ball",
    label: "Handled Ball",
		icon:'ball-handling.png',
    description:
      "Batsman handles the ball without the permission of the fielding side.",
  },
  {
    key: "obstructing_field",
    label: "Obstruct Field",
		icon:'obstruct.png',
    description:
      "Batsman obstructs the field without the permission of a fielder.",
  },
];

const Wicket = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWicketType, setSelectedWicketType] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
	const dispatch = useDispatch<AppDispatch>();
	const wicketSelecter = useAppSelector((state) => state.inningsTrackSlice);

	const handleButtonClick = (value:any) => {
    if (value == selectedWicketType) {
      setSelectedWicketType(null);
			dispatch(resetOutMethod());
			dispatch(resetFielder());
      return;
    }

		dispatch(setOutMethod(value));
    setSelectedWicketType(value);
  };

useEffect(() => {
		if (wicketSelecter.out_method == null || wicketSelecter.out_method == -1) {
			setSelectedWicketType(null);
		}
}, [wicketSelecter.out_method]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="flex">
      <CustomModal
        title="Wicket"
				hide={handleCancel}
				visible={isModalOpen}

      >
        <Button.Group className="grid grid-cols-3 gap-1">
          {allWickets.map((wicket) => {
            return (
              <Tooltip
                className={`${
                  wicket.key === selectedWicketType &&
                  selectedWicketType != null
                    ? "block "
                    : selectedWicketType == null
                    ? "block "
                    : "hidden "
                }`}
                title={
                  <>

                    {wicket.description}
                  </>
                }
              >
                <Button
                  onClick={() => handleButtonClick(wicket.key)}
                  className={`${
                    wicket.key === selectedWicketType
                      ? "bg-danger"
                      : "bg-black rounded-md"
                  } text-left text-white  rounded-lg`}
                >
                  <div className=" flex flex-row justify-start gap-2">
                    {wicket.icon && (
                      <Image
                        width={25}
												preview={false}
                        className="w-28 h-28 rounded bg-white mr-2 "
                        src={`/wickets/${wicket.icon}`}
                      />
                    )}
                    <p> {wicket.label} </p>
                  </div>
                </Button>
              </Tooltip>
            );
          })}
        </Button.Group>
        <div className="mt-5">
          {selectedWicketType == "run_out" || selectedWicketType == "caught" ? (
            <Players />
          ) : (
            ""
          )}
        </div>
      </CustomModal>
      <div className="">
        <Button
          onClick={() => showModal()}
          className="flex bg-red-700 text-white  uppercase  justify-center items-center rounded-md p-6"
        >
          Wicket
        </Button>
      </div>
    </div>
  );
};

export default Wicket;
