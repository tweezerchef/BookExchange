import { Container } from "@mui/material";
import { Books } from "@prisma/client";
import { FC } from "react";

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
  <Container>
    <h1>Create Club</h1>
  </Container>
);
