import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
// import MiniStar from "./MiniStar";

type BookReview = {
  User?: User;
  review?: string;
};

interface BookReviewsProps {
  reviews: BookReview[];
}

//

export const BookReviews: React.FC<BookReviewsProps> = ({ reviews }) => {
  const [updatedReviews, setUpdatedReviews] = useState<BookReview[]>([]);
  const [expandedReviews, setExpandedReviews] = useState<{
    [key: string]: boolean;
  }>({});

  const handleClickToToggleView = (id: string) => {
    setExpandedReviews((prevExpanded) => ({
      ...prevExpanded,
      [id]: !prevExpanded[id],
    }));
  };
  // NOTE: this needs to be refactored in the review expansion logic
  useEffect(() => {
    const fetchSignedUrlsAndUpdateReviews = async () => {
      const updated = await Promise.all(
        reviews.map(async (review) => {
          if (review.User?.picture) {
            const response = await fetch(
              `/api/AWS/signedURL?fileNames=${encodeURIComponent(
                review.User.picture
              )}`
            );
            const data = await response.json();
            console.log("data", data);
            return {
              ...review,
              User: { ...review.User, picture: data.url },
            };
          }
          return review;
        })
      );
      console.log("updated", updated);
      setUpdatedReviews(updated);
    };

    void fetchSignedUrlsAndUpdateReviews();
  }, [reviews]);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant='h6'>Reviews</Typography>
      <List
        aria-labelledby='ellipsis-list-demo'
        sx={{ "--ListItemDecorator-size": "56px" }}
      >
        {updatedReviews?.map((review, index) => (
          <ListItem
            key={review.User.id}
            onClick={() => handleClickToToggleView(review.User.id)}
          >
            <ListItemAvatar sx={{ alignSelf: "flex-start" }}>
              <Avatar src={review.User.picture} />
            </ListItemAvatar>
            <ListItemText
              sx={{
                backgroundColor: "rgba(250, 250, 250, 0.8)",
                display: expandedReviews[review.User.id]
                  ? "block"
                  : "-webkit-box",
                WebkitLineClamp: expandedReviews[review.User.id] ? "none" : 5,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              <Typography variant='body1'>
                {review.User.userName
                  ? review.User.userName
                  : review.User.firstName}
                's Review:
                {review.review}
              </Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
