import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FC } from "react";
import Stack from "@mui/material/Stack";

interface BookDatePickerProps {
  bookStartDate: Dayjs | null;
  bookEndDate: Dayjs | null;
  setBookStartDate: (date: Dayjs | null) => void;
  setBookEndDate: (date: Dayjs | null) => void;
}

export const BookDatePicker: FC<BookDatePickerProps> = ({
  bookStartDate,
  bookEndDate,
  setBookStartDate,
  setBookEndDate,
}) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Stack>
      <DatePicker
        label='Book Reading Starts'
        value={bookStartDate}
        onChange={(newValue) => setBookStartDate(newValue)}
      />
      <DatePicker
        label='Book Reading Ends'
        value={bookEndDate}
        onChange={(newValue) => setBookEndDate(newValue)}
      />
    </Stack>
  </LocalizationProvider>
);