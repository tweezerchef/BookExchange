import { FC } from "react";
import { Activity, Books, User } from "@prisma/client";
import { Review } from "./components/Review";
import { SideBarCard } from "./components/cardStyles";
import { SideCarBook } from "./components/SideCarBook";
import { SideCarAVI } from "./components/SideCarAVI";

interface ExtendedActivity extends Omit<Activity, "createdAt"> {
  createdAt: string;
  Books: Books;
  user: User;
}

interface SideCardProps {
  activity: ExtendedActivity;
}

export const SideCardReview: FC<SideCardProps> = ({ activity }) => {
  const { picture, userName } = activity.user;
  const { description } = activity;

  return (
    <SideBarCard>
      <SideCarAVI picture={picture} userName={userName} />
      <Review description={description} />
      <SideCarBook activity={activity} />
    </SideBarCard>
  );
};
