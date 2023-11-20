import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { FC } from "react";

type AutoCompleteData = {
  userName: string;
  id: string;
};
type SearchFieldProps = {
  autoCompleteData: AutoCompleteData[];
  setSearch: (value: string) => void;
};

export const SearchField: FC<SearchFieldProps> = ({
  autoCompleteData,
  setSearch,
}) => (
  <Box width='200px'>
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
);
