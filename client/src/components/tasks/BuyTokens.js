import React, { useState } from "react";
import AvailableTokens from "../AvailableTokens";
import { Divider, Input } from "antd";
import Button from "../Button";

const BuyTokens = () => {
  const [tokens, setTokens] = useState();
  return (
    <div className="w-screen">
      <div className="w-1/3 mx-auto">
        <AvailableTokens />
        <Divider>ADD TOKENS</Divider>
      </div>

      <div className="w-2/3 mx-auto flex justify-evenly gap-20 items-stretch">
        <div className="p-8 border border-black rounded-md flex flex-col items-center gap-10">
          <p className="text-9xl">🐳</p>
          <Button text="Buy Now" arrow={0} />
        </div>
        <div className="border border-black rounded-md ">
          <p className="w-full p-1 text-center text-white border border-black bg-[#8430AB]">
            Most Popular
          </p>
          <div className="p-8 flex flex-col items-center  gap-10">
            <p className="text-9xl">🐳</p>
            <Button text="Buy Now" arrow={0} />
          </div>
        </div>
        <div className="p-8 border border-black rounded-md flex flex-col items-center gap-10">
          <p className="text-9xl">🐳</p>
          <Button text="Buy Now" arrow={0} />
        </div>
      </div>
      <div className="w-2/3 mx-auto my-10">
        <Divider>ENTER THE AMOUNT OF TOKENS</Divider>

        <div className="w-2/3 my-5 mx-auto">
          <Input
            onChange={(e) => setTokens(e.target.value)}
            value={tokens}
            type="number"
            style={{
              height: "3rem",
              border: "2px solid black",
              fontSize: "1rem",
              backgroundColor: "#CFB0FF",
              backgroundOpacity: "0.2",
            }}
          />
          <p className="text-center mt-5 font-semibold flex justify-evenly px-10 text-2xl">
            <span>{tokens || 1} $WTK</span> <span>=</span>{" "}
            <span>{tokens ? (tokens * 285.11).toFixed(3) : 285.11} MATIC</span>
          </p>

          <div className="w-[12rem] mx-auto my-5">
            <Button text="Mint Now" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyTokens;
