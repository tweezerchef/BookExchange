import { FC } from "react";
import { Activity, Books, User } from "@prisma/client";
import { Stack } from "@mui/material";
import Link from "next/link";
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
  const { picture, userName, id } = activity.user;
  const { description } = activity;

  return (
    <SideBarCard>
      <Stack direction='column' spacing={2} alignItems='center'>
        <Link href={`/friendPage?friendId=${id}`}>
          <SideCarAVI picture={picture} userName={userName} />
        </Link>
        <Review description={description} />
      </Stack>
      <SideCarBook activity={activity} />
    </SideBarCard>
  );
};
