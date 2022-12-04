import { useState, useEffect, createContext, useContext } from "react";
import { ethers } from "ethers";

export const WalletContext = createContext();


export const WalletProvider = ({ children }) => {
    const [currentAddress, setCurrentAddress] = useState('');
    const [currentBalance, setCurrentBalance] = useState(0.0);

    const checkIfWalletIsConnected = async () => {
        if (!window.ethereum) return;
        try {
            const addressArray = await window.ethereum.request({
                method: 'eth_accounts',
            })
            if (addressArray.length > 0) {
                setCurrentAddress(addressArray[0]);
            } else {
                console.log("Wallet not connected");
                return;
            }
        } catch (err) {
            console.log(err);
        }
    }

    const getAccountBalance = async () => {
        try {
            if (!window.ethereum) return alert("Please install metamask");
            const balance = await window.ethereum.request({ method: 'eth_getBalance', params: [currentAddress, 'latest'] });
            setCurrentBalance(ethers.utils.formatEther(balance));
        } catch (error) {
            console.log(error);
        }
    }

    const connectWallet = async () => {
        if (!window.ethereum) return alert("Please install metamask");
        try {
            const addressArray = await window.ethereum.request({
                method: 'eth_requestAccounts',
            })
            if (addressArray.length > 0) {
                setCurrentAddress(addressArray[0])
            } else {
                return;
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <WalletContext.Provider value={{
            connectWallet,
            checkIfWalletIsConnected,
            getAccountBalance,
            currentAddress,
            currentBalance,
            setCurrentAddress
        }}>
            {children}
        </WalletContext.Provider>
    )
}