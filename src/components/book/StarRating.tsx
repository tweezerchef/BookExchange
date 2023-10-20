import Rating from "@mui/material/Rating";
import { useUserDispatch, useUserState } from "../../context/context";
import { SET_STAR_RATINGS } from "../../context/actions";

interface StarRatingProps {
  book: Book;
}

export const StarRating: React.FC<StarRatingProps> = ({ book }) => {
  const state = useUserState();
  const dispatch = useUserDispatch();

  const { starRatings } = state;
  const { user } = state;

  const userID = user?.id;
  const bookID = book?.id;

  const starRatingObj = starRatings.find(
    (ratingObj) => ratingObj.booksId === bookID
  );
  const starRatingValue = starRatingObj ? starRatingObj.starRating : 0;

  const handleStarRatingChange = async (
    event: React.ChangeEvent<Record<string, never>>,
    newValue: number
  ) => {
    const updatedStarRatings = [...starRatings];
    const index = updatedStarRatings.findIndex(
      (ratingObj) => ratingObj.booksId === bookID
    );
    if (index !== -1) {
      updatedStarRatings[index].starRating = newValue;
    } else {
      updatedStarRatings.push({ booksId: bookID, starRating: newValue });
    }

    // Update the state with the new starRatings array
    dispatch({ type: SET_STAR_RATINGS, payload: updatedStarRatings });

    try {
      await fetch(`/api/user/starRating/${bookID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          book,
          userId: userID,
          starRating: newValue,
        }),
      });
    } catch (error) {
      console.error(error);
    }
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
