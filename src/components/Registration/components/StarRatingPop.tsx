import { FC } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { StarRatingPopover } from "./regCompStyles";

interface StarRatingPopProps {
  ratingAnchorEl: HTMLElement | null;
  setRatingAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

export const StarRatingPop: FC<StarRatingPopProps> = ({
  ratingAnchorEl,
  setRatingAnchorEl,
}) => {
  const handleClose = () => {
    setRatingAnchorEl(null);
  };
  const open = Boolean(ratingAnchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <StarRatingPopover
      id={id}
      open={Boolean(ratingAnchorEl)}
      anchorEl={ratingAnchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          width: "40vw",
        }}
      >
        <Typography sx={{ p: 2 }}>
          In order to use the app, you must rate at least 10 books. This helps
          us recommend books to and find friends. To do this just click on the
          amount of stars you want to give the book. You can change your rating
          at any time. Make sure to give books you don't like ratings as well,
          as it helps us refine our search.
        </Typography>
        <Button onClick={handleClose} variant='contained'>
          Got it!
        </Button>
      </Box>
    </StarRatingPopover>
  );
};
