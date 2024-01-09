import { Books } from "@prisma/client";
import { FC } from "react";
import { HeaderBookCard } from "../createClub/components/HeaderBookCard";
import Stack from "@mui/material/Stack";

interface ClubHeaderProps {
  image: string;
  name: string;
  description: string;
  members: string;
  book: Books;
}

export const ClubHeader: FC<ClubHeaderProps> = ({
  image,
  name,
  description,
  members,
  book,
}) => {
  return (
    <div>
      <Stack direction='row' spacing={2}>
        <HeaderBookCard book={book} />
      </Stack>
    </div>
  );
};
