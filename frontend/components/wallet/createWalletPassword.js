import { Button, Input } from "@mantine/core";
import axios from "axios";
import { useStore } from "../../utils/store";

const createUser = async () => {
  const {
    data: { newUser },
  } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/user`);

  return newUser;
};

const CreateWalletPassword = () => {
  const [setActiveTab, setUser] = useStore((state) => [
    state.setActiveTab,
    state.setUser,
  ]);

  return (
    <div>
      <p>암호 생성</p>
      <Input
        style={{ marginBottom: "15px" }}
        variant="default"
        placeholder="Password"
        type="password"
      />
      <Input
        style={{ marginBottom: "15px" }}
        variant="default"
        placeholder="Password 확인"
        type="password"
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={async () => {
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
