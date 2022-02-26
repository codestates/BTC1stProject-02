import { Button, Input } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { useStore } from "../../utils/store";

const TransferTo = () => {
  const [toAddress, setToAddress] = useInputState("");
  const [web3, receiverAddress, setReceiverAddress] = useStore((state) => [
    state.web3,
    state.receiverAddress,
    state.setReceiverAddress,
  ]);
  const [setActiveTab, previousTab] = useStore((state) => [
    state.setActiveTab,
    state.previousTab,
  ]);

  const handleClickNext = () => {
    const valid = web3.utils.isAddress(toAddress);
    if (valid) {
      setReceiverAddress(toAddress);
      setActiveTab("TRANSFER_AMOUNT");
    } else {
      alert("주소가 유효하지 않습니다.");
      return;
    }
  };

  return (
    <div>
      <small
        style={{ cursor: "pointer" }}
        onClick={() => setActiveTab("ASSET")}
      >
        뒤로
      </small>
      <p>Send To</p>

      <div>
        <Input
          style={{ marginBottom: "15px" }}
          value={toAddress}
          onChange={setToAddress}
          variant="default"
          placeholder="Address"
        />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={handleClickNext}>다음</Button>
        </div>
        <p>최근</p>
        <div>
          <div>주소 1</div>
          <div>주소 2</div>
        </div>
      </div>
    </div>
  );
};

export default TransferTo;
