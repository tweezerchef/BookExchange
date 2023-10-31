import Rating from "@mui/material/Rating";
import { useHomeDispatch, useHomeState } from "../../context/context";
import { SET_STAR_RATINGS } from "../../context/actions";

interface Book {
  id?: string;
  title?: string;
  subTitle?: string;
  pubDate?: string;
  pageCount?: number;
  author?: string;
  selfLink?: string;
  description?: string;
  content?: string;
  image?: string;
  mainGenre?: string;
  buyLink?: string;
  viewAbility?: string;
  rating?: number;
  ISBN10?: string;
  books?: Book[];
}

interface StarRatingProps {
  book: Book;
}

export const StarRating: React.FC<StarRatingProps> = ({ book }) => {
  const state = useHomeState();
  const dispatch = useHomeDispatch();

  const { starRatings } = state;
  const { user } = state;

  const userID = user?.id;
  const bookID = book?.id;

  const starRatingObj = starRatings.find(
    (ratingObj) => ratingObj.booksId === bookID
  );
  const starRatingValue = starRatingObj ? starRatingObj.starRating : 0;

  const handleStarRatingChange = (
    event: React.SyntheticEvent,
    newValue: number | null
  ) => {
    if (newValue === null) return;
    dispatch({
      type: SET_STAR_RATINGS,
      payload: (prevStarRatings) => {
        const updatedStarRatings = [...prevStarRatings];
        const index = updatedStarRatings.findIndex(
          (ratingObj) => ratingObj.booksId === bookID
        );
        if (index !== -1) {
          updatedStarRatings[index].starRating = newValue;
        } else if (bookID) {
          updatedStarRatings.push({ booksId: bookID, starRating: newValue });
        }
        return updatedStarRatings;
      },
    });

    fetch(`/api/user/starRating/${bookID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        book,
        userId: userID,
        starRating: newValue,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  };

  return (
    <Rating
      name='half-rating'
      value={starRatingValue}
      precision={0.5}
      onChange={handleStarRatingChange} // Attach the onChange handler
      style={{
        marginTop: 5,
      }}
    />
  );
};
