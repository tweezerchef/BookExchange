import { FC, useEffect, useState } from "react";
import { Activity, Books, User } from "@prisma/client";
import { StarRating } from "./components/StarRating";
import { SideBarCard } from "./components/cardStyles";
import { SideCarBook } from "./components/SideCarBook";
import { SideCarAVI } from "./components/SideCarAVI";

interface ExtendedActivity extends Omit<Activity, "createdAt"> {
  createdAt: string; // Now expecting a string instead of a Date
  Books: Books;
  user: User;
}

interface SideCardProps {
  activities: ExtendedActivity[];
}

export const SideCardStar: FC<SideCardProps> = ({ activities }) => {
  const [aviURL, setAviURL] = useState<string>("");
  const name = "SideCard";
  const activity = activities[0];
  const { picture, userName } = activity.user;

  return (
    <SideBarCard>
      <SideCarAVI picture={picture} userName={userName} />
      <StarRating activity={activity} />
      <SideCarBook activity={activity} />
    </SideBarCard>
  );
};
