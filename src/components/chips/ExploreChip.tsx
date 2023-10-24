/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect, useState } from "react";
import { Books } from "@prisma/client";
import Autocomplete, {
  AutocompleteRenderInputParams,
} from "@mui/material/Autocomplete";
import { ChipContainer, RoundedTextField } from "./chipStyle";

interface ExploreChipProps {
  setBooks: React.Dispatch<React.SetStateAction<Books[]>>;
  booksPerPage: number;
  currentPage: number;
}
interface AutoCompleteData {
  id: string;
  title: string;
}

export function ExploreChip({
  setBooks,
  booksPerPage,
  currentPage,
}: ExploreChipProps) {
  const [search, setSearch] = useState<string>("");
  const [autoCompleteData, setAutoCompleteData] = useState<AutoCompleteData[]>(
    []
  );

  const getAutoComplete = async () => {
    try {
      const response = await fetch(`api/bookDB/getSearchTitles`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch book data");
      }
      const data: AutoCompleteData[] =
        (await response.json()) as AutoCompleteData[];
      setAutoCompleteData(data);
    } catch (err) {
      console.error(err);
    }
  };
  const handleAutoCompleteChange = (
    event: React.SyntheticEvent,
    value: AutoCompleteData | null
  ) => {
    if (value) {
      fetch(`api/bookDB/getBook/${value.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setBooks((prevBooks) => {
            const bookIndex = prevBooks.findIndex(
              (book) => book.id === data.id
            );
            if (bookIndex !== -1) {
              // If book is already present, move it to the front of the array
              const before = prevBooks.slice(0, bookIndex); // Elements before the existing book
              const after = prevBooks.slice(bookIndex + 1); // Elements after the existing book
              return [data, ...before, ...after]; // New array with the existing book moved to the front
            }

            // If book is not already present, proceed as before
            const currentPageIndices = new Set(
              Array.from(
                { length: booksPerPage },
                (_, i) => currentPage * booksPerPage + i
              )
            );
            const lastIndex = prevBooks.length - 1;

            // If the last book is being displayed, remove the first book
            if (currentPageIndices.has(lastIndex)) {
              return [data, ...prevBooks.slice(1)];
            }
            // Otherwise, remove the last book
            return [...prevBooks.slice(0, lastIndex), data];
          });
        })
        .catch((error) => {
          console.error("Error fetching random books:", error);
        });
    }
  };

  useEffect(() => {
    getAutoComplete();
  }, []);

  return (
    <ChipContainer>
      <Autocomplete
        id='auto-complete'
        options={autoCompleteData}
        getOptionLabel={(option) => option.title}
        onChange={handleAutoCompleteChange}
        onInputChange={(event, newInputValue) => {
          setSearch(newInputValue);
        }}
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

// const handleSearchOnBlur = async () => {
//   setLoading(true);
//   try {
//     if (searchText === "") {
//       const res = await fetch(`/google-books/?title=${inputValue}`);
//       setBooks((prevBooks) => [...res.json(), ...prevBooks]);
//       setCurrentPage(0);
//     }
//   } catch (err) {
//     console.error(err);
//   } finally {
//     setLoading(false);
//   }
// };
