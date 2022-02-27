import { Select } from "@mantine/core";
import { useStore } from "../../utils/store";
import { useCookies } from "react-cookie";

const NetworkSelector = () => {
  const [network, setNetwork] = useStore((state) => [
    state.network,
    state.setNetwork,
  ]);
  const [cookies, setCookie, removeCookie] = useCookies();

  return (
    <Select
      style={{ width: "130px" }}
      value={network}
      data={[
        { value: "testnet", label: "Test Network" },
        { value: "localnet", label: "Local Network" },
      ]}
      onChange={(network) => {
        setCookie("network", network);
        setNetwork(network);
      }}
    />
  );
};

export default NetworkSelector;
