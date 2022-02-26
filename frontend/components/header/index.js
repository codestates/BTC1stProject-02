import styled from "@emotion/styled";
import { ActionIcon } from "@mantine/core";
import { AiOutlineWallet } from "react-icons/ai";
import { useStore } from "../../utils/store";

const Container = styled.div`
  height: 70px;
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

const Title = styled.h1`
  display: flex;
  align-items: center;
  font-size: 28px;
  font-weight: bold;
`;

const compressAddress = (address) => {
  return `${address?.slice(0, 4)}....${address?.slice(-4)}`;
};

const Header = () => {
  const [user, setOpened] = useStore((state) => [state.user, state.setOpened]);

  return (
    <Container>
      <Title>BTC - 02 - AVALANCHE</Title>
      <div style={{ display: "flex", alignItems: "center" }}>
        {user?.address && user?.accessToken && (
          <Badge>{compressAddress(user.address)}</Badge>
        )}
        <ActionIcon
          style={{ width: 40, height: 40 }}
          onClick={() => {
            setOpened(true);
          }}
        >
          <AiOutlineWallet
            onClick={() => setOpened(true)}
            style={{ width: 40, height: 40 }}
          />
        </ActionIcon>
      </div>
    </Container>
  );
};

export default Header;
