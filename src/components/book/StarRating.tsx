import Rating from "@mui/material/Rating";
import { Books, UserBooks, User } from "@prisma/client";
import { useHomeDispatch, useHomeState } from "../../context/context";
import { SET_STAR_RATINGS } from "../../context/actions";

interface StarRatingProps {
  book: Books;
  user?: Partial<User>;
  isRegistration?: boolean;
  onRatingChange?: () => void;
}

export const StarRating: React.FC<StarRatingProps> = ({
  book,
  user,
  onRatingChange,
  isRegistration,
}) => {
  const state = useHomeState();
  const dispatch = useHomeDispatch();

  const { starRatings } = state;
  const regUser = user ?? state.user;
  const userID = regUser?.id;
  const bookID = book?.id;
  const ISBN10 = book?.ISBN10;

  const starRatingObj = starRatings.find(
    (ratingObj) => ratingObj.ISBN10 === ISBN10
  );
  const starRatingValue = starRatingObj ? starRatingObj.starRating : 0;

  const handleStarRatingChange = (
    event: React.SyntheticEvent,
    newValue: number | null
  ) => {
    if (newValue === null) return;
    if (isRegistration && onRatingChange) {
      onRatingChange();
    }

    const updatedStarRatings = [...starRatings];
    const index = updatedStarRatings.findIndex(
      (ratingObj) => ratingObj.ISBN10 === ISBN10
    );
    if (index !== -1) {
      updatedStarRatings[index].starRating = newValue;
    } else if (bookID) {
      updatedStarRatings.push({
        booksId: bookID,
        starRating: newValue,
        ISBN10,
      });
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
        paddingTop: 10,
      }}
    />
  );
};
