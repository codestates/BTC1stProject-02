import styled from "@emotion/styled";
import { RiDownloadFill } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import { Button } from "@mantine/core";
import { useStore } from "../../utils/store";
import { WalletContainer, WalletContent, WalletTitle } from "./style";

const WrapperContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  border: 1px solid grey;
  border-radius: 4px;

  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
`;

const CreateWallet = () => {
  const setActiveTab = useStore((state) => state.setActiveTab);
  return (
    <div>
      <p>월렛 생성</p>

      <WrapperContainer>
        <Wrapper
          style={{ marginBottom: "20px" }}
          onClick={() => setActiveTab("RESTORE")}
        >
          <RiDownloadFill style={{ width: 45, height: 45, color: "grey" }} />
          <p>개인키로 계정을 가져옵니다.</p>
          <Button>지갑 가져오기</Button>
        </Wrapper>

        <Wrapper onClick={() => setActiveTab("CREATE_WALLET_PASSWORD")}>
          <AiOutlinePlus style={{ width: 45, height: 45, color: "grey" }} />
          <p>지갑을 새로 만듭니다.</p>
          <Button>지갑 생성</Button>
        </Wrapper>
      </WrapperContainer>
    </div>
  );
};

export default CreateWallet;
