import React from "react";

const HeaderTabs = ({ activeTabs, setActiveTabs }) => {
  return (
    <div className="w-screen">
      <div className="w-1/3 mx-auto items-center flex justify-evenly p-2 m-8 rounded-lg text-white font-bold font-poppins border border-black bg-[#9747FF]/80">
        <div
          onClick={() => setActiveTabs(0)}
          className={` ${
            activeTabs === 0
              ? "bg-[#D1B0FC] border border-black font-semibold text-black"
              : "hover:border border-black  hover:bg-[#D1B0FC] hover:text-black hover:font-light"
          } cursor-pointer rounded-md p-2`}
        >
          Setup Tasks
        </div>
        <div
          onClick={() => setActiveTabs(1)}
          className={` ${
            activeTabs === 1
              ? "bg-[#D1B0FC] border border-black font-semibold text-black"
              : "hover:border border-black  hover:bg-[#D1B0FC] hover:text-black hover:font-light"
          } cursor-pointer rounded-md p-2`}
        >
          Active Tasks
        </div>
        <div
          onClick={() => setActiveTabs(2)}
          className={` ${
            activeTabs === 2
              ? "bg-[#D1B0FC] border border-black font-semibold text-black"
              : "hover:border border-black  hover:bg-[#D1B0FC] hover:text-black hover:font-light"
          } cursor-pointer rounded-md p-2`}
        >
          Buy Tokens
        </div>
      </div>
    </div>
  );
};

export default HeaderTabs;
