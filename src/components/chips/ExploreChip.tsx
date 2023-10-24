/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect, useState } from "react";
import { Books } from "@prisma/client";
import { ChipContainer, RoundedTextField } from "./chipStyle";

interface ExploreChipProps {
  setBooks: React.Dispatch<React.SetStateAction<Books[]>>;
}
interface AutoCompleteData {
  id: string;
  title: string;
}

export function ExploreChip({ setBooks }: ExploreChipProps) {
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
      const data = await response.json();
      console.log("data", data);
      // setAutoCompleteData(searchTitle);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async (id: string) => {
    try {
      const data = await fetch(`api/bookDB/getBooks/id?id=${id}`);
      if (data) {
        console.log("search data", data);
        // setBooks((prevBooks) => [...[data], ...prevBooks]);
      } else {
        throw new Error("Failed to fetch book data");
      }
    } catch (err) {
      console.error(err);
      // Show error message to the user
    }
  };

  useEffect(() => {
    getAutoComplete();
  }, []);

  return (
    <ChipContainer>
      <RoundedTextField
        id='outlined-basic'
        label='Search'
        variant='outlined'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
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
