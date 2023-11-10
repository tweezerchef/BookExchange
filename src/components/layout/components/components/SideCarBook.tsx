import Image from "next/image";
import { FC } from "react";
import { Activity, User, Books } from "@prisma/client";
import Box from "@mui/material/Box";

interface ExtendedActivity extends Omit<Activity, "createdAt"> {
  createdAt: string; // Now expecting a string instead of a Date
  Books: Books;
  user: User;
}

interface SideCarBookProps {
  activity: ExtendedActivity;
}

export const SideCarBook: FC<SideCarBookProps> = ({ activity }) => (
  <Box margin={1}>
    <Image
      src={activity.Books.image}
      alt={activity.Books.title}
      width={80}
      height={110}
    />
  </Box>
);
