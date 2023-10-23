import { useState } from "react";
import { ChipContainer, RoundedTextField } from "./chipStyle";

export const ExploreChip: React.FC = () => {
  const [search, setSearch] = useState<string>("");
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
