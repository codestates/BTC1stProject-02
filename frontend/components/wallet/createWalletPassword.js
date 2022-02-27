import { Button, Input } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import axios from "axios";
import { useStore } from "../../utils/store";
import { WalletTitle } from "./style";
import BackButton from "../backButton";

const CreateWalletPassword = () => {
  const [setActiveTab, setUser] = useStore((state) => [
    state.setActiveTab,
    state.setUser,
  ]);
  const [password, setPassword] = useInputState("");
  const [password2, setPassword2] = useInputState("");
  const previousTab = useStore((state) => state.previousTab);

  const createUser = async () => {
    const {
      data: { newUser },
    } = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user`,
      {
        password,
      },
      {
        withCredentials: true,
      }
    );

    localStorage.setItem(
      "user",
      JSON.stringify({
        address: newUser.address,
        accessToken: newUser.accessToken,
      })
    );

    return newUser;
  };

  return (
    <div>
      <BackButton nextTab={previousTab} />
      {/* <small
        style={{ cursor: "pointer" }}
        onClick={() => setActiveTab(previousTab)}
      >
        뒤로
      </small> */}
      <WalletTitle>암호 생성</WalletTitle>
      <Input
        style={{ marginBottom: "15px" }}
        variant="default"
        placeholder="Password"
        type="password"
        value={password}
        onChange={setPassword}
      />
      <Input
        style={{ marginBottom: "15px" }}
        variant="default"
        placeholder="Password 확인"
        type="password"
        value={password2}
        onChange={setPassword2}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          disabled={password === "" || password2 === ""}
          onClick={async () => {
            if (password !== password2) {
              alert("패스워드가 다릅니다.");
              return;
            }
            const user = await createUser();
            setUser(user);
            setActiveTab("PRIVATE_KEY_INFO");
          }}
        >
          생성
        </Button>
      </div>
    </div>
  );
};

export default CreateWalletPassword;
