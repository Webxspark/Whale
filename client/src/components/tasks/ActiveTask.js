import React from "react";
import Button from "../Button";

const ActiveTask = () => {
  return (
    <div className="m-20 space-y-10">
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
    </div>
  );
};

export default ActiveTask;

const TaskCard = () => {
  return (
    <div className="bg-[#FFEBD2]/80 relative items-start w-2/3 mx-auto border flex justify-between border-black p-6 rounded-lg">
      <div className="absolute rounded-lg border border-black -top-5 left-1/3 right-1/3 bg-white px-10 py-2">
        <p className="text-center text-[#DD872A] font-semibold">
          Bounty: 30 $WTK
        </p>
      </div>
      <div className="flex flex-col">
        <h1 className="font-bold space-y-10">TASK NAME - COMMUNITY NAME</h1>
        <p className="w-2/3">
          LoremIpsum rmrfmri mfiefe rfeifef fififw i mifokfrofm
          okfeorfmermermferferfmvm{" "}
        </p>
      </div>
      <div className="flex flex-col items-end gap-5 text-right">
        <button className="border border-red-400 px-20 hover:bg-red-600 hover:border-black hover:text-white text-red-500 py-1 rounded-full">
          STOP
        </button>
        <div className="flex space-x-5 justify-center items-center">
          <p className="flex items-center space-x-1">
            <span>Submissions:</span>
            <span>06</span>
          </p>
          <div className="w-[12rem]">
            <Button text="View Response" />
          </div>
        </div>
      </div>
    </div>
  );
};
