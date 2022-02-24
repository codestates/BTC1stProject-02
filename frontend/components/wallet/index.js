import { Modal } from "@mantine/core";
import { useStore } from "../../utils/store";
import Asset from "./asset";
import Login from "./login";
import Restore from "./restore";
import Sign from "./sign";
import TransferAmount from "./transferAmount";
import TransferTo from "./transferTo";

const Wallet = () => {
  const [opened, setOpened] = useStore((state) => [
    state.opened,
    state.setOpened,
  ]);
  const [activeTab, setActiveTab] = useStore((state) => [
    state.activeTab,
    state.setActiveTab,
  ]);

  const obj = {
    LOGIN: <Login />,
    RESTORE: <Restore />,
    ASSET: <Asset />,
    TRANSFER_TO: <TransferTo />,
    TRANSFER_AMOUNT: <TransferAmount />,
    SIGN: <Sign />,
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {
        setOpened(false);
        setActiveTab("TRANSFER_AMOUNT");
      }}
      title="BTC - 02 - AVALANCHE"
    >
      {obj[activeTab]}
    </Modal>
  );
};

export default Wallet;

// (User가 null || User.locked === true) => login.js
// (User.locked === false) => asset.js
