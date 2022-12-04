import { Input } from "antd";
import React from "react";
import AvailableTokens from "../AvailableTokens";
import Button from "../Button";

const SetupTasks = () => {
  return (
    <div className="w-screen">
      <div className="w-2/3 flex mx-auto m-10 rounded-lg border border-black p-10 bg-white">
        <div className="flex w-1/2 flex-col items-center justify-center space-y-5">
          <img src={require("../../assets/eth-person.png")} alt="" />
          <div className="space-y-3">
            <AvailableTokens />
            <p className="text-center">Running Low on Tokens ?</p>
            <div className="w-[15rem] mx-auto">
              <Button text="Buy Now" arrow={0} />
            </div>
          </div>
        </div>
        <div className="space-y-10">
          <div className="space-y-1">
            <p className="text-xl">Enter Task Name</p>
            <Input
              style={{
                width: "25rem",
                border: "2px solid #D1B0FC",
              }}
            />
          </div>
          <div className="space-y-1">
            <p className="text-xl">Task Description</p>
            <textarea
              className="rounded-lg p-3"
              style={{
                resize: "none",
                outline: "none",
                width: "25rem",
                height: "8rem",
                border: "2px solid #D1B0FC",
              }}
            />
          </div>
          <div className="space-y-1">
            <p className="text-xl">Bounty Offered</p>
            <Input
              style={{
                width: "25rem",
                border: "2px solid #D1B0FC",
              }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-5 m-5 text-center">
        <p>
          You have <span className="text-gray-400">3</span> Posts Available
        </p>
        <div className="w-[15rem] mx-auto">
          <Button text="Activate Task" />
        </div>
      </div>
    </div>
  );
};

export default SetupTasks;
