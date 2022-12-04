import React, { useContext, useState, useEffect } from "react";
import ConnectBtn from "../utilities/connectBtn";
import { Link } from "react-router-dom";
import { WalletContext } from "../contexts/walletContext";
const Header = () => {
    const walletContext = useContext(WalletContext);
    const [wtkBal, setWTKBal] = useState(0);
    const { getWTKBalance, currentAddress, currentBalance, getAccountBalance } = walletContext;
    const getBalance = async () => {
        const tkns = await getWTKBalance();
        setWTKBal(tkns);
    }
    useEffect(() => {
        getBalance();
        getAccountBalance();
    }, [currentAddress])
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
                <div className="flex items-center">
                    <ConnectBtn></ConnectBtn>
                    <h3 className="mx-3 text-lg">{wtkBal} 🐳</h3>
                    <h3 className="mx-2 text-lg">{currentBalance} MATIC</h3>
                </div>
            </div>
        </div>
    );
};

export default Header;
