import { Books } from "@prisma/client";
import { FC, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { HeaderContainer } from "./headerStyle";
import { HeaderBookCard } from "./components/HeaderBookCard";
import { BookDatePicker } from "./components/components/BookDatePicker";
import { ClubImagePicker } from "./components/components/ClubImagePicker";
import { ClubNamePicker } from "./components/components/ClubNamePicker";

interface CreateClubHeaderProps {
  clubBook: Books;
}

export const CreateClubHeader: FC<CreateClubHeaderProps> = ({ clubBook }) => {
  const [bookStartDate, setBookStartDate] = useState<Dayjs | null>(dayjs());
  const [bookEndDate, setBookEndDate] = useState<Dayjs | null>(dayjs());
  const [clubName, setClubName] = useState<string>("");
  const [clubDescription, setClubDescription] = useState<string>("");
  const [clubImage, setClubImage] = useState<string>("");
  const isFormValid = () => {
    if (
      clubName &&
      clubDescription &&
      clubImage &&
      bookStartDate &&
      bookEndDate &&
      !bookEndDate.isBefore(bookStartDate) &&
      clubBook &&
      clubBook.id
    ) {
      return true;
    }
    return false;
  };

  const handleSubmit = () => {
    if (!isFormValid()) return;
    const clubData = {
      clubName,
      clubDescription,
      clubImage,
      bookStartDate: bookStartDate ? bookStartDate.toISOString() : null,
      bookEndDate: bookEndDate ? bookEndDate.toISOString() : null,
      clubBookId: clubBook.ISBN10, // Assuming clubBook has an 'id' field
    };

    // Submit the data to your database
    // This could be an API call or any other method you use
    // Example: await submitClubData(clubData);
  };
  return (
    <HeaderContainer>
      <ClubNamePicker
        clubName={clubName}
        setClubName={setClubName}
        clubDescription={clubDescription}
        setClubDescription={setClubDescription}
      />
      <ClubImagePicker
        clubImage={clubImage}
        setClubImage={setClubImage}
        clubName={clubName}
      />
      <HeaderBookCard book={clubBook} />
      <BookDatePicker
        bookStartDate={bookStartDate}
        bookEndDate={bookEndDate}
        setBookStartDate={setBookStartDate}
        setBookEndDate={setBookEndDate}
        isFormValid={isFormValid}
        handleSubmit={handleSubmit}
      />
    </HeaderContainer>
  );
};
