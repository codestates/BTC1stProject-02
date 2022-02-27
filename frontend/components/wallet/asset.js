import { Button } from "@mantine/core";
import { useCallback, useEffect } from "react";
import { useStore } from "../../utils/store";

const Asset = () => {
  const [user, updateUser, setActiveTab] = useStore((state) => [
    state.user,
    state.updateUser,
    state.setActiveTab,
  ]);
  const Axios = useStore((state) => state.Axios);
  const [network, sendingAmount] = useStore((state) => [
    state.network,
    state.sendingAmount,
  ]);

  const getUser = useCallback(async () => {
    if (user) {
      const {
        data: { user: resUser },
      } = await Axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/user`, {
        withCredentials: true,
      });
      updateUser("balance", resUser.balance);
    } else {
      console.log("User State가 존재하지 않습니다.");
    }
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser, sendingAmount, network]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ marginBottom: "15px", fontSize: "40px" }}>
          <span>{user?.balance} AVAX</span>
        </div>
        <Button
          style={{ marginBottom: "15px" }}
          onClick={() => setActiveTab("TRANSFER_TO")}
        >
          보내기
        </Button>
        <div>활동내역</div>
      </div>
    </div>
  );
};

export default Asset;
