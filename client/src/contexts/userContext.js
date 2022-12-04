import { useState, useEffect, createContext, useContext } from "react";
import { ethers } from "ethers";
import { WalletContext, WalletProvider } from "./walletContext";
import { client } from "../utilities/client";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();

    const createUserAccount = async (userAddress) => {
        if (!window.ethereum) return alert("No Metamask installed !!")
        try {
            const userDoc = {
                _type: 'user',
                _id: userAddress,
                name: '',
                admin: false,
                walletAddress: userAddress,
                registered: false
            }

            await client.createIfNotExists(userDoc);
            console.log("Account Created/Retrieved Successfully !!!");
        } catch (error) {
            console.log(error);
        }
    }

    const getCurrentUserDetails = async (userAccount) => {
        const query = `
        *[_type == "user" && _id == "${userAccount}"]{
            name,
            admin,
            registered,
            walletAddress
        }
        `
        const response = await client.fetch(query)
        console.log(response);
        setCurrentUser({
            name: response[0].name,
            admin: response[0].admin,
            walletAddress: response[0].walletAddress,
            registered: response[0].registered,
        })
    }

    const registerUser = async (name, admin, userAccount) => {
        await client.patch(userAccount).set({
            admin: (admin) ? true : false,
            registered: true,
            name: name
        }).commit().then((updatedUser) => {
            console.log('Hurray, the user is updated! New document:')
            console.log(updatedUser);
            setCurrentUser({
                name: updatedUser[0].name,
                admin: updatedUser[0].admin,
                walletAddress: updatedUser[0].walletAddress,
                registered: updatedUser[0].registered,
            });
        }).catch((err) => {
            console.error('Oh no, the update failed: ', err.message)
        })
    }

    return (
        <UserContext.Provider value={{
            currentUser,
            createUserAccount,
            getCurrentUserDetails,
            registerUser
        }}>
            {children}
        </UserContext.Provider>
    )
}