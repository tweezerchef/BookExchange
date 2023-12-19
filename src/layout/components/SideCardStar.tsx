import { FC, useEffect, useState } from "react";
import { Activity, Books, User } from "@prisma/client";
import { Stack } from "@mui/material";
import Link from "next/link";
import { StarRating } from "./components/StarRating";
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

export const SideCardStar: FC<SideCardProps> = ({ activity }) => {
  const { picture, userName, id } = activity.user;
  const { description } = activity;

  return (
    <SideBarCard>
      <Stack
        direction='column'
        spacing={1}
        alignItems='center'
        alignContent='center'
        padding={1}
      >
        <Link href={`/friendPage?friendId=${id}`}>
          <SideCarAVI picture={picture} userName={userName} />
        </Link>
        <StarRating description={description} />
      </Stack>
      <SideCarBook activity={activity} />
    </SideBarCard>
  );
};
