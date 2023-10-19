import { useEffect, useState } from "react";
import ToolTip from "@mui/material/Tooltip";
import { useUserDispatch, useUserState } from "../../context/context";
import { SET_STAR_RATINGS } from "../../context/actions";
import { mutate } from "swr"; // Import useSWR and mutate from SWR
import Rating from "@mui/material/Rating";

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
  console.log("user", user.id);

  // Find the star rating for the given bookID
  const starRatingObj = starRatings.find(
    (ratingObj) => ratingObj.booksId === bookID
  );
  const starRatingValue = starRatingObj ? starRatingObj.starRating : 0;

  const handleStarRatingChange = async (
    event: React.ChangeEvent<{}>,
    newValue: number
  ) => {
    // Create a copy of the current starRatings state
    const updatedStarRatings = [...starRatings];

    // Find the index of the star rating object in the array
    const index = updatedStarRatings.findIndex(
      (ratingObj) => ratingObj.booksId === bookID
    );

    if (index !== -1) {
      // If the book's star rating exists, update it
      updatedStarRatings[index].starRating = newValue;
    } else {
      // If the book's star rating doesn't exist, create a new object
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
          book: book,
          userId: userID,
          starRating: newValue,
        }),
      });

      // Use mutate to send the updated data to the server without fetching new data
      mutate(`/api/user/starRating/${userID}`);
    } catch (error) {
      // Handle any errors here
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
