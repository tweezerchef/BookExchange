import { useState } from "react";
import { ChipContainer, RoundedTextField } from "./chipStyle";

export const ExploreChip: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  // const handleSearch = async (id: string) => {
  //   setLoading(true);
  //   try {
  //     const res = await fetch(`/bookdata/id?id=${id}`);
  //     if (res.ok) {
  //       setBooks((prevBooks) => [...[res], ...prevBooks]);
  //       setCurrentPage(0);
  //     } else {
  //       throw new Error("Failed to fetch book data");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     // Show error message to the user
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
};
