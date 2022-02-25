import styled from "@emotion/styled";
import { Button, Input } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { useStore } from "../../utils/store";

const AssetContainer = styled.div`
  border: 1px solid grey;
  border-radius: 4px;
`;

const TransferAmount = () => {
  const [amount, setAmount] = useInputState("");
  const [user, setActiveTab, setSendingAmount] = useStore((state) => [
    state.user,
    state.setActiveTab,
    state.setSendingAmount,
  ]);

  return (
    <div>
      <p>보내기</p>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <div>자산: </div>
          <AssetContainer style={{ width: "90%", padding: "2px 13px" }}>
            <div>AVAX</div>
            <div>
              <small>잔액: {user?.balance} AVAX</small>
            </div>
          </AssetContainer>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <span>금액: </span>
          <Input
            style={{ width: "90%" }}
            variant="default"
            placeholder="AVAX"
            value={amount}
            onChange={setAmount}
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
