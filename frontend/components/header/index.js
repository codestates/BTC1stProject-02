import styled from "@emotion/styled";
import { ActionIcon } from "@mantine/core";
import { AiOutlineWallet } from "react-icons/ai";
import { useStore } from "../../utils/store";
import NetworkSelector from "../networkSelector";

const Container = styled.div`
  height: 70px;
  padding: 10px 20px;

  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Badge = styled.div`
  margin-right: 15px;
  border: 1px solid rgba(231, 245, 255, 1);
  border-radius: 4px;
  padding: 2px 4px;

  font-size: 16px;
  font-weight: bold;

  color: #228be6;
  background-color: rgba(231, 245, 255, 1);
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  font-size: 28px;
  // font-weight: bold;
  margin-left: 15px;
  letter-spacing: 3px;
  font-weight: 500;
`;

const CActionIcon = styled(ActionIcon)`
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.theme.colors.grey};
  color: white;

  &: hover {
    background-color: ${(props) => props.theme.colors.lightGrey};
  }
`;

const RightHeader = styled.div`
  && .mantine-Select-root {
    margin-right: 20px;
  }
`;

const compressAddress = (address) => {
  return `${address?.slice(0, 4)}....${address?.slice(-4)}`;
};

const Header = () => {
  const [user, setOpened] = useStore((state) => [state.user, state.setOpened]);

  return (
    <Container>
      <div style={{ display: "flex", alignItems: "center" }}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M32 16C32 24.8365 24.8365 32 16 32C7.16345 32 0 24.8365 0 16C0 7.16345 7.16345 0 16 0C24.8365 0 32 7.16345 32 16ZM11.4661 22.3669H8.36095C7.70849 22.3669 7.38616 22.3669 7.18961 22.2411C6.97738 22.1035 6.84765 21.8755 6.83193 21.624C6.82015 21.3921 6.98129 21.1091 7.30362 20.5431L14.9706 7.02892C15.2968 6.45505 15.4619 6.16814 15.6703 6.062C15.8943 5.94804 16.1616 5.94804 16.3856 6.062C16.594 6.16814 16.759 6.45505 17.0853 7.02892L18.6614 9.78033L18.6695 9.79437C19.0218 10.41 19.2005 10.7222 19.2785 11.0499C19.365 11.4076 19.365 11.7849 19.2785 12.1426C19.1999 12.4728 19.023 12.7872 18.6653 13.4122L14.6381 20.5313L14.6277 20.5495C14.2729 21.1702 14.0932 21.4848 13.8441 21.7223C13.5729 21.9817 13.2467 22.1703 12.889 22.2765C12.5627 22.3669 12.1972 22.3669 11.4661 22.3669ZM19.3076 22.3672H23.7571C24.4135 22.3672 24.7436 22.3672 24.9402 22.2375C25.1524 22.0999 25.286 21.868 25.2979 21.6165C25.3092 21.3922 25.1516 21.1201 24.8426 20.5871C24.832 20.5689 24.8213 20.5504 24.8104 20.5316L22.5818 16.719L22.5564 16.6761C22.2433 16.1464 22.0851 15.879 21.8822 15.7757C21.6581 15.6616 21.3948 15.6616 21.1707 15.7757C20.9663 15.8817 20.8012 16.1608 20.475 16.7229L18.2542 20.5355L18.2466 20.5487C17.9215 21.1099 17.7591 21.3903 17.7708 21.6204C17.7865 21.872 17.9162 22.1039 18.1285 22.2414C18.3211 22.3672 18.6512 22.3672 19.3076 22.3672Z"
            fill="#ffffff"
          ></path>
        </svg>
        <Title>AVALANCHE</Title>
      </div>
      <RightHeader style={{ display: "flex", alignItems: "center" }}>
        <NetworkSelector />
        {user?.address && user?.accessToken && (
          <Badge>{compressAddress(user.address)}</Badge>
        )}
        <CActionIcon
          onClick={() => {
            setOpened(true);
          }}
        >
          <AiOutlineWallet
            onClick={() => setOpened(true)}
            style={{ width: 40, height: 40 }}
          />
        </CActionIcon>
      </RightHeader>
    </Container>
  );
};

export default Header;
