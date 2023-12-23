import { Books } from "@prisma/client";
import { FC } from "react";
import { HeaderContainer } from "./headerStyle";

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
  </HeaderContainer>
);
