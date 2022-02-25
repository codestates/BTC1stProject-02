import styled from "@emotion/styled";
import { ActionIcon } from "@mantine/core";
import { AiOutlineWallet } from "react-icons/ai";
import { useStore } from "../../utils/store";

const Container = styled.div`
  height: 50px;
  padding: 10px 20px;

  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Badge = styled.div`
  margin-right: 10px;
  border: 1px solid rgba(231, 245, 255, 1);
  border-radius: 4px;
  padding: 2px 4px;

  font-size: 12px;
  font-weight: bold;

  color: #228be6;
  background-color: rgba(231, 245, 255, 1);
`;

const compressAddress = (address) => {
  return `${address?.slice(0, 4)}....${address?.slice(-4)}`;
};

const Header = () => {
  const [user, setOpened] = useStore((state) => [state.user, state.setOpened]);

  return (
    <Container>
      <div>BTC - 02 - AVALANCHE</div>
      <div style={{ display: "flex", alignItems: "center" }}>
        {user?.address && user?.accessToken && (
          <Badge>{compressAddress(user.address)}</Badge>
        )}
        <ActionIcon
          onClick={() => {
            setOpened(true);
          }}
        >
          <AiOutlineWallet
            onClick={() => setOpened(true)}
            style={{ width: 32, height: 32 }}
          />
        </ActionIcon>
      </div>
    </Container>
  );
};

export default Header;
