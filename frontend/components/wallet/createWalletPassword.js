import { Button, Input } from "@mantine/core";
import { useStore } from "../../utils/store";

const CreateWalletPassword = () => {
  const setActiveTab = useStore((state) => state.setActiveTab);

  return (
    <div>
      <p>암호 생성</p>
      <Input variant="default" placeholder="Password" />
      <Input variant="default" placeholder="Password 확인" />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={() => setActiveTab("PRIVATE_KEY_INFO")}>생성</Button>
      </div>
    </div>
  );
};

export default CreateWalletPassword;
