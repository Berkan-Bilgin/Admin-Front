import { DatePicker } from '@mui/x-date-pickers';

interface SingleDatePickerProps {
  label: string;
  date: Date | null;
  onDateChange: (date: Date | null) => void;
}

function SingleDatePicker({ label, date, onDateChange }: SingleDatePickerProps) {
  return <DatePicker sx={{ width: '90%' }} label={label} value={date} onChange={onDateChange} />;
}

export default SingleDatePicker;
