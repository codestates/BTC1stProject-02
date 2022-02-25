import { Button, Input } from "@mantine/core";
import { useStore } from "../../utils/store";

const Restore = () => {
  const [setActiveTab, previousTab] = useStore((state) => [
    state.setActiveTab,
    state.previousTab,
  ]);

  return (
    <div>
      <small
        style={{ cursor: "pointer" }}
        onClick={() => setActiveTab(previousTab)}
      >
        뒤로
      </small>
      <p>비밀키로 계정 복구</p>
      <div>
        <Input
          style={{ marginBottom: "15px" }}
          variant="default"
          placeholder="Private Key"
        />
        <Input
          style={{ marginBottom: "15px" }}
          variant="default"
          type="password"
          placeholder="Password"
        />
        <Input
          style={{ marginBottom: "15px" }}
          variant="default"
          type="password"
          placeholder="Password 확인"
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button>복구</Button>
        </div>
      </div>
    </div>
  );
};

export default Restore;
