import React from "react";
import ConnectBtn from "../utilities/connectBtn";
import { Link } from "react-router-dom";
const Header = () => {
    return (
        <div className="w-screen z-50 bg-white p-5 border-b border-black">
            <div className="flex justify-between items-center w-2/3 mx-auto">
                <Link
                    to="/"
                    className="font-semibold text-xl"
                    style={{ fontFamily: "Poppins" }}
                >
                    Whale 🐳
                </Link>
                <ConnectBtn></ConnectBtn>
            </div>
        </div>
    );
};

export default Header;
