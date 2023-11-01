/* eslint-disable react/no-array-index-key */
import Grid from "@mui/material/Grid";
import { FC } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useHomeState } from "../../../context/context";

type ToolTips = { [key: string]: string };
const tooltips: ToolTips = {
  action: "Action",
  comedy: "Comedy",
  drama: "Drama",
  horror: "Horror",
  romance: "Romance",
  thriller: "Thriller",
  sciFI: "Science Fiction",
  mystery: "Mystery",
  fantasy: "Fantasy",
  history: "Historical Fiction",
  western: "Western",
  nonFiction: "Non-Fiction",
  fiction: "Fiction",
  childrens: "Children's",
  cooking: "Cooking",
  selfHelp: "Self-Help",
  travel: "Travel",
  spirituality: "Spirituality",
};

interface UserGenre {
  genre: string;
}

interface GenreIconsProps {
  userGenres: UserGenre[];
}

export const GenreIcons: FC<GenreIconsProps> = ({ userGenres }) => {
  const { imageUrlsObj } = useHomeState();

  // Create a set of unique genre names
  const uniqueGenres = new Set(userGenres.map((genreObj) => genreObj.genre));

  return (
    <Grid container spacing={1} justifyContent='center' style={{ margin: 0 }}>
      {Array.from(uniqueGenres).map((genre, index) => {
        const genreKey = `${genre}Book`;
        const imageUrl = imageUrlsObj[`icons/${genreKey}.png`];

        // Skip rendering if imageUrl is not found
        if (!imageUrl) return null;

        return (
          <Grid item key={index} xs='auto' style={{ padding: 4 }}>
            <Tooltip title={tooltips[genre] || "Tooltip not available"}>
              <IconButton>
                <img
                  src={imageUrl}
                  alt={genreKey}
                  style={{ width: "20px", height: "20px" }}
                />
              </IconButton>
            </Tooltip>
          </Grid>
        );
      })}
    </Grid>
  );
};
