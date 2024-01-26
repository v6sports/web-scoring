import { Button, Modal, Tooltip } from "antd";
import React, { useState } from "react";
import Players from "../players";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { resetFielder, resetOutMethod, setOutMethod } from "@/redux/features/slices/inningsTrackSlice";

const allWickets = [
  {
    key: "bowled",
    label: "Bowled",
    description:
      "Bowler dismisses the batsman by hitting the stumps with the ball.",
  },
  {
    key: "caught",
    label: "Caught",
    description:
      "Batsman hits the ball, and it is caught by a fielder or wicketkeeper before it touches the ground.",
  },
  {
    key: "lbw",
    label: "LBW",
    description:
      "Batsman is out leg before wicket, meaning the ball would have hit the stumps but hits the leg first.",
  },
  {
    key: "run_out",
    label: "Run Out",
    description:
      "Batsman is dismissed while attempting a run, and the fielding side successfully breaks the stumps before the batsman reaches the crease.",
  },
  {
    key: "stumped",
    label: "Stumped",
    description:
      "Batsman is out of the crease, and the wicketkeeper breaks the stumps with the ball in hand.",
  },
  {
    key: "hit_wicket",
    label: "Hit Wicket",
    description:
      "Batsman hits his own stumps with the bat or any part of his person while the ball is in play.",
  },
  {
    key: "handled_the_ball",
    label: "Handled the Ball",
    description:
      "Batsman deliberately handles the ball without the permission of the fielding side.",
  },
  {
    key: "obstructing_the_field",
    label: "Obstructing the Field",
    description: "Batsman obstructs a fielder while the ball is in play.",
  },
  {
    key: "retired_hurt",
    label: "Retired Hurt",
    description:
      "Batsman leaves the field due to injury or illness during his innings.",
  },
  {
    key: "timed_out",
    label: "Timed Out",
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
    description:
      "Batsman leaves the field voluntarily without the umpire's consent but is considered out for that innings.",
  },
  {
    key: "handled_ball",
    label: "Handled Ball",
    description:
      "Batsman handles the ball without the permission of the fielding side.",
  },
  {
    key: "hit_wicket_marshalled",
    label: "Hit Wicket-Marshalled",
    description:
      "Batsman hits the stumps after the ball has been declared dead but before the next delivery.",
  },
  {
    key: "obstructing_field",
    label: "Obstructing Field",
    description:
      "Batsman obstructs the field without the permission of a fielder.",
  },
];

const Wicket = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWicketType, setSelectedWicketType] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
	const dispatch = useDispatch<AppDispatch>();

	const handleButtonClick = (value) => {
    if (value == selectedWicketType) {
      setSelectedWicketType(null);
			dispatch(resetOutMethod());
			dispatch(resetFielder());
      return;
    }

		dispatch(setOutMethod(value));
    setSelectedWicketType(value);
  };

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
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
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
                title={wicket.description}
              >
                <Button
                  onClick={() => handleButtonClick(wicket.key)}
                  className={`${
                    wicket.key === selectedWicketType
                      ? "bg-danger"
                      : "primary-btn"
                  } text-left text-white  rounded-sm`}
                >
                  {wicket.label}
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
      </Modal>
      <div className="">
        <Button
          onClick={() => showModal()}
          className="bg-red-400 text-black w-34 h-14 p-10"
        >
          Wicket
        </Button>
      </div>
    </div>
  );
};

export default Wicket;
