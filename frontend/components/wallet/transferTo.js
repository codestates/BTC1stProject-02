import { Input } from "@mantine/core";

const TransferTo = () => {
  return (
    <div>
      <p>Send To</p>
      <Input variant="default" placeholder="Address" />
      <p>최근</p>
      <div>
        <div>주소 1</div>
        <div>주소 2</div>
      </div>
    </div>
  );
};

export default TransferTo;
