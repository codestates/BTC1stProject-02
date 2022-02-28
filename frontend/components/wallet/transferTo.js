import { Button, Input } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { useStore } from "../../utils/store";
import BackButton from "../backButton";
import { WalletTitle } from "./style";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { useEffect, useState } from "react";
import { compressAddress } from "../header";
import styled from "@emotion/styled";

const TransferTo = () => {
  const [toAddress, setToAddress] = useInputState("");
  const [web3, setReceiverAddress] = useStore((state) => [
    state.web3,
    state.setReceiverAddress,
  ]);
  const [setActiveTab] = useStore((state) => [state.setActiveTab]);
  const [user, Axios] = useStore((state) => [state.user, state.Axios]);
  const [latestReceivers, setLatestReceivers] = useState([]);

  const handleClickNext = () => {
    const valid = web3.utils.isAddress(toAddress);
    if (valid) {
      setReceiverAddress(toAddress);
      setActiveTab("TRANSFER_AMOUNT");
    } else {
      alert("주소가 유효하지 않습니다.");
      return;
    }
  };

  const getMyFromAddress = async () => {
    const {
      data: { latestReceivers },
    } = await Axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/transaction/latest-receivers`,
      {
        withCredentials: true,
      }
    );

    setLatestReceivers(latestReceivers);
  };

  useEffect(() => {
    getMyFromAddress();
  }, [user]);

  return (
    <div>
      <BackButton nextTab="ASSET" />

      <WalletTitle>Send To</WalletTitle>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Input
          style={{ marginBottom: "15px", width: "100%" }}
          value={toAddress}
          onChange={setToAddress}
          variant="default"
          placeholder="Address"
        />
        <div
          style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <Button onClick={handleClickNext}>다음</Button>
        </div>

        <div
          style={{
            width: "100%",
            fontSize: "20px",
            fontWeight: "500",
            margin: "15px 20px",
          }}
        >
          최근
        </div>
        <div style={{ width: "440px" }}>
          {latestReceivers?.map((receiver, idx) => (
            <LatestReceiverCard receiver={receiver} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ReceiverCardContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  cursor: pointer;

  &&:hover {
    &&:hover {
      background-color: rgb(242, 243, 244);
    }
  }
`;

const LatestReceiverCard = ({ receiver }) => {
  const web3 = useStore((state) => state.web3);
  const [setReceiverAddress, setActiveTab] = useStore((state) => [
    state.setReceiverAddress,
    state.setActiveTab,
  ]);

  const handleClickNext = () => {
    const valid = web3.utils.isAddress(receiver);
    if (valid) {
      setReceiverAddress(receiver);
      setActiveTab("TRANSFER_AMOUNT");
    } else {
      alert("주소가 유효하지 않습니다.");
      return;
    }
  };

  return (
    <ReceiverCardContainer
      onClick={handleClickNext}
      style={{ display: "flex", alignItems: "center" }}
    >
      <Jazzicon diameter={40} seed={jsNumberForAddress(receiver)} />
      <div style={{ marginLeft: "20px" }}>{compressAddress(receiver)}</div>
    </ReceiverCardContainer>
  );
};

export default TransferTo;
