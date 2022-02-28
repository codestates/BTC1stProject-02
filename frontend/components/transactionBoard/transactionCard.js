import styled from "@emotion/styled";
import { useSpring, animated } from "react-spring";
import TimeAgo from "timeago-react"; // var TimeAgo = require('timeago-react');

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  border: 1px solid grey;
  border-radius: 4px;
  padding: 10px 20px;
`;

const TransactionHash = styled.div`
  display: flex;
  flex-direction: column;
`;

const TransferInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const compressHash = (hash) => {
  if (!hash) return;
  return `${hash.slice(0, 5)}...${hash.slice(-5)}`;
};

const TransactionCard = ({ tx }) => {
  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    reset: true,
    config: { duration: 1000 },
  });

  return (
    <animated.div style={props}>
      <Container>
        <div>TX</div>
        <TransactionHash>
          <span>{compressHash(tx.tx_hash)}</span>
          <small>
            <TimeAgo datetime={tx.createdAt} locale="en_US" />
          </small>
        </TransactionHash>
        <TransferInfo>
          <span>From {compressHash(tx.from)}</span>
          <span>To {compressHash(tx.to)}</span>
        </TransferInfo>
        <div>{parseFloat(tx.value).toFixed(3)} AVAX</div>
      </Container>
    </animated.div>
  );
};

export default TransactionCard;
