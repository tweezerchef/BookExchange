import { useState } from "react";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import ExploreBooks from "@/components/Carousels/exploreBooks";

export default function ExploreBooksBox() {
  const [exploreBooks, setExploreBooks] = useState([]);
  return (
    <>
      <Divider textAlign="right">
        <Chip label="Your Wish List" />
      </Divider>
      <Box overflow="hidden">
        <ExploreBooks books={exploreBooks} />
      </Box>
    </>
  );
}
