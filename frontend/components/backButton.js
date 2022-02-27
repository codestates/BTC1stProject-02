import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useStore } from "../utils/store";
import { BackButtonContainer } from "./wallet/style";

const BackButton = ({ nextTab }) => {
  const setActiveTab = useStore((state) => state.setActiveTab);

  return (
    <BackButtonContainer onClick={() => setActiveTab(nextTab)}>
      <MdOutlineArrowBackIosNew />
      <span>뒤로</span>
    </BackButtonContainer>
  );
};

export default BackButton;
