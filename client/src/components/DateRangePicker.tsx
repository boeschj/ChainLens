import { Space } from "antd";
import DatePicker, { RangePickerProps } from "antd/lib/date-picker";
import moment from "moment";
import { IQueryParams } from "../pages/TransactionFlow";
const { RangePicker } = DatePicker;

interface IDateRangePicker {
    queryParams: IQueryParams,
    setQueryParams: React.Dispatch<React.SetStateAction<IQueryParams>>
};

const DateRangePicker: React.FC<IDateRangePicker> = ({ queryParams, setQueryParams }: IDateRangePicker): JSX.Element => {

    const onDateRangeChange: RangePickerProps['onChange'] = (dates) => {
        if (dates)
            setQueryParams({ ...queryParams, from: dates[0]!.toISOString(), till: dates[1]!.toISOString() });
    };

    return (
        <Space direction="vertical" size={10} style={{ width: '230px' }}>
            <RangePicker
                ranges={{
                    'Today': [moment(), moment()],
                    'This Week': [moment().startOf('week'), moment()],
                    'This Month': [moment().startOf('month'), moment()],
                    'This Year': [moment().startOf('year'), moment()],
                    'All Time': [moment("2009-01-11T19:30:00"), moment()]
                }}
                format="MM/DD/YYYY"
                defaultValue={[moment().startOf('week'), moment()]}
                onChange={onDateRangeChange} />
        </Space>
    );
};

export default DateRangePicker;