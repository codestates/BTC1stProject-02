import styled from "@emotion/styled";
import { Text } from "@mantine/core";
import { useEffect } from "react";
import { getCurrentUser } from "../../utils/auth";
import { useStore } from "../../utils/store";
import Header from "../header";
import Wallet from "../wallet";

const Content = styled.div`
  min-height: calc(100vh - 70px);

  padding: 10px 20px;
`;

const Container = styled.div``;

const Layout = ({ children }) => {
  const setUser = useStore((state) => state.setUser);

  useEffect(() => {
    const user = getCurrentUser();
    setUser(user);
  }, []);

  return (
    <Container>
      <Header />
      <Content>
        <Text>{children}</Text>
        <Wallet />
      </Content>
    </Container>
  );
};

export default Layout;
