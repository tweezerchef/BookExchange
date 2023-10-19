import Chip from "@mui/material/Chip";
import { ExploreBooks } from "./exploreBooks";
import { StyledDivider } from "../chips/chipStyle";

export default function ExploreBooksBox() {
  return (
    <>
      <StyledDivider textAlign='right'>
        <Chip label='Explore Books' />
      </StyledDivider>
      <ExploreBooks />
    </>
  );
}
