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

const Header = () => {
  const [opened, setOpened] = useStore((state) => [
    state.opened,
    state.setOpened,
  ]);

  return (
    <Container>
      <div>BTC - 02 - AVALANCHE</div>
      <ActionIcon
        onClick={() => {
          setOpened(true);
          console.log(opened);
        }}
      >
        <AiOutlineWallet
          onClick={() => setOpened(true)}
          style={{ width: 32, height: 32 }}
        />
      </ActionIcon>
    </Container>
  );
};

export default Header;
