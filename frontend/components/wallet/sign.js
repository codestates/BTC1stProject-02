import { Button } from "@mantine/core";
import { WalletContainer, WalletContent, WalletTitle } from "./style";

const Sign = () => {
  return (
    <div>
      <p>Sign 페이지</p>
      <div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Button color="gray">거부</Button>
          <Button>확인</Button>
        </div>
      </div>
    </div>
  );
};

export default Sign;
