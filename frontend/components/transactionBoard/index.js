import styled from "@emotion/styled";
import axios from "axios";
import { useQuery } from "react-query";
import TransactionCard from "./transactionCard";

const Container = styled.div`
  margin: 0 auto;
  width: 700px;
  // border: 1px solid grey;
  padding: 10px 20px;
  background-color: ${(props) => props.theme.colors.grey};
  border-radius: 4px;
`;

const getTransactions = () =>
  axios
    .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/transaction`)
    .then(({ data: { tx } }) => tx);

const TransactionBoard = () => {
  const {
    // isSuccess,
    data: transactions,
    // isLoading,
    // isError,
  } = useQuery("getTransactions", () => getTransactions(), {
    refetchInterval: 2000,
    refetchIntervalInBackground: false,
    keepPreviousData: true,
    notifyOnChangeProps: "tracked",
  });

  return (
    <Container>
      {transactions?.map((tx, idx) => (
        <TransactionCard tx={tx} key={idx} />
      ))}
    </Container>
  );
};

export default TransactionBoard;
