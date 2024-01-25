import React from "react";

const Players = () => {
  const selectPlayer = (player: any) => {
    console.log(player);
  };
  return (
    <div className="grid grid-cols-3  gap-4">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].flatMap((item) => (
        <div
          onClick={() => selectPlayer(item)}
          className="flex flex-row gap-2  items-center shadow-md  shadow-slate-300 p-2 rounded-md h-12 bg-black "
        >
          <div className="flex rounded-full h-8 w-8 object-cover justify-center bg-white shadow-md items-center">
            <p className="text-center align-middle ">RK</p>
          </div>
          <div>
            <h4 className="uppercase text-white">Rahul Kumar</h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Players;
