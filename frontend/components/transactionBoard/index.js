import styled from "@emotion/styled";
import axios from "axios";
import { useQuery, useQueryCache } from "react-query";
import TransactionCard from "./transactionCard";
import { useSpring, animated } from "react-spring";
import { useEffect, useState } from "react";

const Container = styled.div`
  margin: 0 auto;
  width: 700px;
  // border: 1px solid grey;
  padding: 10px 20px;
`;

const getTransactions = () =>
  axios
    .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/transaction`)
    .then(({ data: { tx } }) => tx);

const TransactionBoard = () => {
  const [txs, setTxs] = useState([]);
  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    reset: true,
  });

  const {
    isSuccess,
    data: transactions,
    isLoading,
    isError,
  } = useQuery("getTransactions", () => getTransactions(), {
    refetchInterval: 3000,
    refetchIntervalInBackground: false,
    keepPreviousData: true,
    notifyOnChangeProps: "tracked",
  });

  // useEffect(() => {
  //   if (transactions != txs) {
  //     setTxs(transactions);
  //   }
  // }, [txs, transactions]);

  return (
    <Container>
      {transactions?.map((tx, idx) => (
        <TransactionCard tx={tx} key={idx} />
      ))}
    </Container>
  );
};

export default TransactionBoard;
