import { Space } from "antd";
import DatePicker, { RangePickerProps } from "antd/lib/date-picker";
import moment from "moment";
import { IQueryParams } from "../pages/TransactionFlow";
const { RangePicker } = DatePicker;

const ALL_TIME_DATE = "2009-01-11T19:30:00";

interface DateRangePickerProps {
  queryParams: IQueryParams;
  setQueryParams: React.Dispatch<React.SetStateAction<IQueryParams>>;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  queryParams,
  setQueryParams,
}) => {
  const handleDateRangeChange: RangePickerProps["onChange"] = (dates) => {
    if (dates && dates[0] && dates[1]) {
      const fromDate = dates[0].toDate();
      const tillDate = dates[1].toDate();

      setQueryParams((prevParams) => ({
        ...prevParams,
        from: fromDate.toISOString(),
        till: tillDate.toISOString(),
      }));
    }
  };

  const now = moment();

  const dateRanges: RangePickerProps["ranges"] = {
    Today: [now, now],
    "This Week": [moment().startOf("week"), now],
    "This Month": [moment().startOf("month"), now],
    "This Year": [moment().startOf("year"), now],
    "All Time": [moment(ALL_TIME_DATE), now],
  };

  return (
    <Space direction="vertical" size={10} style={{ width: "230px" }}>
      <RangePicker
        ranges={dateRanges}
        format="MM/DD/YYYY"
        defaultValue={[moment().startOf("week"), now]}
        onChange={handleDateRangeChange}
      />
    </Space>
  );
};

export default DateRangePicker;
