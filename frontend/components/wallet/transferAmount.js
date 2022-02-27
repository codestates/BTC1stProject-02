import styled from "@emotion/styled";
import { Button, Input } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import Image from "next/image";
import { useStore } from "../../utils/store";
import BackButton from "../backButton";
import { WalletTitle } from "./style";

const AssetContainer = styled.div`
  border: 1px solid grey;
  border-radius: 4px;
  display: flex;
  padding: 2px 13px;
`;

const CInput = styled(Input)`
  && input {
    font-size: 18px;
  }
`;

const TransferAmount = () => {
  const [amount, setAmount] = useInputState("");
  const [user, setActiveTab, setSendingAmount] = useStore((state) => [
    state.user,
    state.setActiveTab,
    state.setSendingAmount,
  ]);
  const previousTab = useStore((state) => state.previousTab);

  return (
    <div>
      <BackButton nextTab="TRANSFER_TO" />
      <WalletTitle>보내기</WalletTitle>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <div style={{ fontSize: "22px" }}>자산: </div>
          <AssetContainer style={{ width: "85%" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "10px",
              }}
            >
              <Image
                src="/images/avax-logo.png"
                width={45}
                height={45}
                alt=""
              />
            </div>
            <div>
              <div style={{ fontSize: "22px" }}>AVAX</div>
              <div style={{ fontSize: "18px" }}>
                <div>잔액: {user?.balance} AVAX</div>
              </div>
            </div>
          </AssetContainer>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
            fontSize: "18px",
          }}
        >
          <span style={{ fontSize: "22px" }}>금액: </span>
          <CInput
            style={{ width: "85%" }}
            variant="default"
            placeholder="AVAX"
            value={amount}
            onChange={setAmount}
            size="md"
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Button color="gray">취소</Button>
          <Button
            onClick={() => {
              if (amount <= user.balance) {
                setSendingAmount(amount);
                setActiveTab("SIGN");
              } else {
                alert("잔액보다 더 많은 금액은 송금할 수 없습니다.");
                return;
              }
            }}
          >
            다음
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransferAmount;
