import Rating from "@mui/material/Rating";
import { Books, UserBooks } from "@prisma/client";
import { useHomeDispatch, useHomeState } from "../../context/context";
import { SET_STAR_RATINGS } from "../../context/actions";

interface StarRatingProps {
  book: Books;
}
interface StarRatings {
  booksId: string;
  starRating: number;
}
interface StarRatingRequestBody {
  book: Partial<Books>;
  userId: string;
  starRating: number;
}

export const StarRating: React.FC<StarRatingProps> = ({ book }) => {
  const state = useHomeState();
  const dispatch = useHomeDispatch();

  const { starRatings } = state;
  const { user } = state;
  const userID = user?.id;
  const bookID = book?.id;

  if (!Array.isArray(starRatings) || starRatings.length === 0) {
    return null;
  }
  const starRatingObj = starRatings.find(
    (ratingObj) => ratingObj.booksId === bookID
  );
  const starRatingValue = starRatingObj ? starRatingObj.starRating : 0;

  const handleStarRatingChange = (
    event: React.SyntheticEvent,
    newValue: number | null
  ) => {
    if (newValue === null) return;
    const updatedStarRatings = [...starRatings];
    const index = updatedStarRatings.findIndex(
      (ratingObj) => ratingObj.booksId === bookID
    );
    if (index !== -1) {
      updatedStarRatings[index].starRating = newValue;
    } else if (bookID) {
      updatedStarRatings.push({ booksId: bookID, starRating: newValue });
    }
    dispatch({ type: SET_STAR_RATINGS, payload: updatedStarRatings });

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
