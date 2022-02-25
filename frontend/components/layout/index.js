import styled from "@emotion/styled";
import { Text } from "@mantine/core";
import { useEffect } from "react";
import { getCurrentUser } from "../../utils/auth";
import { useStore } from "../../utils/store";
import Header from "../header";
import Wallet from "../wallet";

const Content = styled.div`
  height: calc(100vh - 50px);

  padding: 10px 20px;
`;

const Layout = ({ children }) => {
  const setUser = useStore((state) => state.setUser);

  useEffect(() => {
    const user = getCurrentUser();
    setUser(user);
  }, []);

  return (
    <div>
      <Header />
      <Content>
        <Text>{children}</Text>
        <Wallet />
      </Content>
    </div>
  );
};

export default Layout;
