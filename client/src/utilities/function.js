import { Button, message } from "antd";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";
import { WalletContext } from "../contexts/walletContext";
export var OpenConnectWalletModal = () => {
    var modal = document.querySelector("#connectWallet");
    modal.style.display = "block";
};

export var ConnectWalletForm = () => {
    const [Role, setRole] = useState("");
    const [Name, setName] = useState("");
    const [err, seterr] = useState(false);
    const userContext = useContext(UserContext);
    const walletContext = useContext(WalletContext);
    const { registerUser, currentUser } = userContext;
    const { currentAddress } = walletContext;
    function onFinish(e) {
        e.preventDefault();
        var data = {
            name: Name,
            role: Role
        };
        console.log(data);
        registerUser(data.name, (data.role === 'admin' ? true : false), currentAddress);
        document.querySelector('[name="userName"]').value = '';
        setName(''); setRole(''); seterr(true);
        //API Call here
        message.loading('Please wait...', 1.8);
        setTimeout(() => {
            message.success('You\'re all set!');
            document.querySelector('[class="modal"]').style.display = "none";
        }, 2000);
    }
    useEffect(() => {
        if (Name.trim() === "" || Name.trim().length === 0) {
            seterr(true);
        } else if (Role.trim() === "" || Role.trim().length === 0) {
            seterr(true);
        } else {
            seterr(false);
        }
    }, [Role, Name]);
    useEffect(() => {
        if (currentUser) {
            if (currentUser.registered) {
                document.querySelector('[class="modal"]').style.display = "none";
            }
        }
    }, [currentUser])
    return (
        <>
            <form autoComplete="false" onSubmit={onFinish} method="POST" id="connect-wallet-form">
                <div className="grid justify-items-center">
                    <div className="form-group">
                        <label>Name: &nbsp;</label>
                        <input
                            onKeyUp={(e) => {
                                setName(e.target.value);
                            }}
                            type={"text"}
                            name="userName"
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-evenly w-full mx-16 py-8">
                    <div>
                        <input
                            onChange={(e) => setRole(e.target.value)}
                            type={"radio"}
                            style={{ display: "none" }}
                            id="admin"
                            value={"admin"}
                            name="role"
                        />
                        <label for="admin">
                            <div
                                className={
                                    Role === "admin" ? "radio-card selected" : "radio-card"
                                }
                            >
                                <div className="flex flex-col gap-y-2 justify-items-center">
                                    <img
                                        className="flex-item"
                                        src={require("../assets/Illustration - guy+cat 1.png")}
                                        alt=""
                                        style={{ width: "auto" }}
                                    />
                                    <img
                                        src={require("../assets/Admin Button.png")}
                                        alt=""
                                        style={{ width: "135px" }}
                                    />
                                </div>
                            </div>
                        </label>
                    </div>
                    <input
                        onChange={(e) => setRole(e.target.value)}
                        type={"radio"}
                        style={{ display: "none" }}
                        id="contributor"
                        value={"contributor"}
                        name="role"
                    />
                    <label for="contributor">
                        <div
                            className={
                                Role === "contributor" ? "radio-card selected" : "radio-card"
                            }
                        >
                            <div className="flex flex-col gap-y-2 justify-items-center">
                                <img
                                    className="flex-item"
                                    src={require("../assets/Illustration - Asset 35.png")}
                                    alt=""
                                    style={{ width: "180px" }}
                                />
                                <img
                                    src={require("../assets/Contributer Button.png")}
                                    alt=""
                                    style={{ width: "125px" }}
                                />
                            </div>
                        </div>
                    </label>
                    <div></div>
                </div>
                <div className="cac">
                    <Button
                        size="large"
                        htmlType="submit"
                        style={{ width: "350px" }}
                        block
                        disabled={err ? 'true' : ''}
                        type={err ? 'default' : 'primary'}
                    >
                        Done
                    </Button>
                </div>
            </form>
        </>
    );
};
