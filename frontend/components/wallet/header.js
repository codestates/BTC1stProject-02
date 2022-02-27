import styled from "@emotion/styled";
import { Button, Tooltip } from "@mantine/core";
import { useStore } from "../../utils/store";
import NetworkSelector from "../networkSelector";

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

// const LockButotn = styled.div`
//   cursor: pointer;
//   padding: 5px 8px;
//   border: 1px solid grey;
//   border-radius: 18px;
//   margin-right: 10px;
// `;

// const RemoveWallet = styled.div`
//   cursor: pointer;
//   padding: 5px 8px;
//   border: 1px solid grey;
//   border-radius: 18px;
// `;

const WalletHeader = () => {
  const [setUser, setActiveTab] = useStore((state) => [
    state.setUser,
    state.setActiveTab,
  ]);

  const handleClickLock = () => {
    let user = localStorage.getItem("user");
    let theUser = JSON.parse(user) || {};

    delete theUser["accessToken"];

    localStorage.setItem("user", JSON.stringify(theUser));
    setUser(null);
  };

  return (
    <Container>
      <div style={{ flex: "1.3", paddingRight: "15px" }}>
        <NetworkSelector />
      </div>
      <div
        style={{
          flex: "1",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Tooltip
          label="지갑을 잠근 후 비밀번호를 이용해 다시 잠금해제 할 수 있습니다."
          withArrow
        >
          {/* <LockButotn onClick={handleClickLock}>잠금</LockButotn> */}
          <Button onClick={handleClickLock} variant="outline">
            잠금
          </Button>
        </Tooltip>
        <Tooltip
          label="지갑을 제거합니다. 제거 후에도 개인키로 다시 지갑을 불러올 수 있습니다."
          withArrow
        >
          {/* <RemoveWallet
            onClick={() => {
              localStorage.removeItem("user");
              setUser(null);
              setActiveTab("CREATE_WALLET");
            }}
          >
            지갑 제거
          </RemoveWallet> */}
          <Button
            onClick={() => {
              localStorage.removeItem("user");
              setUser(null);
              setActiveTab("CREATE_WALLET");
            }}
            variant="outline"
          >
            지갑 제거
          </Button>
        </Tooltip>
      </div>
    </Container>
  );
};

export default WalletHeader;
