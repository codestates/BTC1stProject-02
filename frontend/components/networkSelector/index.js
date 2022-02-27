import { Select } from "@mantine/core";
import { useStore } from "../../utils/store";

const NetworkSelector = () => {
  const [network, setNetwork] = useStore((state) => [
    state.network,
    state.setNetwork,
  ]);

  return (
    <Select
      value={network}
      data={[
        { value: "testnet", label: "Test Network" },
        { value: "localnet", label: "Local Network" },
      ]}
      onChange={setNetwork}
    />
  );
};

export default NetworkSelector;
