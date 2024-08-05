import { Input, Select } from "antd";
import {
  BitqueryNetworksEnum,
  NetworkToBitqueryEnumMappings,
} from "../constants/BitqueryNetworksEnum";
import { IQueryParams } from "../pages/TransactionFlow";
const { Option } = Select;

interface DropdownListSelectProps {
  setQueryParams: React.Dispatch<React.SetStateAction<IQueryParams>>;
}

const DropdownListSelect: React.FC<DropdownListSelectProps> = ({
  setQueryParams,
}) => {
  const handleNetworkChange = (value: string) => {
    setQueryParams((prevParams) => ({ ...prevParams, network: value }));
  };

  const handleCurrencyChange = (value: string) => {
    setQueryParams((prevParams) => ({ ...prevParams, currency: value }));
  };

  const renderNetworkOptions = () => {
    return Array.from(NetworkToBitqueryEnumMappings.entries()).map(
      ([networkDisplayName, networkEnumValue]) => (
        <Option value={networkEnumValue} key={networkEnumValue}>
          {networkDisplayName}
        </Option>
      )
    );
  };

  return (
    <Input.Group compact style={{ width: "fit-content" }}>
      <Select
        onChange={handleNetworkChange}
        defaultValue={BitqueryNetworksEnum.EthMainnet}
        style={{ width: "200px" }}
      >
        {renderNetworkOptions()}
      </Select>
      <Select
        onChange={handleCurrencyChange}
        defaultValue="All"
        style={{ width: "75px" }}
      >
        <Option value="All">All</Option>
      </Select>
    </Input.Group>
  );
};

export default DropdownListSelect;
