import { FC, useEffect, useState } from "react";
import { Clubs } from "@prisma/client";
import { CloseButton } from "../book/bigBookStyles";

interface ClubProps {
  club: Clubs;
}

export const ClubCard: FC<ClubProps> = ({ club }) => {
  const [clubImage, setClubImage] = useState<string>("");
  useEffect(() => {}, [club]);

  return (
    <div>
      <h1>ClubCard</h1>
    </div>
  );
};
