import { Button } from "@mantine/core";

const Sign = () => {
  return (
    <div>
      <p>Sign 페이지</p>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Button color="gray">거부</Button>
        <Button>확인</Button>
      </div>
    </div>
  );
};

export default Sign;
