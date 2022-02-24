import { Alert, Button, Text } from "@mantine/core";
import { FiAlertCircle } from "react-icons/fi";

const PrivateKeyInfo = () => {
  return (
    <div>
      <p>PK 정보</p>
      <Text>pk</Text>
      <Alert icon={<FiAlertCircle size={16} />} title="주의!" color="red">
        <p style={{ display: "block", lineHeight: "1.8", fontSize: "16px" }}>
          이 키를 잃어버리거나 타인에게 노출해서는 안됩니다.
        </p>
      </Alert>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button>확인</Button>
      </div>
    </div>
  );
};

export default PrivateKeyInfo;
