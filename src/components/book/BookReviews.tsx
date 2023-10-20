import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
// import MiniStar from "./MiniStar";

type Review = {
  User: User;
  review: string;
};
interface ReviewsProps {
  reviews: Review[];
}

export const BookReviews: React.FC<ReviewsProps> = ({ reviews }) => (
  <Box sx={{ width: 320 }}>
    <Typography
    // id="ellipsis-list-demo"
    // level="body4"
    // textTransform="uppercase"
    // fontWeight="xl"
    // mb={1}
    // sx={{ letterSpacing: '0.15rem' }}
    >
      Reviews
    </Typography>
    <List
      aria-labelledby='ellipsis-list-demo'
      sx={{ "--ListItemDecorator-size": "56px" }}
    >
      {reviews?.map((review, index) => (
        // <Link to={`/profile/${userBook.User.id}`}>
        <ListItem key={review.User.id}>
          <ListItemAvatar sx={{ alignSelf: "flex-start" }}>
            <Avatar src={review.User.picture} />
          </ListItemAvatar>
          <ListItemText>
            {/* <MiniStar value={userBook.rating} /> */}
            <Typography variant='body1'>
              {review.User.username
                ? review.User.username
                : review.User.firstName}
              's Review:
              {review.review}
            </Typography>
          </ListItemText>
        </ListItem>
        // </Link>
      ))}
    </List>
  </Box>
);
