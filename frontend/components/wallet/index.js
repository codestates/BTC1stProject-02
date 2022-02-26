import { Modal } from "@mantine/core";
import { useEffect } from "react";
import { getCurrentUser } from "../../utils/auth";
import { useStore } from "../../utils/store";
import Asset from "./asset";
import CreateWallet from "./createWallet";
import CreateWalletPassword from "./createWalletPassword";
import Login from "./login";
import PrivateKeyInfo from "./privateKeyInfo";
import Restore from "./restore";
import Sign from "./sign";
import TransferAmount from "./transferAmount";
import TransferTo from "./transferTo";
import { ToastContainer } from "react-toastify";

const Wallet = () => {
  const [opened, setOpened] = useStore((state) => [
    state.opened,
    state.setOpened,
  ]);
  const [activeTab, setActiveTab] = useStore((state) => [
    state.activeTab,
    state.setActiveTab,
  ]);

  const walletTabs = {
    LOGIN: <Login />,
    RESTORE: <Restore />,
    ASSET: <Asset />,
    TRANSFER_TO: <TransferTo />,
    TRANSFER_AMOUNT: <TransferAmount />,
    SIGN: <Sign />,
    CREATE_WALLET: <CreateWallet />,
    CREATE_WALLET_PASSWORD: <CreateWalletPassword />,
    PRIVATE_KEY_INFO: <PrivateKeyInfo />,
  };

  useEffect(() => {
    if (opened) {
      const user = getCurrentUser();

      if (user?.address && user?.accessToken) {
        setActiveTab("ASSET");
      }
    }
  }, [opened, setActiveTab]);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false);
          setActiveTab("CREATE_WALLET");
        }}
        title="BTC - 02 - AVALANCHE"
      >
        {walletTabs[activeTab]}
      </Modal>
      <ToastContainer
        position="top-right"
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Wallet;

// (User가 null || User.locked === true) => login.js
// (User.locked === false) => asset.js
