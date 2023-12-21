import { FC, useEffect, useState } from "react";
import { Books, Clubs } from "@prisma/client";
import Image from "next/image";
import { ClubBox } from "./components/ClubBox";
import { BookBox } from "./components/BookBox";
import { StyledClubCard } from "./clubCardStyle";

interface ClubsBook extends Clubs {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Clubs_Books: any;
}

interface ClubProps {
  club: ClubsBook;
}

export const ClubCard: FC<ClubProps> = ({ club }) => {
  const { id, name, description, image, memberCount, discussionCount } = club;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { Clubs_Books } = club;

  return (
    <StyledClubCard>
      <ClubBox image={image} name={name} />
      <BookBox Clubs_Books={Clubs_Books} />
    </StyledClubCard>
  );
};
