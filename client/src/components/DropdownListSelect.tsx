import { Input, Select } from "antd"
import { IQueryParams } from "../graphInputs";
const { Option } = Select;

interface IDropdownListSelect {
    queryParams: IQueryParams,
    setQueryParams: React.Dispatch<React.SetStateAction<IQueryParams>>
};

const DropdownListSelect: React.FC<IDropdownListSelect> = ({ queryParams, setQueryParams }: IDropdownListSelect): JSX.Element => {

    return (
        <Input.Group compact style={{ width: 'fit-content' }}>
            <Select onChange={(e) => console.log(e)} defaultValue="1" style={{ width: '200px' }}>
                <Option value="1">Ethereum Mainnet</Option>
                <Option value="120">Bitcoin Mainnet</Option>
            </Select>
            <Select onChange={(value) => setQueryParams({ ...queryParams, currency: value })} defaultValue="All" style={{ width: '75px' }}>
                <Option value="All">All</Option>
                <Option value="ETH">ETH</Option>
            </Select>
        </Input.Group>
    );
};

export default DropdownListSelect;