import styled from "@emotion/styled";
import { useStore } from "../../utils/store";
import {
  BsFillArrowDownLeftCircleFill,
  BsFillArrowUpRightCircleFill,
} from "react-icons/bs";
import { compressAddress } from "../header";

const CardContainer = styled.div`
  display: flex;
  alignitems: center;
  // width: 400px;
  justify-content: space-between;
  padding: 15px 17px;
  cursor: pointer;

  &&:hover {
    background-color: rgb(242, 243, 244);
  }
`;

const TransactionCard = ({ tx }) => {
  const user = useStore((state) => state.user);
  return (
    <CardContainer>
      <span
        style={{
          flex: "1",
          fontSize: "35px",
          display: "flex",
          alignItems: "center",
          marginRight: "10px",
        }}
      >
        {tx.from === user.address ? (
          <BsFillArrowUpRightCircleFill />
        ) : (
          <BsFillArrowDownLeftCircleFill />
        )}
      </span>
      <div
        style={{
          flex: "6",
          // display: "flex",
          // flexDirection: "column",
          // alignItems: "center",
        }}
      >
        <div style={{ fontSize: "18px", fontWeight: "500" }}>
          {tx.from === user.address ? "보내기" : "받기"}
        </div>
        <div>
          <span
            style={{ color: "#219e37", fontWeight: "500", fontSize: "14px" }}
          >
            {new Date(tx.createdAt)
              .toDateString()
              .split(" ")
              .slice(1)
              .join(" ")}
          </span>
          <span
            style={{
              color: "rgb(106, 115, 125)",
              fontWeight: "500",
              fontSize: "14px",
              marginLeft: "8px",
            }}
          >
            {tx.from === user.address
              ? `수신: ${compressAddress(tx.to)}`
              : `발신: ${compressAddress(tx.from)}`}
          </span>
        </div>
      </div>
      <div
        style={{
          flex: "2",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          fontSize: "18px",
          fontWeight: "500",
        }}
      >
        {tx.from === user.address ? -tx.value : tx.value} AVAX
      </div>
    </CardContainer>
  );
};

const TransactionHistory = () => {
  const user = useStore((state) => state.user);

  return (
    <div style={{ width: "440px" }}>
      {user?.myTx?.map((tx, idx) => (
        <TransactionCard key={idx} tx={tx} />
      ))}
    </div>
  );
};

export default TransactionHistory;
