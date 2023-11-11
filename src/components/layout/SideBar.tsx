import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Activity, Books, User } from "@prisma/client";
import { SideCardStar } from "./components/SideCardStar";
import { SideCardReview } from "./components/SideCardReview";

interface ExtendedActivity extends Omit<Activity, "createdAt"> {
  createdAt: string;
  Books: Books;
  user: User;
}

interface SideCardProps {
  activities: ExtendedActivity[];
}

export default function SideBar() {
  const [activities, setActivities] = useState<ExtendedActivity[]>([]);

  useEffect(() => {
    console.log("fetching activities");
    const fetchActivities = async () => {
      try {
        const response = await fetch("/api/activities");
        const data = (await response.json()) as ExtendedActivity[];
        if (!data) return;
        setActivities(data);
      } catch (err) {
        console.error(err);
      }
    };
    void fetchActivities();
  }, []);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md")); // or 'sm', 'lg', etc.
  if (matches) {
    return null;
  }
  return (
    <Box
      sx={{
        position: "sticky",
        width: "280px",
        backgroundColor: "#fffaf0", // Set the background color
        padding: "0", // Add some padding
        overflowX: "clip",
      }}
    >
      {activities
        ? activities.map((activity) => {
            switch (activity.type) {
              case "StarRating":
                return <SideCardStar activity={activity} />;
              case "Review":
                return <SideCardReview activity={activity} />;
              default:
                return null;
            }
          })
        : null}
    </Box>
  );
}
