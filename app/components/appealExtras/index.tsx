import React, { useState } from "react";
import { Button, Radio } from "antd";
import CustomModal from "../modal";
import Appeal from "../appeal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { updateExtras } from "@/redux/features/slices/ballByBallSlice";
import ButtonGroup from "../buttonGroup";

const AppealExtras = () => {
  const [showModalForAppeal, setShowModalForAppeal] = useState(false);
  const dispacth = useDispatch<AppDispatch>();
  const selectExtra = (e: any) => {
    dispacth(updateExtras({ extra_type: e.target.value }));
  };
  const hideModal = () => {
    setShowModalForAppeal(false);
  };
  return (
    <div className="flex flex-col justify-center border border-1 rounded-md w-[360px] mt-2 mb-2 pb-2">
      <p className="text-red-600 uppercase text-sm font-bold text-center">
        Appeal And Extras
      </p>
      <hr className=" w-full" />
      <div className="flex flex-col gap-2 items-start justify-start">
        <Button
          className="bg-orange m-2 uppercase text-white"
          onClick={() => setShowModalForAppeal(true)}
        >
          Appeal
        </Button>
        <ButtonGroup
          colNumber={6}
          handleButtonClick={(value: string | null) => {
						//@ts-ignore
            dispacth(updateExtras({ extra_type: value }))
					}
          }
          buttons={[
            {
              label: "WD",
              value: "wide",
            },
            {
              label: "NB",
              value: "no-ball",
            },
            {
              label: "LB",
              value: "leg-bye",
            },
            {
              label: "B",
              value: "bye",
            },
          ]}
        />
        <CustomModal
          children={<Appeal />}
          hide={hideModal}
          visible={showModalForAppeal}
        ></CustomModal>
      </div>
    </div>
  );
};

export default AppealExtras;
