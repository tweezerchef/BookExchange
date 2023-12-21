import { FC, useEffect, useState } from "react";
import { Books, Clubs } from "@prisma/client";
import Image from "next/image";
import { Box } from "@mui/material";
import {
  StyledClubBox,
  ClubImageBox,
  NameTypography,
  LowerClubBox,
} from "../clubCardStyle";

interface ClubBookProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Clubs_Books: any;
}

export const BookBox: FC<ClubBookProps> = ({ Clubs_Books }) => {
  const [bookImage, setBookImage] = useState<string>("");
  const { id, title, author, image, ISBN10 } = Clubs_Books[0];
  useEffect(() => {
    setBookImage(image);
    console.log("bookImage", image);
    console.log(Clubs_Books);
  }, [image]);

  return (
    <StyledClubBox>
      <ClubImageBox>
        <Image src={image} fill alt={title} />
      </ClubImageBox>
      <LowerClubBox>
        <NameTypography>{title}</NameTypography>
      </LowerClubBox>
    </StyledClubBox>
  );
};
