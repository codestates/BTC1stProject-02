import { Button, Input } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import axios from "axios";
import { useStore } from "../../utils/store";
import { WalletTitle } from "./style";
import BackButton from "../backButton";

const Restore = () => {
  const [setActiveTab, previousTab] = useStore((state) => [
    state.setActiveTab,
    state.previousTab,
  ]);
  const [pk, setPk] = useInputState("");
  const [password, setPassword] = useInputState("");
  const [password2, setPassword2] = useInputState("");
  const setUser = useStore((state) => state.setUser);

  const requestRestore = async () => {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/restore`,
      {
        pk,
        password,
      },
      {
        withCredentials: true,
      }
    );

    return data;
  };

  const handleRestore = async () => {
    if (password !== password2) {
      alert("입력한 두 개의 패스워드가 일치하지 않습니다.");
      return;
    }

    const data = await requestRestore();
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  return (
    <div>
      <BackButton nextTab={previousTab} />
      <WalletTitle>비밀키로 계정 복구</WalletTitle>
      <div>
        <Input
          style={{ marginBottom: "15px" }}
          variant="default"
          placeholder="Private Key"
          value={pk}
          onChange={setPk}
        />
        <Input
          style={{ marginBottom: "15px" }}
          variant="default"
          type="password"
          placeholder="Password"
          value={password}
          onChange={setPassword}
        />
        <Input
          style={{ marginBottom: "15px" }}
          variant="default"
          type="password"
          placeholder="Password 확인"
          value={password2}
          onChange={setPassword2}
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handleRestore}>복구</Button>
        </div>
      </div>
    </div>
  );
};

export default Restore;
