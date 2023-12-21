import { FC, useEffect, useState } from "react";
import { Clubs } from "@prisma/client";
import Image from "next/image";
import { ClubBox } from "./components/ClubBox";
import { StyledClubCard } from "./clubCardStyle";

interface ClubProps {
  club: Clubs;
}

export const ClubCard: FC<ClubProps> = ({ club }) => {
  const { id, name, description, image, memberCount, discussionCount } = club;

  return (
    <StyledClubCard>
      <ClubBox image={image} name={name} />
    </StyledClubCard>
  );
};
