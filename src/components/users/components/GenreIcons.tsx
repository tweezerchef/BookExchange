import Grid from "@mui/material/Grid";
import { FC, useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

interface GenreIconState {
  [key: string]: string;
}

const genreNames = [
  "actionBook",
  "comedyBook",
  "dramaBook",
  "horrorBook",
  "romanceBook",
  "thrillerBook",
  "sciFIBook",
  "mysteryBook",
  "fantasyBook",
  "historyBook",
  "westernBook",
  "nonFictionBook",
  "fictionBook",
  "childrensBook",
  "cookingBook",
  "selfHelpBook",
  "travelBook",
  "spiritualityBook",
];
const tooltips = {
  actionBook: "Action",
  comedyBook: "Comedy",
  dramaBook: "Drama",
  horrorBook: "Horror",
  romanceBook: "Romance",
  thrillerBook: "Thriller",
  sciFIBook: "Science Fiction",
  mysteryBook: "Mystery",
  fantasyBook: "Fantasy",
  historyBook: "Historical Fiction",
  westernBook: "Western",
  nonFictionBook: "Non-Fiction",
  fictionBook: "Fiction",
  childrensBook: "Children's",
  cookingBook: "Cooking",
  selfHelpBook: "Self-Help",
  travelBook: "Travel",
  spiritualityBook: "Spirituality",
};
type Data = {
  urls: string[];
  message?: string;
};

export const GenreIcons: FC = () => {
  const [state, setState] = useState<GenreIconState>({});

  useEffect(() => {
    const fileNames = genreNames.map((name) => `icons/${name}.png`).join(",");
    fetch(`/api/AWS/signedURL?fileNames=${fileNames}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data: Data) => {
        if (data.urls) {
          const newState: GenreIconState = {};
          genreNames.forEach((genre, index) => {
            newState[genre] = data.urls[index];
          });
          setState(newState);
        } else if (data.message) {
          console.error("Error:", data.message);
        } else {
          console.error("Unexpected response structure:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching signed URL:", error);
      });
    console.log(state);
  }, []);

  return (
    <Grid container spacing={1} justifyContent='center' style={{ margin: 0 }}>
      {Object.entries(state).map(([genre, url]) => (
        <Grid item key={genre} xs='auto' style={{ padding: 4 }}>
          <Tooltip title={tooltips[genre] || "Tooltip not available"}>
            <IconButton>
              <img
                src={url}
                alt={genre}
                style={{ width: "20px", height: "20px" }}
              />
            </IconButton>
          </Tooltip>
        </Grid>
      ))}
    </Grid>
  );
};
