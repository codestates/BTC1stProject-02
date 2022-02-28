import styled from "@emotion/styled";
import { Button, Tooltip } from "@mantine/core";
import { useStore } from "../../utils/store";
import { compressAddress } from "../header";
import NetworkSelector from "../networkSelector";
import { FaRegCopy } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

// const LockButotn = styled.div`
//   cursor: pointer;
//   padding: 5px 8px;
//   border: 1px solid grey;
//   border-radius: 18px;
//   margin-right: 10px;
// `;

// const RemoveWallet = styled.div`
//   cursor: pointer;
//   padding: 5px 8px;
//   border: 1px solid grey;
//   border-radius: 18px;
// `;

const CopyAddress = styled.div`
  width: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px;

  margin-top: 10px;
  padding: 5px;
  cursor: pointer;
  border-radius: 4px;

  &&:hover {
    background-color: rgb(242, 243, 244);
  }

  &&:active {
    background-color: rgb(217, 215, 218);
    transform: translate(2px, 2px);
    transition: transform 100ms ease-in-out;
  }
`;

const WalletAddress = () => {
  const user = useStore((state) => state.user);
  const doCopy = (text) => {
    // 흐음 1.
    if (navigator.clipboard) {
      // (IE는 사용 못하고, 크롬은 66버전 이상일때 사용 가능합니다.)
      navigator.clipboard
        .writeText(text)
        .then(() => {
          console.log(text);
          // alert("클립보드에 복사되었습니다.");
        })
        .catch(() => {
          // alert("복사를 다시 시도해주세요.");
        });
    } else {
      // 흐름 2.
      if (!document.queryCommandSupported("copy")) {
        return alert("복사하기가 지원되지 않는 브라우저입니다.");
      }

      // 흐름 3.
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.top = 0;
      textarea.style.left = 0;
      textarea.style.position = "fixed";

      // 흐름 4.
      document.body.appendChild(textarea);
      // focus() -> 사파리 브라우저 서포팅
      textarea.focus();
      // select() -> 사용자가 입력한 내용을 영역을 설정할 때 필요
      textarea.select();
      // 흐름 5.
      document.execCommand("copy");
      // 흐름 6.
      document.body.removeChild(textarea);
      alert("클립보드에 복사되었습니다.");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <CopyAddress onClick={() => doCopy(user.address)}>
        <span style={{ fontSize: "20px" }}>지갑 주소</span>
        <div style={{ color: "grey" }}>
          <span style={{ marginRight: "10px", color: "grey" }}>
            {compressAddress(user.address)}
          </span>
          <FaRegCopy style={{ transform: "translateY(1.5px)" }} />
        </div>
      </CopyAddress>
    </div>
  );
};

const WalletHeader = () => {
  const [setUser, setActiveTab] = useStore((state) => [
    state.setUser,
    state.setActiveTab,
  ]);

  const handleClickLock = () => {
    let user = localStorage.getItem("user");
    let theUser = JSON.parse(user) || {};

    delete theUser["accessToken"];

    localStorage.setItem("user", JSON.stringify(theUser));
    setUser(null);
  };

  return (
    <>
      <WalletAddress />
      <Container>
        <div style={{ flex: "1.3", paddingRight: "15px" }}>
          <NetworkSelector />
        </div>
        <div
          style={{
            flex: "1",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Tooltip
            label="지갑을 잠근 후 비밀번호를 이용해 다시 잠금해제 할 수 있습니다."
            withArrow
          >
            {/* <LockButotn onClick={handleClickLock}>잠금</LockButotn> */}
            <Button onClick={handleClickLock} variant="outline">
              잠금
            </Button>
          </Tooltip>
          <Tooltip
            label="지갑을 제거합니다. 제거 후에도 개인키로 다시 지갑을 불러올 수 있습니다."
            withArrow
          >
            {/* <RemoveWallet
            onClick={() => {
              localStorage.removeItem("user");
              setUser(null);
              setActiveTab("CREATE_WALLET");
            }}
          >
            지갑 제거
          </RemoveWallet> */}
            <Button
              onClick={() => {
                localStorage.removeItem("user");
                setUser(null);
                setActiveTab("CREATE_WALLET");
              }}
              variant="outline"
            >
              지갑 제거
            </Button>
          </Tooltip>
        </div>
      </Container>
    </>
  );
};

export default WalletHeader;
