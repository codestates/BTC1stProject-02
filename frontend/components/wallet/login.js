import { Button, Input } from "@mantine/core";
import { useStore } from "../../utils/store";

const Login = () => {
  const setActiveTab = useStore((state) => state.setActiveTab);
  return (
    <div>
      <p>로그인 페이지</p>
      <div>
        <Input
          style={{ marginBottom: "15px" }}
          variant="default"
          placeholder="Password"
          type="password"
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "15px",
          }}
        >
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
    </div>
  );
};

export default Login;
