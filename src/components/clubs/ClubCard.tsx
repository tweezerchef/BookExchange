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
  const [isClicked, setIsClicked] = useState(false);

  const handleCardClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 200);
  };

  return (
    <StyledClubCard
      onClick={handleCardClick}
      style={{
        transform: isClicked ? "scale(0.95)" : "none", // Make it look pressed
        boxShadow: isClicked ? "inset 0 3px 5px rgba(0, 0, 0, 0.2)" : "none", // Inner shadow for clicked effect
        // Any other style changes you want to apply when the card is clicked
      }}
    >
      <ClubBox image={image} name={name} />
      <BookBox Clubs_Books={Clubs_Books} />
    </StyledClubCard>
  );
};
