import { Button, Input } from "@mantine/core";
import { useStore } from "../../utils/store";

const Restore = () => {
  const setActiveTab = useStore((state) => state.setActiveTab);

  return (
    <div>
      <small
        style={{ cursor: "pointer" }}
        onClick={() => setActiveTab("LOGIN")}
      >
        뒤로
      </small>
      <p>비밀키로 계정 복구</p>
      <Input variant="default" placeholder="Private Key" />
      <Input variant="default" type="password" placeholder="Password" />
      <Input variant="default" type="password" placeholder="Password 확인" />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button>복구</Button>
      </div>
    </div>
  );
};

export default Restore;
