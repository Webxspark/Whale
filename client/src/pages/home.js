import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import Modal from "../components/modal";
import { UserContext } from "../contexts/userContext";
import { WalletContext } from "../contexts/walletContext";
import {
    OpenConnectWalletModal,
    ConnectWalletForm,
} from "../utilities/function";
const Home = () => {
    const [registered, setRegistered] = useState(false);
    const [btnText, setBtnText] = useState("Register User");
    const walletContext = useContext(WalletContext);
    const userContext = useContext(UserContext);
    const { currentUser, getCurrentUserDetails } = userContext;
    const { currentAddress, checkIfWalletIsConnected, connectWallet } = walletContext;
    const navigate = useNavigate()
    useEffect(() => {
        checkIfWalletIsConnected();
        getCurrentUserDetails(currentAddress);
    }, [currentAddress])
    useEffect(() => {
        if (currentUser) {
            console.log(currentUser);
            if (!currentUser.registered) {
                setRegistered(false);
                setBtnText("Register User");
            } else {
                setRegistered(true);
                setBtnText("Registered ✅");
            }
        }
    }, [currentUser])
    return (
        <div className="w-screen overflow-hidden min-h-screen bg-gradient-to-r from-pink-100 to-violet-100">
            <Header />
            <div className="grid h-screen place-items-center">
                <span className="hero-elements">
                    <h1 className="hero-title font-semibold text-8xl">Whale 🐳</h1>
                    <p className="font-medium" >
                        The Only DAO / Community platform you will need
                    </p>
                    <div className="grid justify-items-center" onClick={() => { (currentAddress === '' || currentAddress === undefined) ? connectWallet() : OpenConnectWalletModal() }}>
                        {
                            (currentAddress === '' || currentAddress === undefined) ?
                                <Button text="Connect Wallet" arrow={0}></Button> : <Button text={`${btnText}`} arrow={0}></Button>
                        }
                    </div>
                    <br></br>
                    <div className="grid justify-items-center" onClick={() => navigate('/redirect')}>
                        {
                            (registered) ? <Button text="Dashboard" arrow={0}></Button> : ''
                        }
                    </div>
                </span>
            </div>
            <Modal id="connectWallet" title="Getting Started">
                <ConnectWalletForm></ConnectWalletForm>
            </Modal>
        </div>
    );
};
export default Home;
