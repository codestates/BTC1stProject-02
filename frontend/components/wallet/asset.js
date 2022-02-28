import { Button, ScrollArea } from "@mantine/core";
import { useQuery } from "react-query";
import { useStore } from "../../utils/store";
import TransactionHistory from "./transactionHistory";

const Asset = () => {
  const [user, setUser, setActiveTab] = useStore((state) => [
    state.user,
    state.setUser,
    state.setActiveTab,
  ]);
  const Axios = useStore((state) => state.Axios);

  useQuery(
    "getUser",
    async () => {
      await Axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/user`, {
        withCredentials: true,
      }).then(({ data: { user: resUser } }) => {
        console.log(resUser);
        if (resUser.balance !== user.balance) {
          setUser(resUser);
        }
        return resUser;
      });
    },
    {
      refetchInterval: 2000,
      refetchIntervalInBackground: false,
      keepPreviousData: true,
      notifyOnChangeProps: "tracked",
    }
  );

  // const getUser = useCallback(async () => {
  //   if (user) {
  //     const {
  //       data: { user: resUser },
  //     } = await Axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/user`, {
  //       withCredentials: true,
  //     });
  //     updateUser("balance", resUser.balance);
  //   } else {
  //     console.log("User State가 존재하지 않습니다.");
  //   }
  // }, []);

  // useEffect(() => {
  //   getUser();
  // }, [getUser, sendingAmount, network]);

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
        <div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "500",
              margin: "15px 20px",
            }}
          >
            활동 내역
          </div>
          <ScrollArea style={{ height: 250 }}>
            <TransactionHistory />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default Asset;
