import styled from "@emotion/styled";
import { ActionIcon } from "@mantine/core";
import { AiOutlineWallet } from "react-icons/ai";

const Container = styled.div`
  height: 50px;
  padding: 10px 20px;

  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Header = () => {
  return (
    <Container>
      <div>BTC - AVALANCHE</div>
      <ActionIcon>
        <AiOutlineWallet style={{ width: 32, height: 32 }} />
      </ActionIcon>
    </Container>
  );
};

export default Header;
