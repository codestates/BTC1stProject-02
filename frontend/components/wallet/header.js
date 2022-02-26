import styled from "@emotion/styled";
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
  const setUser = useStore((state) => state.setUser);

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
        <LockButotn onClick={handleClickLock}>잠금</LockButotn>
        <RemoveWallet>지갑 제거</RemoveWallet>
      </div>
    </Container>
  );
};

export default WalletHeader;
