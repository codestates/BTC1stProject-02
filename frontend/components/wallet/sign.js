import { Button } from "@mantine/core";
import { useStore } from "../../utils/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WalletTitle } from "./style";
import BackButton from "../backButton";

const Sign = () => {
  const [setOpened, Axios] = useStore((state) => [
    state.setOpened,
    state.Axios,
  ]);
  const [sendingAmount, receiverAddress] = useStore((state) => [
    state.sendingAmount,
    state.receiverAddress,
  ]);
  const [setSendingAmount, setReceiverAddress] = useStore((state) => [
    state.setSendingAmount,
    state.setReceiverAddress,
  ]);

  const setActiveTab = useStore((state) => state.setActiveTab);

  const transfer = async () => {
    const response = await Axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/transfer`,
      {
        toAddress: receiverAddress,
        amount: sendingAmount,
      }
    );

    return response;
  };

  const handleClickSign = () => {
    const callTransfer = transfer();
    toast
      .promise(callTransfer, {
        pending: "트랜잭션 처리 중 🙏",
        success: "거래 성공 👌",
        error: "거래 실패 🤯",
      })
      .then(() => {
        setSendingAmount(0);
        setReceiverAddress("");
      });

    setActiveTab("ASSET");
  };

  return (
    <div>
      <BackButton nextTab="TRANSFER_AMOUNT" />

      <WalletTitle>Sign 페이지</WalletTitle>
      <div>
        <div style={{ marginBottom: "15px" }}>암호화폐를 보내시겠습니까?</div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Button onClick={() => setOpened(false)} color="gray">
            거부
          </Button>
          <Button onClick={() => handleClickSign()}>확인</Button>
        </div>
      </div>
    </div>
  );
};

export default Sign;
