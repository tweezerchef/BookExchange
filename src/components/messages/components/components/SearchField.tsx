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
  setSearch: (value: AutoCompleteData) => void;
};

export const SearchField: FC<SearchFieldProps> = ({
  autoCompleteData,
  setSearch,
}) => (
  <Box width='200px'>
    <Autocomplete
      id='auto-complete'
      options={autoCompleteData}
      getOptionLabel={(option) => option.userName}
      onChange={(event, value) => {
        if (value && typeof value === "object") {
          setSearch(value);
        }
      }}
      fullWidth
      renderInput={(params) => (
        <TextField {...params} label='Search' variant='outlined' />
      )}
    />
  </Box>
);
