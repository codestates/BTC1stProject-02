import styled from "@emotion/styled";
import axios from "axios";
import { useQuery } from "react-query";
import TransactionCard from "./transactionCard";

const Container = styled.div`
  margin: 0 auto;
  width: 700px;
  padding: 10px 20px;
  background-color: ${(props) => props.theme.colors.grey};
  border-radius: 4px;
`;

const TransactionBoard = () => {
  const { data: transactions } = useQuery(
    "getTransactions",
    async () =>
      await axios
        .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/transaction`, {
          withCredentials: true,
        })
        .then(({ data: { tx } }) => tx),
    {
      refetchInterval: 2000,
      refetchIntervalInBackground: false,
      keepPreviousData: true,
      notifyOnChangeProps: "tracked",
    }
  );

  return (
    <Container>
      {transactions?.map((tx, idx) => (
        <TransactionCard tx={tx} key={idx} />
      ))}
    </Container>
  );
};

export default TransactionBoard;
