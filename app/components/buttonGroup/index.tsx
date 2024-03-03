import { Button } from "antd";
import React, { useState } from "react";

interface ButtonProps {
  key?: string;
  value: string;
  label: string;
}

interface ButtonGroupProps {
  buttons: ButtonProps[];
  colNumber?: number | string;
  handleButtonClick: (value: string | null) => void;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  buttons,
  handleButtonClick,
	colNumber='3'
}) => {
  const [selectedButton, setSelectedButton] = useState<string | number | null>(
    null
  );

  const handleButtonClickLocal = (value: string) => {
    if (selectedButton && value == selectedButton) {
      handleButtonClick(null);
      setSelectedButton(null);
      return;
    }
    handleButtonClick(value);
    setSelectedButton(value);
  };
  const numberOfColumn = colNumber ?? 3;
  return (
    <>
      <Button.Group key={"ButtonGroup"}>
        <div className=" justify-start  gap-1 ">
          <div className={`grid grid-cols-${numberOfColumn} justify-start  gap-1`}>
            {buttons.map((element) => (
              <Button
                key={element.value}
                className={`flex ${
                  selectedButton === element.value ? "bg-danger" : " primary-btn"
                } text-white  text-center items-center p-2 text-lg font-extrabold`}
                onClick={() => handleButtonClickLocal(element.value)}
              >
                {element.label}
              </Button>
            ))}
          </div>
        </div>
      </Button.Group>
    </>
  );
};

export default ButtonGroup;
