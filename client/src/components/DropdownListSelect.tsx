import { Input, Select } from "antd"
import { BitqueryNetworksEnum, NetworkToBitqueryEnumMappings } from "../constants/BitqueryNetworksEnum";
import { IQueryParams } from "../pages/TransactionFlow";
const { Option } = Select;

interface IDropdownListSelect {
    queryParams: IQueryParams,
    setQueryParams: React.Dispatch<React.SetStateAction<IQueryParams>>
};

const DropdownListSelect: React.FC<IDropdownListSelect> = ({ queryParams, setQueryParams }: IDropdownListSelect): JSX.Element => {

    const networkSelectionOptions: JSX.Element[] = [];
    NetworkToBitqueryEnumMappings.forEach((networkEnumValue: string, networkDisplayName: string) => { networkSelectionOptions.push(<Option value={networkEnumValue} key={networkEnumValue}>{networkDisplayName}</Option>) })

    return (
        <Input.Group compact style={{ width: 'fit-content' }}>
            <Select onChange={(value) => setQueryParams({ ...queryParams, network: value })} defaultValue={BitqueryNetworksEnum.EthMainnet} style={{ width: '200px' }}>
                {networkSelectionOptions}
            </Select>
            <Select onChange={(value) => setQueryParams({ ...queryParams, currency: value })} defaultValue="All" style={{ width: '75px' }}>
                <Option value="All">All</Option>
                {/* <Option value="ETH">ETH</Option> */}
            </Select>
        </Input.Group>
    );
};

export default DropdownListSelect;