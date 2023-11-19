import { FC, useEffect, useState } from "react";
import MessagesIcon from "@mui/icons-material/Message";
import Typography from "@mui/material/Typography";
import { use } from "passport";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { OpenDrawerButton } from "../messageStyle";

interface MessagesHeaderProps {
  toggleDrawer: (open: boolean) => () => void;
}
type AutoCompleteData = string;

export const MessagesHeader: FC<MessagesHeaderProps> = ({ toggleDrawer }) => {
  const [autoCompleteData, setAutoCompleteData] = useState<AutoCompleteData[]>(
    []
  );
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    fetch("/api/user/getUserNames")
      .then((response) => response.json())
      .then((data) => {
        setAutoCompleteData(data as AutoCompleteData[]);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <OpenDrawerButton>
      <Box width='200px'>
        '
        <Autocomplete
          id='auto-complete'
          options={autoCompleteData}
          getOptionLabel={(option) =>
            typeof option === "string" ? option : option
          }
          onInputChange={(event, value) => {
            setSearch(value);
          }}
          fullWidth
          freeSolo
          renderInput={(params) => (
            <TextField
              {...params}
              id='outlined-basic'
              label='Search'
              variant='outlined'
            />
          )}
        />
      </Box>
      <MessagesIcon onClick={toggleDrawer(false)} />
    </OpenDrawerButton>
  );
};
