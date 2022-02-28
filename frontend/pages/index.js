import styled from "@emotion/styled";
import TransactionBoard from "../components/transactionBoard";
import { BsSearch } from "react-icons/bs";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled.div`
  min-width: 700px;
  margin: 70px;
  display: flex;
  justify-content: center !important;

  width: 516px;
  height: initial;
  position: relative;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
`;

const Input = styled.input`
  font-size: 20px;
  height: 48px;
  padding: 8px 44px 8px 24px;
  display: block;
  box-sizing: border-box;
  width: 100%;
  border-radius: 100px;
  border: none;
  color: rgb(255, 255, 255);
  font-family: Inter;
  background: rgba(58, 58, 60, 0.5);
  outline: none;
`;

const SearchButton = styled.button`
  position: absolute;
  right: 0px;
  min-width: 48px;
  width: 48px;
  height: 48px;
  min-height: 48px;
  padding: 10px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  border-radius: 100px;
  background-color: rgb(241, 89, 90);

  cursor: pointer;
  max-height: 40px;
  color: rgb(185, 39, 40);
  border: none;
  font-weight: 600;

  font-size: 14px;
  margin: 0px;

  outline: none;

  color: white;

  && svg {
    width: 20px;
    height: 20px;
  }
`;

export default function Home() {
  return (
    <Container>
      <InputContainer>
        <Input placeholder="Search by Address / Txn Hash / Block / Token" />
        <SearchButton>
          <BsSearch />
        </SearchButton>
      </InputContainer>
      <TransactionBoard></TransactionBoard>
    </Container>
  );
}
