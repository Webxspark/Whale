import React from "react";

const Button = ({ text, arrow = true }) => {
  return (
    <div className="cursor-pointer group">
      <div className="relative">
        <img
          className="absolute group-active:hidden top-0 w-full"
          src={require("../assets/button/bg-shadow-image.png")}
          alt=""
        />
        <img
          className="w-full relative top-0 translate-x-1 -translate-y-1 group-active:translate-x-0 group-active:translate-y-0 ease-out"
          src={require("../assets/button/bg-image.png")}
          alt=""
        />
        <div className="flex w-full absolute items-center translate-x-1 -translate-y-1 group-active:translate-x-0 group-active:translate-y-0 ease-out top-0 h-full justify-evenly">
          <p className="font-semibold text-md">{text}</p>
          <img
            src={require("../assets/button/arrow.png")}
            className={!arrow && "hidden"}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Button;
