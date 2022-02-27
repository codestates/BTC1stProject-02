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
import WalletHeader from "./header";
import styled from "@emotion/styled";

const CModal = styled(Modal)`
  && .mantine-Modal-title {
    font-weight: bold;
    font-size: 18px;
  }
`;

const Wallet = () => {
  const [opened, setOpened] = useStore((state) => [
    state.opened,
    state.setOpened,
  ]);
  const [activeTab, setActiveTab] = useStore((state) => [
    state.activeTab,
    state.setActiveTab,
  ]);

  const user = useStore((state) => state.user);

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
      const storageUser = getCurrentUser();

      if (storageUser?.address && storageUser?.accessToken && !user?.pk) {
        setActiveTab("ASSET");
      } else if (
        storageUser?.address &&
        storageUser?.accessToken === undefined
      ) {
        setActiveTab("LOGIN");
      }
    }
  }, [opened, setActiveTab, user]);

  return (
    <>
      <CModal
        opened={opened}
        onClose={() => {
          setOpened(false);
          setActiveTab("CREATE_WALLET");
        }}
        title="BTC - 02 - AVALANCHE"
      >
        {console.log(activeTab)}
        {user?.accessToken && <WalletHeader />}
        {walletTabs[activeTab]}
      </CModal>
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
