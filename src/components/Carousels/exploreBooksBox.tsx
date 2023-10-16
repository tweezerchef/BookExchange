import { useState } from "react";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import ExploreBooks from "./exploreBooks";
import { StyledDivider } from "../chips/chipStyle";

export default function ExploreBooksBox() {
  const [exploreBooks, setExploreBooks] = useState([]);
  return (
    <>
      <StyledDivider textAlign="right">
        <Chip label="Explore Books" />
      </StyledDivider>
      <ExploreBooks />
    </>
  );
}
