import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { WalletContext } from "../contexts/walletContext";
import { OpenConnectWalletModal } from './function';
function ConnectBtn() {
    const walletContext = useContext(WalletContext);
    const userContext = useContext(UserContext)
    const { currentAddress, checkIfWalletIsConnected, connectWallet } = walletContext;
    const { createUserAccount, getCurrentUserDetails, currentUser } = userContext;

    useEffect(() => {
        checkIfWalletIsConnected();
    }, [])
    useEffect(() => {
        if (currentAddress) {
            createUserAccount(currentAddress);
            getCurrentUserDetails();
        }
    }, [currentAddress])
    return (
        <p style={{ display: 'block' }} className="border rounded-full border-black font-semibold px-3 py-1 hover:bg-gray-100 cursor-pointer hover:tracking-wide">
            {
                (currentAddress === '' || currentAddress === undefined) ? (<div onClick={() => connectWallet()}>Connect Wallet</div>) : (<Link to='/myaccount'>{currentAddress.slice(0, 6)}...{currentAddress.slice(-4)}</Link>)
            }
        </p>
    );
}
export default ConnectBtn;
