import { Button, Input, Text } from "@mantine/core";
import { useStore } from "../../utils/store";

const Login = () => {
  const setActiveTab = useStore((state) => state.setActiveTab);
  return (
    <div>
      로그인 페이지
      <Input variant="default" placeholder="Password" />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button>잠금해제</Button>
      </div>
      <small
        style={{ cursor: "pointer" }}
        onClick={() => {
          setActiveTab("RESTORE");
        }}
      >
        개인키로 계정 복구
      </small>
    </div>
  );
};

export default Login;
