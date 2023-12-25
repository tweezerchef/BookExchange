import { Books } from "@prisma/client";
import { FC, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { HeaderContainer } from "./headerStyle";
import { HeaderBookCard } from "./components/HeaderBookCard";
import { BookDatePicker } from "./components/components/BookDatePicker";

interface CreateClubHeaderProps {
  clubBook: Books;
}

export const CreateClubHeader: FC<CreateClubHeaderProps> = ({ clubBook }) => {
  const [bookStartDate, setBookStartDate] = useState<Dayjs | null>(dayjs());
  const [bookEndDate, setBookEndDate] = useState<Dayjs | null>(dayjs());
  return (
    <HeaderContainer>
      <HeaderBookCard book={clubBook} />
      <BookDatePicker
        bookStartDate={bookStartDate}
        bookEndDate={bookEndDate}
        setBookStartDate={setBookStartDate}
        setBookEndDate={setBookEndDate}
      />
    </HeaderContainer>
  );
};
