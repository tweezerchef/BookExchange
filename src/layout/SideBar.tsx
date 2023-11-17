import { useEffect, useState } from "react";
import { Activity, Books, User } from "@prisma/client";
import { SideCardStar } from "./components/SideCardStar";
import { SideCardReview } from "./components/SideCardReview";
import { SideBarBox } from "./layoutStyles";

interface ExtendedActivity extends Omit<Activity, "createdAt"> {
  createdAt: string;
  Books: Books;
  user: User;
}

export default function SideBar() {
  const [activities, setActivities] = useState<ExtendedActivity[]>([]);

  useEffect(() => {
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
  return (
    <SideBarBox>
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
    </SideBarBox>
  );
}
