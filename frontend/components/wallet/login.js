import { Button, Input } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import axios from "axios";
import { getCurrentUser } from "../../utils/auth";
import { useStore } from "../../utils/store";

const Login = () => {
  const setActiveTab = useStore((state) => state.setActiveTab);
  const [password, setPassword] = useInputState("");
  const [user, setUser] = useStore((state) => [state.user, state.setUser]);

  const handleUnlock = async () => {
    const user = getCurrentUser();
    const { data: unlockedUser } = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/login`,
      {
        password,
        address: user.address,
      }
    );

    localStorage.setItem("user", JSON.stringify(unlockedUser));
    setUser(unlockedUser);
    setActiveTab("ASSET");
  };

  return (
    <div>
      <p>로그인 페이지</p>
      <div>
        <Input
          style={{ marginBottom: "15px" }}
          variant="default"
          placeholder="Password"
          type="password"
          value={password}
          onChange={setPassword}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "15px",
          }}
        >
          <Button onClick={handleUnlock}>잠금해제</Button>
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
