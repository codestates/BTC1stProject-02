import styled from "@emotion/styled";
import { Button, Input } from "@mantine/core";
import { useStore } from "../../utils/store";

const AssetContainer = styled.div`
  border: 1px solid grey;
  border-radius: 4px;
`;

const TransferAmount = () => {
  const setActiveTab = useStore((state) => state.setActiveTab);

  return (
    <div>
      <p>보내기</p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>자산: </div>
        <AssetContainer style={{ width: "90%", padding: "2px 13px" }}>
          <div>AVAX</div>
          <div>
            <small>잔액: 100 AVAX</small>
          </div>
        </AssetContainer>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>금액: </span>
        <Input style={{ width: "90%" }} variant="default" placeholder="AVAX" />
      </div>

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Button color="gray">취소</Button>
        <Button onClick={() => setActiveTab("SIGN")}>다음</Button>
      </div>
    </div>
  );
};

export default TransferAmount;
