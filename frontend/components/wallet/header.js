import styled from "@emotion/styled";
import { Tooltip } from "@mantine/core";
import { useStore } from "../../utils/store";

const Container = styled.div`
  display: flex;
  justify-content: space-around;
`;

const LockButotn = styled.div`
  cursor: pointer;
`;

const RemoveWallet = styled.div`
  cursor: pointer;
`;

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
      <div style={{ flex: "2" }}>네트워크</div>
      <div
        style={{ flex: "1", display: "flex", justifyContent: "space-between" }}
      >
        <Tooltip
          label="지갑을 잠근 후 비밀번호를 이용해 다시 잠금해제 할 수 있습니다."
          withArrow
        >
          <LockButotn onClick={handleClickLock}>잠금</LockButotn>
        </Tooltip>
        <Tooltip
          label="지갑을 제거합니다. 제거 후에도 개인키로 다시 지갑을 불러올 수 있습니다."
          withArrow
        >
          <RemoveWallet
            onClick={() => {
              localStorage.removeItem("user");
              setUser(null);
              setActiveTab("CREATE_WALLET");
            }}
          >
            지갑 제거
          </RemoveWallet>
        </Tooltip>
      </div>
    </Container>
  );
};

export default WalletHeader;
