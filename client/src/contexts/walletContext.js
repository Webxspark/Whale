import { useState, useEffect, createContext, useContext } from "react";
import { ethers } from "ethers";
import Web3 from 'web3';

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
            setCurrentBalance(Number(ethers.utils.formatEther(balance)).toFixed(2));
        } catch (error) {
            console.log(error);
        }
    }

    const getWTKBalance = async () => {
        try {
            let tokABI = [
                {
                    "constant": true,
                    "inputs": [{ "name": "_owner", "type": "address" }],
                    "name": "balanceOf",
                    "outputs": [{ "name": "balance", "type": "uint256" }],
                    "type": "function"
                },
            ];
            let wtkAddress = "0xA1C1f49dB1ACE156f4C4efc6fBafbc87379E8fCf";
            let web3 = new Web3(window.ethereum);
            let contract = new web3.eth.Contract(tokABI, wtkAddress);
            let bal = await contract.methods.balanceOf(currentAddress).call();
            return bal / 10 ** 18;
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
            setCurrentAddress,
            getWTKBalance
        }}>
            {children}
        </WalletContext.Provider>
    )
}