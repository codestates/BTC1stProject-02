import { Button } from "@mantine/core";
import { useStore } from "../../utils/store";

const Sign = () => {
  const setOpened = useStore((state) => state.setOpened);

  return (
    <div>
      <p>Sign 페이지</p>
      <div>
        <div style={{ marginBottom: "15px" }}>암호화폐를 보내시겠습니까?</div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Button onClick={() => setOpened(false)} color="gray">
            거부
          </Button>
          <Button>확인</Button>
        </div>
      </div>
    </div>
  );
};

export default Sign;
