import Button from "../components/Button";
import Header from "../components/Header";
import { ConnectWalletForm } from "../utilities/function";
import Modal from "../components/modal";
const Contributors = () => {
  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-pink-100 to-violet-100">
      <Header />

      <div className="flex items-start justify-evenly">
        <div className="m-32 pt-10 mb-0 relative bg-[#FF00E5]/10 border border-black w-1/5 font-poppins p-10 pb-32">
          <h1 className="font-semibold tracking-wider text-2xl pb-4">
            REDEEM YOUR $WTK🐳
          </h1>
          <div className="space-y-5 text-md">
            <div className="flex items-start space-x-3">
              <img src={require("../assets/tickcircle.png")} alt="tick" />
              <p>Redeem Tokens</p>
            </div>
            <div className="flex items-start space-x-3">
              <img src={require("../assets/tickcircle.png")} alt="tick" />
              <p>Earn Rewards</p>
            </div>
            <div className="flex items-start space-x-3">
              <img src={require("../assets/tickcircle.png")} alt="tick" />
              <p>
                Redeem with cool merchandise / tickets to you favorite shows and
                movies !
              </p>
            </div>
            <Button text="Explore Bounties" />
          </div>
          <img
            className="absolute h-32 -right-20 -bottom-0"
            src={require("../assets/box.png")}
            alt=""
          />
        </div>
        <div className="flex flex-col w-2/3">
          <div className="flex relative space-x-10 items-stretch m-32 mt-10 mb-0 w-auto border p-10 border-black bg-[#FF00E529]/30">
            <p className="tracking-wider w-2/3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
              Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
              Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris
              massa. Vestibulum lacinia arcu eget nulla.{" "}
            </p>
            <div className="flex flex-col space-y-5 items-start">
              <h1 className="font-bold tracking-widest text-2xl">
                COLLECT YOUR BOUNTIES{" "}
              </h1>
              <Button text="Visit Marketplace " />
            </div>
            <img
              className="absolute z-50 right-0 -bottom-32 h-64"
              src={require("../assets/man-sitting.png")}
              alt=""
            />
          </div>
          <div className="absolute-bottom-10 pb-32">
            <div className="flex flex-row-reverse relative space-x-10 items-stretch m-32 mb-0 pt-10  w-auto border p-10 border-black bg-[#FF00E529]/30">
              <img
                className="absolute -left-20 h-72"
                src={require("../assets/man-standing.png")}
                alt=""
              />
              <p className="tracking-wider w-2/3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed
                nisi. Nulla quis sem at
              </p>
              <div className="flex flex-col space-y-5 items-start">
                <h1 className="font-bold tracking-widest text-2xl">
                  MAKE YOUR WAY TO THE LEADER BOARD
                </h1>
                <Button text="Explore Bounties" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal id="connectWallet" title="Getting Started">
        <ConnectWalletForm></ConnectWalletForm>
      </Modal>
    </div>
  );
};
export default Contributors;
