/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect, useState } from "react";
import { Books } from "@prisma/client";
import Autocomplete, {
  AutocompleteRenderInputParams,
} from "@mui/material/Autocomplete";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ChipContainer, RoundedTextField } from "./chipStyle";
import { getAutoComplete, handleAutoCompleteChange } from "./api";

interface ExploreChipProps {
  setBooks: React.Dispatch<React.SetStateAction<Books[]>>;
  booksPerPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}
interface AutoCompleteData {
  id: string;
  title: string;
}

export function ExploreChip({
  setBooks,
  booksPerPage,
  currentPage,
  setCurrentPage,
}: ExploreChipProps) {
  const [search, setSearch] = useState<string>("");
  const [autoCompleteData, setAutoCompleteData] = useState<AutoCompleteData[]>(
    []
  );

  useEffect(() => {
    getAutoComplete(setAutoCompleteData);
  }, []);

  return (
    <ChipContainer>
      <Autocomplete
        id='auto-complete'
        options={autoCompleteData}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.title
        }
        onChange={(event, value) => {
          handleAutoCompleteChange(event, value, setBooks);
          setCurrentPage(0);
        }}
        onInputChange={(event, newInputValue) => {
          setSearch(newInputValue);
        }}
        freeSolo
        renderInput={(params: AutocompleteRenderInputParams) => (
          <RoundedTextField
            {...params}
            id='outlined-basic'
            label='Search'
            variant='outlined'
          />
        )}
      />
    </ChipContainer>
  );
}
