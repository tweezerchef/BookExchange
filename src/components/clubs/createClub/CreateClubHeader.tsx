import { Books } from "@prisma/client";
import { FC } from "react";
import { HeaderContainer } from "./headerStyle";
import { HeaderBookCard } from "./components/HeaderBookCard";

interface CreateClubHeaderProps {
  clubBook: Books;
  clubName: string;
  clubDescription: string;
  clubImage: string;
}

export const CreateClubHeader: FC<CreateClubHeaderProps> = ({
  clubBook,
  clubName,
  clubDescription,
  clubImage,
}) => (
  <HeaderContainer>
    <h1>Create Club</h1>
    <HeaderBookCard book={clubBook} />
  </HeaderContainer>
);
