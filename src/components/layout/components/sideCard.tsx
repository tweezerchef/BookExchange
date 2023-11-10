import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import { FC, useEffect, useState } from "react";
import { Activity, Books, User } from "@prisma/client";
import { Stack, Typography } from "@mui/material";
import { fakeData } from "./fakeData";
import { StarRating } from "./components/starRating";
import { SideBarCard } from "./components/cardStyles";

interface ExtendedActivity extends Omit<Activity, "createdAt"> {
  createdAt: string; // Now expecting a string instead of a Date
  Books: Books;
  user: User;
}

interface SideCardProps {
  activities: ExtendedActivity[];
}

const sideCardProps: SideCardProps = { activities: fakeData };

export const SideCard: FC<SideCardProps> = ({ activities }) => {
  const [aviURL, setAviURL] = useState<string>("");
  const name = "SideCard";
  const activity = activities[0];
  console.log(activities);
  useEffect(() => {
    const fetchSignedUrl = async () => {
      const response = await fetch(
        `/api/AWS/signedURL?fileNames=${encodeURIComponent(
          activity.user.picture
        )}`
      );
      const data = await response.json();
      setAviURL(data.url);
    };
    void fetchSignedUrl();
  });

  return (
    <SideBarCard>
      <Stack
        direction='column'
        spacing={0.5}
        sx={{ marginLeft: 0.5, marginTop: 0.5 }}
      >
        <Typography variant='body2'>{activity.user.userName}</Typography>
        <Avatar src={aviURL} sx={{ margin: 2 }} />
      </Stack>
      <StarRating activity={activity} />
    </SideBarCard>
  );
};
